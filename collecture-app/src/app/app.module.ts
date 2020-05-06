import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainDashComponent } from './main-dash/main-dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LayoutModule } from '@angular/cdk/layout';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { VideoViewComponent } from './video-view/video-view.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { AboutComponent } from './about/about.component';
import { Error404Component } from './error404/error404.component';
import { ReversePipe } from './reverse.pipe';
import { FittextDirective } from './fittext.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { ShareButtonModule, ShareButton } from '@ngx-share/button';
import { PlatformModule } from '@angular/cdk/platform';

@NgModule({
  declarations: [
    AppComponent,
    MainDashComponent,
    TopBarComponent,
    VideoViewComponent,
    TagListComponent,
    AboutComponent,
    Error404Component,
    ReversePipe,
    FittextDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    HttpClientModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    FontAwesomeModule,
    ShareButtonsModule,
    ShareButtonModule,
    PlatformModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
