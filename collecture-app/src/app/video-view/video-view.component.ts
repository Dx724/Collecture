import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LectureService } from '../lecture.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {
  videoInfo;
  videoUrl: SafeUrl;

  constructor(private activatedRoute: ActivatedRoute, private lectureService: LectureService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      //this.lectureService.setActiveTitle("");
      this.lectureService.getVideoById(+params.get("vidId")).subscribe((vidData) => {
        //console.log("VidData", vidData);
        if (vidData) {
          this.videoInfo = vidData;
          this.lectureService.setActiveTitle(vidData.title);
          if (vidData.ytId) {
            this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube-nocookie.com/embed/" + vidData.ytId + "?modestbranding=1&start=0&color=white");
          }
          else {
            this.videoInfo = {error: 2};
          }
        }
        else {
          this.videoInfo = {error: 1};
        }
      });
    });
  }

}
