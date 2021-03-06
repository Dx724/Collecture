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
  rowHeight = "10:11"; //Define this as an empty string to keep the cards as squares
  searchTerms = [""];

  /*
  doSearch(onInputEvt) {
    this.searchTerms = onInputEvt.target.value.split(/[,; ]/);
    this.searchTerms = this.searchTerms.filter(st => st.trim() != ""); //Remove empty terms so a comma at end of input doesn't return all
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
  */

  tagSearchPrefix = "#"; //Also used to display tags in tag-list.component

  shouldShow(title, tags) { //Searches within tags and titles (however "#tag" will only match "#tag" and not "tag" in a title)
    this.searchTerms = this.lectureService.getSearchTerms();
    if (this.searchTerms.length == 0 || (this.searchTerms.length == 1 && this.searchTerms[0].trim() == "")) return true; //Show all items for empty search
    for (var searchTerm of this.searchTerms) {
      searchTerm = searchTerm.trim().toLowerCase();
      if (title.toLowerCase().indexOf(searchTerm.trim().toLowerCase()) == -1) { //If search term not found in title, can also check tags [searchTerm.startsWith(this.tagSearchPrefix) && ]
        var tagValue = searchTerm.substring(searchTerm.startsWith(this.tagSearchPrefix) ? this.tagSearchPrefix.length : 0);
        if (tagValue != "") {  //Can also match on title (so "Lecture #3" still matched) [ && title.toLowerCase().indexOf(searchTerm.trim().toLowerCase()) == -1]
          var tagMatched = false;
          for (var tag of tags) {
            if (tag.toLowerCase().indexOf(tagValue) != -1) tagMatched = true; //Should explicit tags (including prefix) only match if index returns 0? (#3 match #18.03?, #-lab match #physics-lab and #chemistry-lab?)
          }
          if (!tagMatched) return false;
        }
      }
    }
    return true;
  }

  constructor(private breakpointObserver: BreakpointObserver, private lectureService: LectureService) {
    this.breakpointObserver.observe([Breakpoints.Large]).subscribe(
      result => {
        this.numCols = result.matches ? 4 : 2;
      }
    );
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(
      result => {
        this.rowHeight = result.matches ? "10:11" : "10:10";
      }
    );
    /*this.breakpointObserver.observe("(orientation: portrait)").subscribe(
      result => {
        this.rowHeight = result.matches ? "10:11" : "1:1.1";
      }
    );*/

    this.lectCards = lectureService.getVideos();
  }
}
