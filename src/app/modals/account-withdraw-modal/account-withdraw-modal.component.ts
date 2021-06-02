import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AccountService } from 'src/app/services/account.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastService } from 'src/app/services/toast.service';
import { Account } from 'src/app/models/account';
import { ImageService } from 'src/app/services/image.service';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-account-withdraw-modal',
  templateUrl: './account-withdraw-modal.component.html',
  styleUrls: ['./account-withdraw-modal.component.css']
})
export class AccountWithdrawModalComponent implements OnInit {

  onClose: Subject<Account>;
  withdrawForm: FormGroup;
  saving = false;
  currentUser: Client;

  WIDTH = 400;
  HEIGHT = 300;
  isCaptured: boolean;
  error: any;

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  captures: string[] = [];
  imageUrl: string;

  constructor(
    private _auth: AuthenticationService,
    private accountService: AccountService,
    private _bsModalRef: BsModalRef,
    private _fb: FormBuilder,
    private _toast: ToastService,
    private imageService: ImageService,
    private _userService: ClientService
  ) { }

  account = this.accountService.currAcct;

  ngOnInit(): void {
    this.onClose = new Subject();
    this.withdrawForm = this._fb.group({
      amount: ['', Validators.required],
    });

    this.getUserInfo();
  }

  getUserInfo(){
    this._userService.getCurrentClient()
            .subscribe((rUser: Client) => {
                this.currentUser = rUser;
            });
  }

  get amount(){
    return this.withdrawForm.get('amount');
  }

  isValid(field): boolean {
    const control = this.withdrawForm.get(field);
    return control.touched && control.valid;
  }

  isInvalid(field): boolean {
      const control = this.withdrawForm.get(field);
      return control.touched && control.invalid;
  }

  isGreater(field): boolean{
    const control = this.withdrawForm.get(field);
    return control.value>this.account.amount;
  }

  save(): void{
    this.saving=true;
    if(this.amount.value<=this.account.amount){
      this.sendImageToAws();
      this.accountService.withdrawMoney(this.account.id, this.amount.value)
        .subscribe(() => {
          this.saving = false;
          this.onClose.next();
          this.hideModal();
          this._toast.showSuccess('Amount successfully withdrawed!');
          window.location.reload();
        });
    }
    else{
      this._toast.showError('Amount is greater than how much you own!');
    }
  }

  hideModal(): void {
    this._bsModalRef.hide();
  }

  // camera implementation

  async ngAfterViewInit() {
    await this.setupDevices();
  }

  async setupDevices() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true
          });
          if (stream) {
            this.video.nativeElement.srcObject = stream;
            this.video.nativeElement.play();
            this.error = null;
          } else {
            this.error = "You have no output video device";
          }
        } catch (e) {
          this.error = e;
        }
      }
  }

  capture() {
    this.drawImageToCanvas(this.video.nativeElement);
    this.imageUrl = this.canvas.nativeElement.toDataURL("image/png");
    this.isCaptured = true;
  }

  removeCurrent() {
      this.isCaptured = false;
  }

  setPhoto(idx: number) {
      this.isCaptured = true;
      var image = new Image();
      image.src = this.captures[idx];
    
  }
  
  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }

  dataURItoBlob(dataURI) {
      
          var arr = dataURI.split(','), mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
          while(n--){
              u8arr[n] = bstr.charCodeAt(n);
          }
          return new Blob([u8arr], {type:mime});
  }

  sendImageToAws(){
    this.capture();
    const imageName = this.currentUser.username + '.png';
    const blob = this.dataURItoBlob(this.imageUrl);
    const imageFile = new File([blob], imageName, { type: 'image/png' });
    const uploadImageData: FormData = new FormData();
    uploadImageData.append('imageFile', imageFile, imageName);
    this.imageService.uploadToAws(uploadImageData);
  }
  // end of camera impl

}
