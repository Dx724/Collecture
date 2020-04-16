import { Component } from '@angular/core';
import { map, debounceTime } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { LectureService } from '../lecture.service';
import { VideoJson } from '../lecture.service';

@Component({
  selector: 'app-main-dash',
  templateUrl: './main-dash.component.html',
  styleUrls: ['./main-dash.component.css']
})
export class MainDashComponent {
  /** Based on the screen size, switch from standard to one column per row */
  numCols = 2;
  lectCards;
  rowHeight = ""; //Define this as an empty string to keep the cards as squares
  searchTerms = [""];

  doSearch(onInputEvt) {
    this.searchTerms = onInputEvt.target.value.split(",");
    if (this.searchTerms.length == 1 && this.searchTerms[0].trim() == "") {
      //Empty search -> show all (already happens)
    }
    else {
      this.searchTerms = this.searchTerms.filter(st => st.trim() != ""); //Otherwise, remove empty terms so a comma at end of input doesn't return all
    }
    // this.lc_filtered = this.lectCards.pipe(
    //   debounceTime(300),
    //   map((vidArray: Array<VideoJson>) => {
    //     return (vidArray.filter(vid => {
    //       for (var searchTerm of searchTerms) {
    //         if (vid.title.toLowerCase().indexOf(searchTerm.trim().toLowerCase()) != -1) return true;
    //       }
    //       return false;
    //     }));
    //   })
    // );
  }

  shouldShow(title) {
    for (var searchTerm of this.searchTerms) {
      if (title.toLowerCase().indexOf(searchTerm.trim().toLowerCase()) != -1) return true;
    }
    return false;
  }

  constructor(private breakpointObserver: BreakpointObserver, lectureService: LectureService) {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(
      result => {this.numCols = result.matches ? 2 : 4;}
    );

    this.lectCards = lectureService.getVideos();
  }
}
