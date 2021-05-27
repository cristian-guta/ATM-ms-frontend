import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientEmotionsComponent } from "./client-emotions.component";

const routes: Routes = [
    {
        path: '',
        component: ClientEmotionsComponent,
        data: {
            title: 'Client emotions'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientEmotionsRoutingModule{}