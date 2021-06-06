import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReviewEndpoints } from 'src/app/endpoints/review-endpoint';
import { Client } from 'src/app/models/client';
import { Review } from 'src/app/models/review';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClientService } from 'src/app/services/client.service';
import { RestService } from 'src/app/services/rest.service';
import { ReviewService } from 'src/app/services/review.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  IsWait: boolean = true;
  reviews: MatTableDataSource<Review>;
  reviewForm: FormGroup;
  user: Client;
  revEnds = new ReviewEndpoints();


  length: number;
  pageSize: number = 5;
  pageIndex: number = 0;

  displayColumns: string[] = [];

  constructor(
    private _auth: AuthenticationService,
    private _reviewService: ReviewService,
    private _toast: ToastService,
    private _fb: FormBuilder,
    private _clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.getData(this.pageIndex, this.pageSize);
    this.reviewForm = this._fb.group({
      title: [''],
      description: [''],
      clientId: [''],
      client: ['']
    });
  }

  get title(): AbstractControl {
    return this.reviewForm.get('title');
  }

  get description(): AbstractControl {
    return this.reviewForm.get('description');
  }

  get clientId(): AbstractControl {
    return this.reviewForm.get('clientId');
  }

  get client(): AbstractControl {
    return this.reviewForm.get('client')
  }

  getData(index, size) {
    this._reviewService.getAllReviews(index, size).subscribe(data => {
      this.reviews = data.content;
      this.reviews.paginator = this.paginator;
      this.length = data.totalElements;
      data.content.forEach(rev => {
        this._clientService.getById(rev.clientId).subscribe((client: Client) => {
          rev.client = client;
        });
      });
      this.IsWait = false;
    });
  }

  create() {
    const review: Review = {
      title: this.title.value,
      description: this.description.value,
      clientId: this.clientId.value,
      client: this.client.value
    };

    this._reviewService.createReview(review).subscribe(res => {
      window.location.reload();
    }, err => {
      console.log(err.error.message);
    })
  }

  handleRequest(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData(this.pageIndex, this.pageSize);
  }

  isAdmin() {
    return this._auth.getRole().includes('ADMIN');
  }

}
