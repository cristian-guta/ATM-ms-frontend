import { ToastService } from './../../services/toast.service';
import { RestService } from './../../services/rest.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

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

    constructor(
        private _userService: ClientService,
        private _rest: RestService,
        private _fb: FormBuilder,
        private _toast: ToastService,
        private _modalRef: BsModalRef
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
    }

}
