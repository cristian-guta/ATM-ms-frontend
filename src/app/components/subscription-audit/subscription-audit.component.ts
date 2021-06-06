import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SubscriptionAudit } from 'src/app/models/subscriptionAudit';
import { SubscriptionAuditService } from 'src/app/services/subscription-audit.service';

@Component({
  selector: 'app-subscription-audit',
  templateUrl: './subscription-audit.component.html',
  styleUrls: ['./subscription-audit.component.css']
})
export class SubscriptionAuditComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscriptionsAudit: MatTableDataSource<SubscriptionAudit>;
  length: number;
  pageSize: number=5;
  pageIndex:number = 0;
  IsWait: boolean = true;
  displayColumns: string[] = ['id', 'rev', 'revTypeString','name', 'price', 'user'];

  constructor(
    private subscriptionService: SubscriptionAuditService
  ) { }

  ngOnInit(): void {
    this.getData(this.pageIndex, this.pageSize);
  }

  getData(index, size){
    this.subscriptionService.getSubscriptionAuditInfo(index, size).subscribe(data => {

      data.content.forEach(element => {
        if(element.revtype==0){
          element.revTypeString='Create';
        }
        if(element.revtype==1){
          element.revTypeString='Update';
        }
        if(element.revtype==2){
          element.revTypeString='Delete';
        }
      });

      this.subscriptionsAudit = data.content;
      this.subscriptionsAudit.paginator = data.paginator;
      this.length = data.totalElements;
      this.IsWait = false;
    });
  }

  handleRequest(event: any){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData(this.pageIndex, this.pageSize);
  }

}
