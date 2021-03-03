import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AccountService } from 'src/app/services/account.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastService } from 'src/app/services/toast.service';
import { Account } from 'src/app/models/account';

@Component({
  selector: 'app-account-deposit-modal',
  templateUrl: './account-deposit-modal.component.html',
  styleUrls: ['./account-deposit-modal.component.css']
})
export class AccountDepositModalComponent implements OnInit {

  onClose: Subject<Account>;
  depositForm: FormGroup;
  saving = false;  

  constructor(
    private _auth: AuthenticationService,
    private accountService: AccountService,
    private _bsModalRef: BsModalRef,
    private _fb: FormBuilder,
    private _toast: ToastService
  ) { }

  account = this.accountService.currAcct;


  ngOnInit(): void {
    
    this.onClose = new Subject();
    this.depositForm = this._fb.group({
      amount: ['', Validators.required]
    });
  }

  get amount(){
    return this.depositForm.get('amount');
  }

  isValid(field): boolean {
    const control = this.depositForm.get(field);
    return control.touched && control.valid;
  }

  isInvalid(field): boolean {
      const control = this.depositForm.get(field);
      return control.touched && control.invalid;
  }

  save(): void{
    this.saving=true;
    
    this.accountService.depositMoney(this.account.id, this.amount.value)
      .subscribe(() => {
        this.saving = false;
        this.onClose.next();
        this.hideModal();
        this._toast.showSuccess('Amount successfully added!');
        window.location.reload();
      },
        () => {
          this.saving = false;
          this._toast.showError('Failed to deposit the amount!');
        });
  }

  hideModal(): void {
    this._bsModalRef.hide();
  }

}
