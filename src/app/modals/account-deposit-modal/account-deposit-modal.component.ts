import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AccountService } from 'src/app/services/account.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastService } from 'src/app/services/toast.service';
import { Account } from 'src/app/models/account';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {loadStripe} from '@stripe/stripe-js';

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
    private _toast: ToastService,
    private http: HttpClient
  ) { }

  account = this.accountService.currAcct;


  ngOnInit(): void {
    
    this.onClose = new Subject();
    this.depositForm = this._fb.group({
      amount: ['', Validators.required],
      cardNumber: [''],
      expMonth: [''],
      expYear: [''],
      cvc: ['']
    });
  }

  get amount(){
    return this.depositForm.get('amount');
  }

  get cardNumber(){
    return this.depositForm.get('cardNumber');
  }

  get expMonth(){
    return this.depositForm.get('expMonth');
  }

  get expYear(){
    return this.depositForm.get('expYear');
  }

  get cvc(){
    return this.depositForm.get('cvc');
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
    (<any>window).Stripe.card.createToken({
      number: this.cardNumber.value,
      exp_month: this.expMonth.value,
      exp_year: this.expYear.value,
      cvc: this.cvc.value
    }, (status: number, response: any) => {
      if (status === 200) {
        let token = response.id;
        this.chargeCard(token, this.amount.value);
      } else {
        console.log(response.error.message);
      }
    });
  }

  hideModal(): void {
    this._bsModalRef.hide();
  }

  chargeCard(token: string, amount: number) {
    const headers = new HttpHeaders({'token': token, 'amount': amount.toString()});
    console.log("Card");
    this.http.post('http://localhost:8765/payment-service/payment/charge', {}, {headers: headers})
      .subscribe(resp => {
        console.log(resp);
      })
    
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

}
