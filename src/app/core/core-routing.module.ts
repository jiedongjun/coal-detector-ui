import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContentComponent} from "./content/content.component";

const routes: Routes = [
  { path: '', redirectTo: 'homePage', pathMatch: 'full' },
  { path: 'homePage', component: ContentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
