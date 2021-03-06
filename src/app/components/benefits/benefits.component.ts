import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BenefitService } from 'src/app/services/benefit.service';
import { Benefit } from 'src/app/models/benefit';
import { Subscription } from 'src/app/models/subscription';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddBenefitModalComponent } from 'src/app/modals/add-benefit-modal/add-benefit-modal.component';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.css']
})
export class BenefitsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // benefits: MatTableDataSource<Benefit>;
  benefits: Benefit[] = [];
  benefit: Benefit;
  subscription: Subscription;
  length: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  IsWait: boolean = true;
  displayColumns: string[] = ['id', 'description', 'delete'];
  modalRef: BsModalRef;

  constructor(
    private _auth: AuthenticationService,
    private benefitService: BenefitService,
    private _modal: BsModalService,
    private toast: ToastService

  ) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    // this.benefits.filter = filterValue;
  }

  ngOnInit() {
    if(this.isAdmin()){
      this.displayColumns = ['id', 'description', 'delete'];
    }
    else{
      this.displayColumns = ['id', 'description'];
    }
    this.getData(this.pageIndex, this.pageSize);
  }

  getData(index, size) {
    if (this.isAdmin() == false) {
      this.benefitService.getBenefitsBySubscription(index, size).subscribe(result => {
        this.benefits = result.content;
        // this.benefits.paginator = this.paginator;
        this.length = result.totalElements;
        this.IsWait = false;
      });
    }
    else {
      this.benefitService.getAllBenefits(index, size)
        .subscribe(result => {
          this.benefits = result.content;
          // this.benefits.paginator = this.paginator;
          this.length = result.totalElements;
          this.IsWait = false;
        });
    }
    // if(this.benefits.length ===0){
    //   this.benefits=[];
    // }
  }

  delete(benefit: Benefit) {
    this.benefitService.deleteBenefit(benefit).subscribe(() => {
      this.toast.showSuccess('Benefit deleted!');
    })
  }

  handleRequest(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData(this.pageIndex, this.pageSize);
  }

  openModal() {
    this.modalRef = this._modal.show(AddBenefitModalComponent);
    this.modalRef.content.onClose.subscribe((benefit: Benefit) => {
      this.benefits.push(benefit);
    });
  }

  isAdmin() {
    return this._auth.getRole().includes('ADMIN');
  }

}
