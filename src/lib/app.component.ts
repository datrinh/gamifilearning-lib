import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './shared/communication.service';
import { QUESTIONS } from './shared/question.service';
import { map } from 'rxjs/operators';
import { UserService } from './shared/user.service';

@Component({
  selector: 'gl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class RootComponent implements OnInit {
  texts = this.communication.loadData().pipe(map(data => data.slice(0, 5)));
  questions = QUESTIONS;
  constructor(
    public communication: CommunicationService,
    private user: UserService
  ) {}

  ngOnInit() {
    // this.communication.loadData().subscribe(res => {
    //   this.texts = res;
    // });
    // this.questions = QUESTIONS;
    this.user.login(
      'test',
      '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
    );
  }
}
