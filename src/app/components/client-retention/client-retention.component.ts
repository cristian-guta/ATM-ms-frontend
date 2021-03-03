import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/models/client';
import { ClientRetention } from 'src/app/models/clientRetention';
import { ClientRetentionService } from 'src/app/services/client-retention.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-retention',
  templateUrl: './client-retention.component.html',
  styleUrls: ['./client-retention.component.css']
})
export class ClientRetentionComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  retentionData = new MatTableDataSource<ClientRetention>();

  displayColumns: string[] = ['id', 'firstName', 'lastName', 'username', 'email'];

  length: number;
  pageSize: number=5;
  pageIndex:number = 0;


  constructor(
    private clientService: ClientService,
    private _clRetentionService: ClientRetentionService
  ) { }

  ngOnInit(): void {
    this.getData(this.pageIndex, this.pageSize);
  }

  getData(index: number, size: number){
    this._clRetentionService.getAllRetentionData(index, size).subscribe(data => {
      this.retentionData = data.content;
      this.retentionData.paginator = this.paginator;
      this.length = this.length;
      
      data.content.forEach((retention: ClientRetention) => {
        this.clientService.getById(retention.clientId).subscribe((client: Client) => {
          retention.client = client;
        });
      });

    });
  }

  handleRequest(event: any){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData(this.pageIndex, this.pageSize);
  }

}
