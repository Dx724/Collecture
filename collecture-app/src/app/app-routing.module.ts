import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainDashComponent } from './main-dash/main-dash.component';
import { VideoViewComponent } from './video-view/video-view.component';
import { AboutComponent } from './about/about.component';
import { Error404Component } from './error404/error404.component';


const routes: Routes = [
  {path: "", component: MainDashComponent},
  {path: "viewLecture/:vidId", component: VideoViewComponent},
  {path: "about", component: AboutComponent},
  {path: "404.html", component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
