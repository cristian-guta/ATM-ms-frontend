import { ToastService } from './../../services/toast.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Observable, Observer, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

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

    // begining og web camera declarations

    // end of declarations for web camera

    saving = false;

    title = 'ImageUploaderFrontEnd';

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
            address: this.address.value,
            status: this.currentUser.status,
            authProvider: this.currentUser.authProvider,
            subscriptionId: this.currentUser.subscriptionId
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
        window.location.reload();   
    }

    hideModal() {
        this._modalRef.hide();
    }

    // implementation for web camera

    
    // end of implementation for web camera
}
