import { Component, OnInit } from '@angular/core';
import { LectureService } from '../lecture.service';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  searchVisible = false;
  centerText = "";
  smallMode = false;

  doSearch(onInputEvt) {
    var searchTerms = onInputEvt.target.value.split(/[,; ]/);
    searchTerms = searchTerms.filter(st => st.trim() != ""); //Remove empty terms so a comma at end of input doesn't return all
    this.lectService.setSearchTerms(searchTerms);
  }

  constructor(private breakpointObserver: BreakpointObserver, private lectService: LectureService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => this.searchVisible = this.router.url == "/");
    this.lectService.getActiveTitle().subscribe({next: (titleText: string) => {
      this.centerText = titleText;
      //console.log("MapGet", titleText);
    }});
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(
      result => {
        this.smallMode = result.matches ? true : false;
      }
    );
  }

}
