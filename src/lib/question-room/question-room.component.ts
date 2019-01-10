import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { QuestionService } from '../shared/question.service';
import { MatSelectionList } from '@angular/material/list';
import { GamificationService } from '../shared/gamification.service';
import { Answer, BackendResponse } from '../shared/data.interface';
import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
  useAnimation
} from '@angular/animations';
import { pulseAnimation } from '../shared/animations';
import { MatDialog } from '@angular/material';
import { RewardDialogComponent } from '../reward-dialog/reward-dialog.component';

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
  currentQuestion = 0;
  // activeIndex = 0;
  tempAnswers: Answer[] = [];

  @Input() maxProgress: number;
  @Input() done: number;
  @Input() currentInstance: any;
  @Input() rewards: Reward[];
  @Input() questions: string[];
  @Input() answers: string[];

  // numberOfQuestions: number;

  @ViewChild('selectionList')
  selection: MatSelectionList;
  constructor(
    private question: QuestionService,
    private gamification: GamificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.checkRewards();
  }

  isDone(): boolean {
    return !(this.done < this.maxProgress);
  }

  sendAnswer(answer: string) {
    const answersToBackend = this.tempAnswers.concat(this.createAnswer(answer));
    this.tempAnswers = [];
    this.question.handleSubmittedAnswers(answersToBackend);
  }

  claimReward(isUnlocked: boolean) {
    if (isUnlocked) {
      this.dialog.open(RewardDialogComponent);
    }
  }

  /**
   * Handle keyboard interaction
   * Only working hardcoded for yes,no,maybe
   */
  onKey(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        this.submitAnswer('yes');
        break;
      case 'ArrowRight':
        this.submitAnswer('no');
        break;
      case 'ArrowUp':
        this.submitAnswer('maybe');
        break;
      default:
        return null;
    }
  }

  private createAnswer(answer: string): Answer {
    let newAnswer: Answer;
    newAnswer = {
      answer: answer,
      // customerId: 'gema',
      documentId: this.currentInstance.id,
      // questionId: this.currentInstance.toBeLabeled[this.currentQuestion]
      //   .question.questionId
      questionId: this.questions[this.currentQuestion]
      // timestamp: new Date().toDateString(),
      // userId: '1'
      // Todo: User Service in lib after all?
      // userId: this.user.getCurrentUserId()
    };
    return newAnswer;
  }

  private checkRewards() {
    this.rewards
      .filter(reward => reward.unlocked === false)
      .forEach(reward => {
        if ((this.done / this.maxProgress) * 100 >= reward.position) {
          reward.unlocked = true;
        }
      });
  }

  submitAnswer(answer: string) {
    // this.gamification.increaseScore(this.currentInstance.selectionScore);
    if (this.currentQuestion + 1 < this.questions.length) {
      this.tempAnswers = [...this.tempAnswers, this.createAnswer(answer)];
      this.currentQuestion++;
    } else {
      // One Iteration of Question-Package done
      this.sendAnswer(answer);
      this.currentQuestion = 0;
      this.done++;
      this.checkRewards();
    }
  }
}
