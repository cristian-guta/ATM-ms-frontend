import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/models/client';
import { ClientEmotions } from 'src/app/models/client-emotions';
import { ClientEmotionsService } from 'src/app/services/client-emotions.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-emotions',
  templateUrl: './client-emotions.component.html',
  styleUrls: ['./client-emotions.component.css']
})
export class ClientEmotionsComponent implements OnInit {

  constructor(
    private clientService: ClientService,
    private clientEmotionsService: ClientEmotionsService
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  clientEmotionsData = new MatTableDataSource<ClientEmotions>();
  currentClient: Client;
  displayColumns: string[] = ['id', 'emotion', 'client'];

  length: number;
  pageSize: number = 5;
  pageIndex: number = 0;

  ngOnInit(): void {
    this.getData(this.pageIndex, this.pageSize);
  }

  getData(index: number, size: number){
    this.clientEmotionsService.getAllEmotionsData(index, size).subscribe(data => {
      this.clientEmotionsData = data.content;
      this.clientEmotionsData.paginator = this.paginator;
      this.length = data.totalElements;
      
      data.content.forEach((emotions: ClientEmotions) => {
        this.clientService.getById(emotions.clientId).subscribe((client: Client) => {
          emotions.client = client;
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
