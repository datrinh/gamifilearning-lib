import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { QuestionService } from '../shared/question.service';
import { MatSelectionList } from '@angular/material/list';
import { GamificationService } from '../shared/gamification.service';
import {
  JsonFeature,
  Question,
  Answer,
  ObjectToLabel
} from '../shared/data.interface';
import { ENTROPY_INDEX } from '../config';
import { BackendResponse } from '../shared/communication.service';

@Component({
  selector: 'gl-question-room',
  templateUrl: './question-room.component.html',
  styleUrls: ['./question-room.component.scss']
})
export class QuestionRoomComponent implements OnInit {
  clicked = false;
  currentQuestion = 0;
  // activeIndex = 0;

  // @Input() texts: JsonFeature[];
  // @Input() questions: Question[];
  @Input() maxProgress;
  activeIndex = 0;
  @Input() currentInstance: BackendResponse;

  numberOfQuestions;

  @ViewChild('selectionList')
  selection: MatSelectionList;
  constructor(
    private question: QuestionService,
    private gamification: GamificationService
  ) {}

  ngOnInit() {
    console.log(
      this.currentInstance,
      this.currentQuestion,
      this.numberOfQuestions
    );
    this.question.currentInstance$.subscribe(instance => {
      // if (instance) {
      this.currentInstance = instance;
      this.numberOfQuestions = this.currentInstance.toBeLabeled.length;
      // }
    });
    // console.log(this.texts, this.questions);
  }

  isDone(): boolean {
    return !(this.activeIndex < this.maxProgress);
  }

  getNext() {
    this.question.updateNextInstance();
  }

  answerQuestion() {
    console.log(
      this.currentInstance,
      this.currentQuestion,
      this.numberOfQuestions
    );
    if (this.currentQuestion + 1 < this.numberOfQuestions) {
      this.currentQuestion++;
    } else {
      this.currentQuestion = 0;
      this.activeIndex++;
    }
  }

  submitAnswer(answer: string) {
    this.gamification.increaseScore(this.currentInstance.selectionScore);
    // console.log('Answered:', answer, this.currentQuestion);
    // Simple array with all selected answers
    // const selectedAnswers: string[] = [];
    // this.selection.selectedOptions.selected.forEach(selected => {
    //   selectedAnswers.push(selected.value);
    // });
    // this.question.handleSubmittedAnswers(
    //   selectedAnswers,
    //   this.currentInstance.objectId
    // );
    // this.activeIndex++;
    this.answerQuestion();
    this.getNext();
  }
}
