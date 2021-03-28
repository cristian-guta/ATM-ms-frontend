import { ToastService } from './../../services/toast.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-account-information',
    templateUrl: './account-information.component.html',
    styleUrls: ['./account-information.component.css']
})
export class AccountInformationComponent implements OnInit {

    // @Input() allowEdit = false;
    accountForm: FormGroup;
    currentUser: Client;
    isModal = false;

    saving = false;

    title = 'ImageUploaderFrontEnd';

    selectedFile: File;
    retrievedImage: any;
    base64Data: any;
    retrieveResonse: any;
    message: string;
    imageName: any;

    constructor(
        private _userService: ClientService,
        private _fb: FormBuilder,
        private _toast: ToastService,
        private _modalRef: BsModalRef,
        private httpClient: HttpClient,
        private _authService: AuthenticationService
    ) { }

    ngOnInit() {
        this.accountForm = this._fb.group({
            firstName: [{ value: '' }, Validators.required],
            lastName: [{ value: '' }, Validators.required],
            username: [{ value: ''}, Validators.required],
            role: [{ value: '', disabled: true }, Validators.required],
            email: [{ value: '' }, [Validators.required, Validators.email]],
            address: [{ value: '' }, Validators.required],
            cnp: [{ value: '' }, Validators.required],
        });
        this.getUserInfo();
    }

    getUserInfo() {
        this._userService.getCurrentClient()
            .subscribe((rUser: Client) => {
                console.log(rUser);
                this.currentUser = rUser;
                this.accountForm.patchValue({
                    firstName: this.currentUser.firstName,
                    lastName: this.currentUser.lastName,
                    username: this.currentUser.username,
                    role: this.currentUser.role,
                    email: this.currentUser.email,
                    address: this.currentUser.address,
                    cnp: this.currentUser.cnp
                });
            });
    }

    enableFields() {
        this.firstName.enable();
        this.lastName.enable();
        this.username.enable();
        this.email.enable();
        this.address.enable();
        this.cnp.enable();
    }

    disableFields() {
        this.firstName.disable();
        this.lastName.disable();
        this.email.disable();
        this.address.disable();
        this.cnp.disable();
        this.username.disable();
    }

    // onChange(value) {
    //     this.allowEdit = value;
    //     if (this.allowEdit) {
    //         this.enableFields();
    //     } else {
    //         this.disableFields();
    //     }
    // }

    get firstName(): AbstractControl {
        return this.accountForm.get('firstName');
    }

    get lastName(): AbstractControl {
        return this.accountForm.get('lastName');
    }

    get cnp(): AbstractControl {
        return this.accountForm.get('cnp');
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
            cnp: this.cnp.value,
            email: this.email.value,
            address: this.address.value
        };
        console.log(userInfo.id + userInfo.firstName);
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
                window.location.reload();
    }

    hideModal() {
        this._modalRef.hide();
    }
  
    public onFileChanged(event) {
        //Select File
        this.selectedFile = event.target.files[0];
      }
  
      onUpload() {
        console.log(this.selectedFile);
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this._authService.getToken()}`
        });
        headers.append('Content-Type', 'multipart/form-data');
        
        //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
        const uploadImageData = new FormData();
        uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
      
        //Make a call to the Spring Boot Application to save the image
        this.httpClient.post('http://localhost:8765/image/upload', uploadImageData, { observe: 'response', headers: headers })
          .subscribe((response) => {
            if (response.status === 200) {
              this.message = 'Image uploaded successfully';
            } else {
              this.message = 'Image not uploaded successfully';
            }
          }
          );
      }

      //Gets called when the user clicks on retieve image button to get the image from back end
    getImage() {
        //Make a call to Sprinf Boot to get the Image Bytes.
        this.httpClient.get('http://localhost:8765/image/get/' + this.imageName)
          .subscribe(
            res => {
              this.retrieveResonse = res;
              this.base64Data = this.retrieveResonse.picByte;
              this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
            }
          );
      }

}
