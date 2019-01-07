import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { QuestionService } from '../shared/question.service';
import { MatSelectionList } from '@angular/material/list';
import { GamificationService } from '../shared/gamification.service';
import { Answer, BackendResponse } from '../shared/data.interface';
import { UserService } from '../shared/user.service';
import { CommunicationService } from '../shared/communication.service';
import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
  state,
  useAnimation
} from '@angular/animations';
import { pulseAnimation } from '../shared/animations';

export interface Reward {
  position: number;
  unlocked: boolean;
  // label: string;
  icon: string;
}

@Component({
  selector: 'gl-question-room',
  templateUrl: './question-room.component.html',
  styleUrls: ['./question-room.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':increment', [
        animate(
          '300ms',
          keyframes([style({ opacity: '0' }), style({ opacity: '1' })])
        )
      ])
    ]),
    trigger('unlockReward', [
      transition('false => true', [
        useAnimation(pulseAnimation, {
          params: {
            timings: '400ms cubic-bezier(.11,.99,.83,.43)',
            scale: 1.5
          }
        })
      ])
    ])
  ]
})
export class QuestionRoomComponent implements OnInit {
  clicked = false;
  currentQuestion = 0;
  activeIndex = 0;
  tempAnswers: Answer[] = [];

  @Input() maxProgress;
  @Input() currentInstance: BackendResponse;
  @Input() rewards: Reward[] = [
    { icon: 'whatshot', position: 34, unlocked: false },
    { icon: 'whatshot', position: 67, unlocked: false }
  ];

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

  answerQuestion(answer: string) {
    if (this.currentQuestion + 1 < this.numberOfQuestions) {
      this.tempAnswers = [...this.tempAnswers, this.createAnswer(answer)];
      this.currentQuestion++;
    } else {
      // One Iteration of Question-Package done
      this.sendAnswer(answer);
      this.currentQuestion = 0;
      this.activeIndex++;
      this.rewards
        .filter(reward => reward.unlocked === false)
        .forEach(reward => {
          if ((this.activeIndex / this.maxProgress) * 100 >= reward.position) {
            reward.unlocked = true;
          }
        });
    }
  }

  sendAnswer(answer: string) {
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
    this.answerQuestion(answer);
  }
}
