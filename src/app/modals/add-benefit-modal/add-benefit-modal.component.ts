import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Benefit } from 'src/app/models/benefit';
import { BenefitService } from 'src/app/services/benefit.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-benefit-modal',
  templateUrl: './add-benefit-modal.component.html',
  styleUrls: ['./add-benefit-modal.component.css']
})
export class AddBenefitModalComponent implements OnInit {

  onClose: Subject<Benefit>;
  benefit: Benefit;
  benefitForm: FormGroup;
  saving = false;

  constructor(
    private benefitService: BenefitService,
    private _bsModalRef: BsModalRef,
    private _fb: FormBuilder,
    private _toast: ToastService
  ) { }

  ngOnInit(): void {
    this.onClose = new Subject();
    this.benefitForm = this._fb.group({
      description: [this.benefitForm ? this.benefit.description : '', Validators.required],
    });
  }

  get description(): AbstractControl {
    return this.benefitForm.get('description');
  }

  isValid(field): boolean {
    const control = this.benefitForm.get(field);
    return control.touched && control.valid;
  }

  isInvalid(field): boolean {
    const control = this.benefitForm.get(field);
    return control.touched && control.invalid;
  }

  save(): void {
    this.saving = true;
    const benefit: Benefit = {
      description: this.description.value

    };

    this.benefitService.getCreateBenefit(benefit)
      .subscribe((bBenefit: Benefit) => {
        this.saving = true;
        this.onClose.next(bBenefit);
        this.hideModal();
        this._toast.showSuccess('Benefit created!');
      },
        () => {
          this.saving = false;
          this._toast.showError('Failed creating benefit!');
        });

  }

  hideModal(): void {
    this._bsModalRef.hide();
  }
}
