import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BenefitAudit } from 'src/app/models/benefitAudit';
import { BenefitAuditService } from 'src/app/services/benefit-audit.service';

@Component({
  selector: 'app-benefit-audit',
  templateUrl: './benefit-audit.component.html',
  styleUrls: ['./benefit-audit.component.css']
})
export class BenefitAuditComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  benefitsAudit: MatTableDataSource<BenefitAudit>;
  length: number;
  pageSize: number=5;
  pageIndex:number = 0;
  IsWait: boolean = true;

  displayColumns: string[] = ['id', 'rev', 'revTypeString', 'user', 'description'];

  constructor(
    private benefitAuditService: BenefitAuditService
  ) { }

  ngOnInit(): void {
    this.getData(this.pageIndex, this.pageSize);
  }

  getData(index, size){
    this.benefitAuditService.getBenefitAuditInfo(index, size).subscribe(data => {

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

      this.benefitsAudit = data.content;
      this.benefitsAudit.paginator = data.paginator;
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
