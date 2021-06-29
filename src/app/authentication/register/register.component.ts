
import { Router } from '@angular/router';
import { RestService } from './../../services/rest.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup, AsyncValidatorFn } from '@angular/forms';
import { timer, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthEndpoints } from 'src/app/endpoints/auth-endpoints';
import { Client } from 'src/app/models/client';
import { AuthProvider } from 'src/app/models/authProvider';
import { ToastService } from 'src/app/services/toast.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { Subscription } from 'src/app/models/subscription';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const uniqueUsername = (rest: RestService, time: number = 1000): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<{ [key: string]: boolean } | null> => {
        if (control.value !== '') {
            return timer(time).pipe(
                switchMap(() => {
                    return rest.get(`uniqueUsername?username=${control.value}`);
                }),
                map(value => {
                    return value.check ? null : { notUnique: true };
                })
            );
        } else {
            return null;
        }
    };
};

function checkPassword(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    if (password && confirmPassword &&
        password.dirty && confirmPassword.dirty &&
        password.value !== confirmPassword.value) {
        return { missMatch: true };
    }
    else {
        if (password.value < 6) {
            return { missMatch: true };
        }
    }
    return null;
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    IsWait: boolean = true;
    _authEnds = new AuthEndpoints();
    validRegister = true;
    loading = false;
    registerForm: AbstractControl;
    subscriptions: Subscription[] = [];

    constructor(
        private _auth: AuthenticationService,
        private _router: Router,
        private _fb: FormBuilder,
        private _rest: RestService,
        private _toast: ToastService,
        private subsService: SubscriptionService
    ) { }

    ngOnInit() {
        this.getSubscriptions();
        this.registerForm = this._fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            username: ['', [Validators.required]],//, uniqueUsername(this._rest)],
            telephoneNumber: ['', [Validators.required]],
            cnp: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]],
            
        },
            {
                validators: checkPassword
            });
    }

    get firstName(): AbstractControl {
        return this.registerForm.get('firstName');
    }

    get lastName(): AbstractControl {
        return this.registerForm.get('lastName');
    }

    get username(): AbstractControl {
        return this.registerForm.get('username');
    }

    get email(): AbstractControl {
        return this.registerForm.get('email');
    }

    get password(): AbstractControl {
        return this.registerForm.get('password');
    }

    get confirmPassword(): AbstractControl {
        return this.registerForm.get('confirmPassword');
    }

    get cnp(): AbstractControl {
        return this.registerForm.get('cnp');
    }

    get telephoneNumber(): AbstractControl {
        return this.registerForm.get('telephoneNumber');
    }

    isValid(field): boolean {
        const control = this.registerForm.get(field);
        return control.touched && control.valid;
    }

    isInvalid(field): boolean {
        const control = this.registerForm.get(field);
        return control.touched && control.invalid;
    }

    register(): void {
        if (this.registerForm.valid) {
            const registerInfo: Client = {
                firstName: this.firstName.value,
                lastName: this.lastName.value,
                cnp: this.cnp.value,
                username: this.username.value,
                email: this.email.value,
                password: this.password.value,
                confirmPassword: this.confirmPassword.value,
                authProvider: AuthProvider.local,
                telephoneNumber: this.telephoneNumber.value
            };
            this._rest.post(this._authEnds.register, registerInfo)
                .subscribe(
                    result => {
                        this._toast.showSuccess("Account created successfully!");
                        this.loading = false;
                        this._router.navigate(['/login']);
                        this.IsWait = false;
                    },
                    error => {
                        this._toast.showError("Could not create account: " + error.error.message);
                        this.loading = false;
                        this.validRegister = false;
                    });
        }
    }

    getSubscriptions() {
        this.subsService.getAllForRegister().subscribe((subs: Subscription[]) => {
            this.subscriptions = subs;
            this.IsWait = false;
        });
    }

}

