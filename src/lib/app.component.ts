import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class RootComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // this.communication.loadData().subscribe(res => {
    //   this.texts = res;
    // });
    // this.questions = QUESTIONS;
  }
}
