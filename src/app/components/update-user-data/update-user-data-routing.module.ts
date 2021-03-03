import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateUserDataComponent } from './update-user-data.component';


const routes: Routes = [
    {
        path: '',
        component: UpdateUserDataComponent,
        data: {
            title: 'UpdateUserData'
        },
    }
  ];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UpdateUserDataRoutingModule { }