import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Client } from 'src/app/models/client';
import { Role } from 'src/app/models/role';
import { ClientService } from 'src/app/services/client.service';
import { RoleService } from 'src/app/services/role-service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-new-client-modal',
  templateUrl: './new-client-modal.component.html',
  styleUrls: ['./new-client-modal.component.css']
})
export class NewClientModalComponent implements OnInit {

  onClose: Subject<Client>;
  client: Client;
  clientForm: FormGroup;
  saving = false;
  roles: Role[] = [];

  constructor(
    private clientService: ClientService,
    private _bsModalRef: BsModalRef,
    private _fb: FormBuilder,
    private _toast: ToastService,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.onClose = new Subject();
    this.clientForm = this._fb.group({
      firstName: [this.clientForm ? this.client.firstName : '', Validators.required],
      lastName: [this.clientForm ? this.client.lastName : '', Validators.required],
      email: [this.clientForm ? this.client.email : '', Validators.required],
      username: [this.clientForm ? this.client.username : '', Validators.required],
      password: [this.clientForm ? this.client.password : '', Validators.required],
      role: [this.clientForm ? this.client.roleName : '', Validators.required],
    });

    this.getRoles();

  }

  getRoles(){
    this.roleService.getAllRoles().subscribe((roles: Role[]) => {
      roles.forEach(role => {
        console.log(role)
        this.roles.push(role);
      })
    });
  }

  get firstName(): AbstractControl {
    return this.clientForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.clientForm.get('lastName');
  }

  get email(): AbstractControl {
    return this.clientForm.get('email');
  }

  get username(): AbstractControl {
    return this.clientForm.get('username');
  }

  get role(): AbstractControl {
    return this.clientForm.get('role');
  }

  get password(): AbstractControl {
    return this.clientForm.get('password');
  }

  isValid(field): boolean {
    const control = this.clientForm.get(field);
    return control.touched && control.valid;
  }

  isInvalid(field): boolean {
    const control = this.clientForm.get(field);
    return control.touched && control.invalid;
  }

  save(): void {
    this.saving = true;
    const client: Client = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
      username: this.username.value,
      roleId: this.role.value[0]

    };
    console.log(client.roleId)

    this.clientService.create(client)
      .subscribe((cl: Client) => {
        this.saving = true;
        this.onClose.next(cl);
        this.hideModal();
        this._toast.showSuccess('User created!');
      },
        () => {
          this.saving = false;
          this._toast.showError('Failed creating user!');
        });

  }

  hideModal(): void {
    this._bsModalRef.hide();
  }

}
