import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { LectureService } from '../lecture.service';

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

  constructor(private breakpointObserver: BreakpointObserver, lectureService: LectureService) {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(
      result => {this.numCols = result.matches ? 2 : 4;}
    );

    this.lectCards = lectureService.getVideos();
  }
}
