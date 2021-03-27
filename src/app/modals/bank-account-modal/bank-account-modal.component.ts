import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AccountService } from 'src/app/services/account.service';
import { ToastService } from 'src/app/services/toast.service';
import { Account } from 'src/app/models/account';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-bank-account-modal',
  templateUrl: './bank-account-modal.component.html',
  styleUrls: ['./bank-account-modal.component.css']
})
export class BankAccountModalComponent implements OnInit {

  onClose: Subject<Account>;
  account: Account;
  accountForm: FormGroup;
  saving = false;
  hasAccount: boolean = false;

  constructor(
    private _auth: AuthenticationService,
    private accountService: AccountService,
    private _bsModalRef: BsModalRef,
    private _fb: FormBuilder,
    private _toast: ToastService
  ) { }

  ngOnInit(): void {
    this.onClose = new Subject();
    this.accountForm = this._fb.group({
      name: [this.account ? this.account.name : '', Validators.required],
      amount: [this.account ? this.account.amount : null, Validators.required],
      details: [this.account ? this.account.details : null, Validators.required]
    });
  }

  get name(): AbstractControl{
    return this.accountForm.get('name');
  }

  get amount(): AbstractControl{
    return this.accountForm.get('amount');
  }

  get details(): AbstractControl{
    return this.accountForm.get('details');
  }

  isValid(field): boolean {
    const control = this.accountForm.get(field);
    return control.touched && control.valid;
  }

  isInvalid(field): boolean {
      const control = this.accountForm.get(field);
      return control.touched && control.invalid;
  }

  save(): void{
    this.saving=true;
    const account: Account = {
      name: this.name.value,
      amount: this.amount.value,
      details: this.details.value
    };
    if(this.account){
      account.id = this.account.id;
      this.accountService.updateAccount(account)
        .subscribe((uAccount: Account) => {
          this.saving=true;
          this.onClose.next(uAccount);
          this.hideModal();
          this._toast.showSuccess('Changes successfully saved!');
        },
        () => {
          this.saving=false;
          this._toast.showError('Failed saving changes!');
        });
    } else{
      this.accountService.createAccount(account)
          .subscribe((rAccount: Account) => {
            this.saving = false;
            this.onClose.next(rAccount);
            this.hideModal();
            this._toast.showSuccess('Account successfully added!');
          },
          () => {
            this.saving = false;
            this._toast.showError('Failed to add account!');
        });
        
    }
    window.location.reload()
  }
  
  hideModal(): void {
    this._bsModalRef.hide();
  }

  isAdmin(): boolean {
    return this._auth.getRole().includes('ADMIN');
  }

}
