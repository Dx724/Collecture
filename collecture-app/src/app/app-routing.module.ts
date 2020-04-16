import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainDashComponent } from './main-dash/main-dash.component';


const routes: Routes = [
  {path: "", component: MainDashComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
