import { Component, OnInit } from '@angular/core';
import { LectureService } from '../lecture.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private lectureService: LectureService) { }

  ngOnInit(): void {
    this.lectureService.setActiveTitle("");
  }

}
