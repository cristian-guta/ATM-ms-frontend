import { __decorate } from "tslib";
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/models/subscription';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Benefit } from 'src/app/models/benefit';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { BenefitService } from 'src/app/services/benefit.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastService } from 'src/app/services/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-subscription-card',
  templateUrl: './subscription-modal.component.html',
  styleUrls: ['./subscription-modal.component.css']
})
export class SubscriptionModalComponent implements OnInit {

  onClose: Subject<Subscription>;
  subscription: Subscription;
  subscriptionForm: FormGroup;
  benefitsList: Benefit[] = [];
  saving = false;

  constructor(
    private subService: SubscriptionService,
    private _auth: AuthenticationService,
    private benefitService: BenefitService,
    private _bsModalRef: BsModalRef,
    private _fb: FormBuilder,
    private _toast: ToastService
  ) { }

  ngOnInit(): void {
    this.onClose = new Subject();
    this.subscriptionForm = this._fb.group({
      name: [this.subscription ? this.subscription.name : '', Validators.required],
      price: [this.subscription ? this.subscription.price : null, Validators.required],
      benefits: [this.subscription ? this.subscription.benefits.map(benefit => benefit.id) : [], Validators.required]
    });

    this.getBenefits();
    // console.log(this.benefitsList);

  }

  getBenefits(){
    this.benefitService.getAllUnpagedBenefits()
      .subscribe((benefits: Benefit[]) => {
        benefits.forEach(element => {
          this.benefitsList.push(element);  
        });
        
      });
      
  }

  get name(): AbstractControl{
    return this.subscriptionForm.get('name');
  }

  get price(): AbstractControl{
    return this.subscriptionForm.get('price');
  }

  get benefits(): AbstractControl{
    return this.subscriptionForm.get('benefits');
  }

  isValid(field): boolean {
    const control = this.subscriptionForm.get(field);
    return control.touched && control.valid;
  }

  isInvalid(field): boolean {
      const control = this.subscriptionForm.get(field);
      return control.touched && control.invalid;
  }

  save(): void{
    this.saving=true;
    const subscription: Subscription = {
      name: this.name.value,
      price: this.price.value,
      benefitIds: this.benefits.value
      .filter((benefit: number) => this.benefitsList
      .map((ben: Benefit) => ben.id)
      .includes(benefit))
      
    };
    
    if(this.subscription){
      subscription.id = this.subscription.id;
      this.subService.updateSubscription(subscription)
        .subscribe((uSubscription: Subscription) => {
          this.saving=true;
          this.onClose.next(uSubscription);
          this.hideModal();
          this._toast.showSuccess('Changes successfully saved!');
        },
        () => {
          this.saving=false;
          this._toast.showError('Failed saving changes!');
        });
    } else{
      this.subService.createSubscription(subscription)
          .subscribe((rSubscription: Subscription) => {
            this.saving = false;
            this.onClose.next(rSubscription);
            this.hideModal();
            this._toast.showSuccess('Subscription successfully added!');
          },
          () => {
            this.saving = false;
            this._toast.showError('Failed to add subscription!');
        });
        
    }
  }
  
  hideModal(): void {
    this._bsModalRef.hide();
  }
}
