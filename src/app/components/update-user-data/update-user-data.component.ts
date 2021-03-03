import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { RestService } from 'src/app/services/rest.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-update-user-data',
  templateUrl: './update-user-data.component.html',
  styleUrls: ['./update-user-data.component.css']
})
export class UpdateUserDataComponent implements OnInit {

  updateUserDataForm: FormGroup;
  currentUser: Client;
  saving = false;

  constructor(
    private _userService: ClientService,
    private _fb: FormBuilder,
    private _toast: ToastService,
  ) { }

  getUserInfo() {
    this._userService.getCurrentClient()
        .subscribe((rUser: Client) => {
            this.currentUser = rUser;
            this.updateUserDataForm.patchValue({
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

  ngOnInit(): void {
    this.updateUserDataForm = this._fb.group({
      firstName: [{ value: this.currentUser.firstName}, Validators.required],
      lastName: [{ value: this.currentUser.lastName }, Validators.required],
      username: [{ value: ''}, Validators.required],
      role: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '' }, [Validators.required, Validators.email]],
      address: [{ value: '' }, Validators.required],
      cnp: [{ value: '' }, Validators.required],
    });
    this.getUserInfo();
  }

  get firstName(): AbstractControl {
    return this.updateUserDataForm.get('firstName');
  }

  get lastName(): AbstractControl {
      return this.updateUserDataForm.get('lastName');
  }

  get cnp(): AbstractControl {
      return this.updateUserDataForm.get('cnp');
  }

  get username(): AbstractControl {
      return this.updateUserDataForm.get('username');
  }

  get email(): AbstractControl {
      return this.updateUserDataForm.get('email');
  }

  get address(): AbstractControl {
      return this.updateUserDataForm.get('address');
  }

  get role(): AbstractControl {
      return this.updateUserDataForm.get('role');
  }

  isValid(field): boolean {
      const control = this.updateUserDataForm.get(field);
      return control.touched && control.valid;
  }

  isInvalid(field): boolean {
      const control = this.updateUserDataForm.get(field);
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
          },
              () => {
                  this.saving = false;
                  this._toast.showError('Failed to save changes!');
              });
  }

}
