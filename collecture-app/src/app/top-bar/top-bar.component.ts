import { Component, OnInit } from '@angular/core';
import { LectureService } from '../lecture.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  doSearch(onInputEvt) {
    var searchTerms = onInputEvt.target.value.split(/[,; ]/);
    searchTerms = searchTerms.filter(st => st.trim() != ""); //Remove empty terms so a comma at end of input doesn't return all
    this.lectService.setSearchTerms(searchTerms);
  }

  constructor(private lectService: LectureService) { }

  ngOnInit(): void {
  }

}
