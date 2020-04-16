import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainDashComponent } from './main-dash/main-dash.component';
import { VideoViewComponent } from './video-view/video-view.component';


const routes: Routes = [
  {path: "", component: MainDashComponent},
  {path: "viewLecture/:vidId", component: VideoViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
