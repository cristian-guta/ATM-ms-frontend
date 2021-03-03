import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AccountService } from 'src/app/services/account.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastService } from 'src/app/services/toast.service';
import { Account } from 'src/app/models/account';

@Component({
  selector: 'app-transfer-money-modal',
  templateUrl: './transfer-money-modal.component.html',
  styleUrls: ['./transfer-money-modal.component.css']
})
export class TransferMoneyModalComponent implements OnInit {

  onClose: Subject<Account>;
  transferForm: FormGroup;
  saving = false;  

  constructor(
    private _auth: AuthenticationService,
    private accountService: AccountService,
    private _bsModalRef: BsModalRef,
    private _fb: FormBuilder,
    private _toast: ToastService
  ) { }

  transferFrom = this.accountService.currAcct;
  transferTo: Account;
  
  

  ngOnInit(): void {
    
    this.onClose = new Subject();
    this.transferForm = this._fb.group({
      receiverId: ['', Validators.required],
      amount: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  get amount(){
    return this.transferForm.get('amount');
  }

  get receiverId(){
    return this.transferForm.get('receiverId');
  }

  get message(){
    return this.transferForm.get('message');
  }

  isValid(field): boolean {
    const control = this.transferForm.get(field);
    return control.touched && control.valid;
  }

  isInvalid(field): boolean {
      const control = this.transferForm.get(field);
      return control.touched && control.invalid;
  }

  isAccountValid(field): boolean {
    const control = this.transferForm.get(field);
    let valid: boolean = false;
    let account: Account;
    if(this.receiverId.value){
      valid = true;
    }
    return valid;
  }

  isGreater(field): boolean{
    const control = this.transferForm.get(field);
    return control.value>this.transferFrom.amount;
  }
  
  save(): void{
    this.saving=true;
    if(this.amount.value<=this.transferFrom.amount){
      this.accountService.transferMoney(this.transferFrom.id, this.receiverId.value, this.amount.value)
        .subscribe(() => {
          this.saving = false;
          this.onClose.next();
          this.hideModal();
          this._toast.showSuccess('Amount successfully transfered!');
          window.location.reload();
        });
    }
    else{
      this._toast.showError('Amount is greater than how much you own!');
    }
  }

  hideModal(): void {
    this._bsModalRef.hide();
  }
}
