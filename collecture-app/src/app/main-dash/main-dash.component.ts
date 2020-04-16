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

  shouldShow(title, tags) {
    this.searchTerms = this.lectureService.getSearchTerms();
    if (this.searchTerms.length == 0 || (this.searchTerms.length == 1 && this.searchTerms[0].trim() == "")) return true; //Show all items for empty search
    for (var searchTerm of this.searchTerms) {
      searchTerm = searchTerm.trim().toLowerCase();
      if (!searchTerm.startsWith(this.tagSearchPrefix)) { //Normal search terms !searchTerm.startsWith(this.tagSearchPrefix)
        if (title.toLowerCase().indexOf(searchTerm.trim().toLowerCase()) == -1) return false;
      }
      else { //Tags
        var tagValue = searchTerm.substring(this.tagSearchPrefix.length);
        if (tagValue != "" && title.toLowerCase().indexOf(searchTerm.trim().toLowerCase()) == -1) {  //Can also match on title (so "Lecture #3" still matched) 
          var tagMatched = false;
          for (var tag of tags) {
            if (tag.toLowerCase().indexOf(tagValue) != -1) tagMatched = true;
          }
          if (!tagMatched) return false;
        }
      }
    }
    return true;
  }

  constructor(private breakpointObserver: BreakpointObserver, private lectureService: LectureService) {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(
      result => {this.numCols = result.matches ? 2 : 4;}
    );

    this.lectCards = lectureService.getVideos();
  }
}
