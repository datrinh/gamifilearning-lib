import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { QuestionService } from '../shared/question.service';
import { MatSelectionList } from '@angular/material/list';
import { GamificationService } from '../shared/gamification.service';
import {
  JsonFeature,
  Answer,
  ObjectToLabel,
  BackendResponse
} from '../shared/data.interface';
import { ENTROPY_INDEX } from '../config';
import { UserService } from '../shared/user.service';
import { CommunicationService } from '../shared/communication.service';

@Component({
  selector: 'gl-question-room',
  templateUrl: './question-room.component.html',
  styleUrls: ['./question-room.component.scss']
})
export class QuestionRoomComponent implements OnInit {
  clicked = false;
  currentQuestion = 0;
  activeIndex = 0;
  tempAnswers: Answer[] = [];

  // @Input() texts: JsonFeature[];
  // @Input() questions: Question[];
  @Input() maxProgress;
  @Input() currentInstance: BackendResponse;

  numberOfQuestions: number;

  @ViewChild('selectionList')
  selection: MatSelectionList;
  constructor(
    private question: QuestionService,
    private gamification: GamificationService,
    private communication: CommunicationService,
    private user: UserService
  ) {}

  ngOnInit() {
    this.question.currentInstance$.subscribe(instance => {
      if (instance) {
        this.currentInstance = instance;
        this.numberOfQuestions = this.currentInstance.toBeLabeled.length;
      }
    });
  }

  isDone(): boolean {
    return !(this.activeIndex < this.maxProgress);
  }

  getNext() {
    // this.question.updateNextInstance();
  }

  answerQuestion(answer: string) {
    if (this.currentQuestion + 1 < this.numberOfQuestions) {
      this.tempAnswers = [...this.tempAnswers, this.createAnswer(answer)];
      this.currentQuestion++;
    } else {
      // One Iteration of Question-Package done
      this.sendAnswer(this.currentInstance, answer);
      this.currentQuestion = 0;
      this.activeIndex++;
    }
  }

  sendAnswer(instance, answer: string) {
    const answersToBackend = this.tempAnswers.concat(this.createAnswer(answer));
    console.log(answersToBackend);
    this.communication.sendAnswersBack(answersToBackend).subscribe(res => {
      this.tempAnswers = [];
      this.question.updateNextInstance();
    });
  }

  private createAnswer(answer: string): Answer {
    let newAnswer: Answer;
    newAnswer = {
      answer: answer,
      customerId: 'gema',
      objectId: this.currentInstance.objectId,
      questionId: this.currentInstance.toBeLabeled[this.currentQuestion]
        .question.questionId,
      timestamp: new Date().toDateString(),
      userId: '1'
      // Todo: User Service in lib after all?
      // userId: this.user.getCurrentUserId()
    };
    return newAnswer;
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
    this.answerQuestion(answer);
    // this.getNext();
  }
}
