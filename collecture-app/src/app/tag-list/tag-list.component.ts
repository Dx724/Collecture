import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {

  @Input() tags;

  constructor() { }

  ngOnInit(): void {
  }

}
