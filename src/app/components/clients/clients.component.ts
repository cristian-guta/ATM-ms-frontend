import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { ToastService } from 'src/app/services/toast.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  clients = new MatTableDataSource<Client>();
  displayColumns: string[] = ['id', 'firstName', 'lastName', 'username', 'role', 'email', 'address', 'actions'];

  length: number;
  pageSize: number = 5;
  pageIndex: number = 0;

  constructor(
    private clientService: ClientService,
    private _toast: ToastService
  ) { }

  ngOnInit() {
    this.getData(this.pageSize, this.pageIndex);
  }

  getData(size, index) {
    this.clientService.getClients(index, size).subscribe(result => {
        for (let cl of result.content) {
          if (cl.roleId == 1) {
            cl.roleName = "USER";
          }
          else {
            cl.roleName = "ADMIN";
          }
        }
        this.clients = result.content;
        this.clients.paginator = this.paginator;
        this.length = result.totalElements;
      });
  }

  handleRequest(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData(this.pageSize, this.pageIndex);
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.clients.filter = filterValue;
  }

  deactivate(client: Client) {
    client.deleting = true;
    this.clientService.deactivateClient(client)
      .subscribe(() => {
        client.deleting = false;
        client.status = true;
        this._toast.showSuccess('Client successfully blocked!');
      });
  }

  activate(client: Client) {
    client.deleting = true;
    this.clientService.activateClient(client)
      .subscribe(() => {
        client.deleting = false;
        client.status = false;
        this._toast.showSuccess('User successfully unblocked!');
      });
  }

}
