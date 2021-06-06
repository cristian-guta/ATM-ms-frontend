import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OperationsService } from 'src/app/services/operations.service';
import { Operation } from 'src/app/models/operation';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public operations: MatTableDataSource<Operation>;
  displayColumns: string[] = ['id', 'type', 'amount', 'date', 'client', 'account'];

  length: number;
  pageSize: number=5;
  pageIndex:number = 0;

  constructor(
    private _auth: AuthenticationService,
    private operationsService: OperationsService,
    private _clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.getAllOperations(this.pageSize, this.pageIndex)
  }

  getAllOperations(size, index){
    this.operationsService.getAllOperations(index, size)
    .subscribe(result => {
      for(let op of result.content){
        this._clientService.getById(op.clientId).subscribe(cl => {
          op.client = cl;
        })
      }
      this.operations=result.content;
      this.operations.paginator = this.paginator;
      this.length = result.totalElements;
    });
  }

  handleRequest(event: any){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllOperations(this.pageSize, this.pageIndex);
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.operations.filter = filterValue;
  }

  isAdmin() {
    return this._auth.getRole().includes('ADMIN');
  }

  isUser(){
    return this._auth.getRole().includes('ROLE');
}

}
