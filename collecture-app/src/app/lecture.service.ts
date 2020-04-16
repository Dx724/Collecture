import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LectureService {
  loadedData; //Only load once
  activeObservable;


  getVideos() {
    if (this.loadedData) { //Return cached data if present
      return of(this.loadedData);
    }
    else if (this.activeObservable) {
      return this.activeObservable;
    }
    else {
      this.activeObservable = this.http.get('/assets/lectures.json', {
        observe: 'response'
      }).pipe(
        map(response => {
          this.activeObservable = null;
          if (response.status === 400) {
            console.error("Data load error!");
            return null;
          }
          else if (response.status === 200) {
            this.loadedData = response.body;
            return this.loadedData;
          }
        },
        share())
      );
    }
    return this.activeObservable;
  }

  getVideoById(id) {
    return this.getVideos().pipe(
      map((vidArray: Array<Object>) => {
        return vidArray.length > id ? vidArray[id] : null;
      })
    );
  }

  constructor(private http: HttpClient) {
  }
}
