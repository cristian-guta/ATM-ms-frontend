import { ToastrService, ActiveToast, IndividualConfig } from 'ngx-toastr';
import { Injectable } from '@angular/core';




@Injectable({
    providedIn: 'root'
})
export class ToastService {

    private readonly customConfigSuccess: Partial<IndividualConfig> = {
        closeButton: true,
        progressBar: true
    };
    private readonly customConfigError: Partial<IndividualConfig> = {
        closeButton: true,
        progressBar: true,
        timeOut: 10000
    };

    constructor(
        private _toastr: ToastrService
    ) { }

    showInfo(title): ActiveToast<any> {
        return this._toastr.info(title, '', this.customConfigSuccess);
    }

    showSuccess(title): ActiveToast<any> {
        return this._toastr.success(title, '', this.customConfigSuccess);
    }

    showWarning(title): ActiveToast<any> {
        return this._toastr.warning(title, '', this.customConfigError);
    }

    showError(title): ActiveToast<any> {
        return this._toastr.error(title, '', this.customConfigError);
    }
}
