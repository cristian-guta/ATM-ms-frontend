import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'src/app/models/subscription';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SubscriptionModalComponent } from 'src/app/modals/subscription-modal/subscription-modal.component';
import { Client } from 'src/app/models/client';
import { ToastService } from 'src/app/services/toast.service';
import { ClientService } from 'src/app/services/client.service';


@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css'],
  providers: [Subscription],
})
export class SubscriptionsComponent implements OnInit {

  @Output() deleteAction = new EventEmitter();
  subscription: Subscription;
  subscriptions: Subscription[] = [];
  modalRef: BsModalRef;
  isActivated: boolean;
  client: Client;
  hasSubscription: boolean = false;
  deactivated: boolean = false;
  deleteLoading = false;
  listOfClients: Client[];
  IsWait: boolean = true;

  constructor(
    private _auth: AuthenticationService,
    private subsService: SubscriptionService,
    private _modal: BsModalService,
    private _toast: ToastService,
    private _clientService: ClientService
  ) {}

  ngOnInit(){
    this.isActivated=false;
    this._clientService.getCurrentClient().subscribe((result: Client) => {
      this.client = result;
      if(result.subscriptionId>0 && !this.isAdmin()){
        this.subsService.getSubscription().subscribe((sub: Subscription) => {
          this.hasSubscription = true;
          this.subscription = sub;
        });
        this.IsWait = false;
      }
      else{
        this.hasSubscription = false;
        this.getSubscriptions();
      }
    });
  }

  getSubscriptions(){
    this.subsService.getAllSubscriptions().subscribe((subs: Subscription[]) => {
      this.subscriptions = subs;   
      this.IsWait = false;  
    });
  }

  openModal() {
    this.modalRef = this._modal.show(SubscriptionModalComponent);
    this.modalRef.content.onClose.subscribe((subscription: Subscription) => {
        this.subscriptions.push(subscription);
    });
  }

  isAdmin() {
    return this._auth.getRole().includes('ADMIN');
  }

  isAnonymous(){
    return this._auth.getRole().includes('ANONYMOUS');
  }

  isUser(){
    return this._auth.getRole().includes('USER');
  }

  removeSubscription(subscription){
    this.subscriptions = this.subscriptions.filter((sub: Subscription) => sub.id!== subscription.id);
  }

  activate(subscription: Subscription){
    
    this.subsService.activateSubscription(subscription).subscribe(() => {
      this.client.subscriptionId = subscription.id;
      this._clientService.updateClient(this.client).subscribe();
      this._toast.showSuccess('Successfully activated subscription ' + subscription.name + '!');
      this.hasSubscription = true;
      window.location.reload();
    },
      () => {
        this._toast.showError('Failed to activate subscription ' + subscription.name + ', no sufficient funds. If you do have the neccessary funds, please contact support team!');
        this.hasSubscription = false;
      }
    );
    
  }

  deactivate(){    
    this.client.subscriptionId = 0;
    this._clientService.updateClient(this.client).subscribe();
    // this.subsService.cancelSubscription().subscribe(() => {

    //   this._toast.showSuccess('Successfully deactivated subscription ' + this.subscription.name + '!');
    //   this.hasSubscription = false;
    //   this.deactivated = true;
    // },
    //   () => {
    //     this._toast.showSuccess('Failed to deactivate subscription ' + this.subscription.name + ', please contact support team.');
    //     this.hasSubscription = true;
    //   }
    // );
    window.location.reload();
  }

  delete(subscription: Subscription) {
    
    this.deleteLoading = true;

    this.subsService.deleteSubscription(subscription)
    .subscribe(() => {
        this._toast.showSuccess('Subscription successfully deleted.');
        this.deleteAction.emit(subscription);
        this.deleteLoading = false;
    },
        () => {
            this._toast.showError('Failed to delete subscription.');
            this.deleteLoading = false;
        });
    
    window.location.reload();
  }

  openSubscriptionModal(sub: Subscription) {
    this.modalRef = this._modal.show(SubscriptionModalComponent, { initialState: { subscription: sub } });
    this.modalRef.content.onClose.subscribe((subscription: Subscription) => {
        sub.name = subscription.name;
        sub.price = subscription.price;
        sub.benefits = subscription.benefits;
    });
  }

}
