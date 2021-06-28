import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientAudit } from 'src/app/models/clientAudit';
import { ClientAuditService } from 'src/app/services/client-audit-service';

@Component({
  selector: 'app-client-audit',
  templateUrl: './client-audit.component.html',
  styleUrls: ['./client-audit.component.css']
})
export class ClientAuditComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  clientsAudit: MatTableDataSource<ClientAudit>;
  length: number;
  pageSize: number = 5;
  pageIndex: number = 0;
  IsWait: boolean = true;

  displayColumns: string[] = ['id', 'rev', 'revTypeString', 'user', 'firstName', 'lastName', 'username', 'email', 'address', 'status'];

  constructor(
    private clientAuditService: ClientAuditService,
  ) { }

  ngOnInit(): void {
    this.getData(this.pageIndex, this.pageSize);
  }

  getData(index, size) {
    this.clientAuditService.getClientAuditInfo(index, size).subscribe(data => {

      data.content.forEach(element => {
        if (element.revtype == 0) {
          element.revTypeString = 'Create';
        }
        if (element.revtype == 1) {
          element.revTypeString = 'Update';
        }
        if (element.revtype == 2) {
          element.revTypeString = 'Delete';
        }
      });

      this.clientsAudit = data.content;
      this.clientsAudit.paginator = data.paginator;
      this.length = data.totalElements;
      this.IsWait = false;
    });
  }

  handleRequest(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData(this.pageIndex, this.pageSize);
  }
}
