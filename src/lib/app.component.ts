import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './shared/communication.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'gl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class RootComponent implements OnInit {
  constructor(public communication: CommunicationService) {}

  ngOnInit() {
    // this.communication.loadData().subscribe(res => {
    //   this.texts = res;
    // });
    // this.questions = QUESTIONS;
  }
}
