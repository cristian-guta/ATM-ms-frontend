import { ToastService } from './../../services/toast.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { HttpClient } from '@angular/common/http';
import { ImageModel } from 'src/app/models/image-model';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from 'src/app/services/image.service';


@Component({
    selector: 'app-account-information',
    templateUrl: './account-information.component.html',
    styleUrls: ['./account-information.component.css']
})
export class AccountInformationComponent implements OnInit, AfterViewInit {

    accountForm: FormGroup;
    currentUser: Client;
    isModal = false;
    imgName: String;

    // begining og web camera declarations

    profilePic: ImageModel;
    imgSrc: String;

    WIDTH = 400;
    HEIGHT = 300;

    @ViewChild("video")
    public video: ElementRef;

    @ViewChild("canvas")
    public canvas: ElementRef;

    captures: string[] = [];
    imageUrl: string;
    error: any;
    isCaptured: boolean;

    // end of declarations for web camera

    saving = false;

    title = 'ImageUploaderFrontEnd';

    constructor(
        private _userService: ClientService,
        private _fb: FormBuilder,
        private _toast: ToastService,
        private _modalRef: BsModalRef,
        private httpClient: HttpClient,
        private sanitizer: DomSanitizer,
        private imageService: ImageService
    ) { }

    ngOnInit() {
        this.accountForm = this._fb.group({
            firstName: [{ value: '' }, Validators.required],
            lastName: [{ value: '' }, Validators.required],
            username: [{ value: '' }, Validators.required],
            role: [{ value: '', disabled: true }, Validators.required],
            email: [{ value: '' }, [Validators.required, Validators.email]],
            address: [{ value: '' }, Validators.required],
            telephoneNumber: [{value: ''}, Validators.required],
        });
        this.getUserInfo();
        // this.httpClient.get('http://localhost:8765/client-service/image').subscribe((image: ImageModel) => {
        //     this.profilePic = image;
        //     this.imgName = image.name;
        //     this.imgSrc = image.picByte.toString();
        // });
        this.imageService.getImage().subscribe((image: ImageModel) => {
            this.profilePic = image;
            this.imgName = image.name;
            this.imgSrc = image.picByte.toString();
        });
    }

    getUserInfo() {
        this._userService.getCurrentClient()
            .subscribe((rUser: Client) => {
                this.currentUser = rUser;
                this.accountForm.patchValue({
                    firstName: this.currentUser.firstName,
                    lastName: this.currentUser.lastName,
                    username: this.currentUser.username,
                    role: this.currentUser.role,
                    email: this.currentUser.email,
                    address: this.currentUser.address,
                    telephoneNumber: this.currentUser.telephoneNumber,
                });
            });

        this.imageService.getImage().subscribe((image: ImageModel) => {
            this.profilePic = image;
            if (this.imgSrc != null) {
                this.imgName = image.name;
                this.imgSrc = image.picByte.toString();
                this.sanitizer.bypassSecurityTrustResourceUrl(this.imgSrc.toString());
            }
            this.imgSrc = image.picByte.toString();
        });
        // this.httpClient.get('http://localhost:8765/client-service/image').subscribe((image: ImageModel) => {
        //     this.profilePic = image;
        //     if (this.imgSrc != null) {
        //         this.imgName = image.name;
        //         this.imgSrc = image.picByte.toString();
        //         this.sanitizer.bypassSecurityTrustResourceUrl(this.imgSrc.toString());
        //     }
        //     this.imgSrc = image.picByte.toString();

        // });
    }

    enableFields() {
        this.firstName.enable();
        this.lastName.enable();
        this.username.enable();
        this.email.enable();
        this.address.enable();
    }

    disableFields() {
        this.firstName.disable();
        this.lastName.disable();
        this.email.disable();
        this.address.disable();
        this.username.disable();
    }

    get firstName(): AbstractControl {
        return this.accountForm.get('firstName');
    }

    get lastName(): AbstractControl {
        return this.accountForm.get('lastName');
    }

    get username(): AbstractControl {
        return this.accountForm.get('username');
    }

    get email(): AbstractControl {
        return this.accountForm.get('email');
    }

    get address(): AbstractControl {
        return this.accountForm.get('address');
    }

    get role(): AbstractControl {
        return this.accountForm.get('role');
    }

    get telephoneNumber(): AbstractControl {
        return this.accountForm.get('telephoneNumber');
    }

    isValid(field): boolean {
        const control = this.accountForm.get(field);
        return control.touched && control.valid;
    }

    isInvalid(field): boolean {
        const control = this.accountForm.get(field);
        return control.touched && control.invalid;
    }

    save(): void {
        this.saving = true;
        const userInfo: Client = {
            id: this.currentUser.id,
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            username: this.username.value,
            email: this.email.value,
            address: this.address.value,
            status: this.currentUser.status,
            authProvider: this.currentUser.authProvider,
            subscriptionId: this.currentUser.subscriptionId,
            telephoneNumber: this.telephoneNumber.value,
        };
        this._userService.updateClient(userInfo)
            .subscribe(() => {
                this.saving = false;
                // this.onChange(false);
                this._toast.showSuccess('Information successfully changed!');
                if (this.isModal) {
                    this.hideModal();
                }
            },
                () => {
                    this.saving = false;
                    this._toast.showError('Failed to save changes!');
                });
    }

    hideModal() {
        this._modalRef.hide();
        window.location.reload();
    }

    // implementation for web camera

    async ngAfterViewInit() {
        await this.setupDevices();
    }

    async setupDevices() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true
                });
                if (stream) {
                    this.video.nativeElement.srcObject = stream;
                    this.video.nativeElement.play();
                    this.error = null;
                } else {
                    this.error = "You have no output video device";
                }
            } catch (e) {
                this.error = e;
            }
        }
    }


    capture() {
        this.drawImageToCanvas(this.video.nativeElement);
        this.imageUrl = this.canvas.nativeElement.toDataURL("image/png");
        this.isCaptured = true;
    }

    removeCurrent() {
        this.isCaptured = false;
    }

    setPhoto(idx: number) {
        this.isCaptured = true;
        var image = new Image();
        image.src = this.captures[idx];
        this.drawImageToCanvas(image);
    }

    savePhoto() {
        const imageName = this.currentUser.username + '.png';
        const blob = this.dataURItoBlob(this.imageUrl);
        const imageFile = new File([blob], imageName, { type: 'image/png' });
        const uploadImageData: FormData = new FormData();
        uploadImageData.append('imageFile', imageFile, imageName);
        this.imageService.saveProfilePic(uploadImageData).subscribe();
    }

    drawImageToCanvas(image: any) {
        this.canvas.nativeElement
            .getContext("2d")
            .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
    }

    dataURItoBlob(dataURI) {

        var arr = dataURI.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    // end of implementation for web camera
}
