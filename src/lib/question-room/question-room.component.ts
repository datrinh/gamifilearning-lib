import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { QuestionService } from '../shared/question.service';
import { MatSelectionList } from '@angular/material/list';
import { GamificationService } from '../shared/gamification.service';
import { JsonFeature, Question } from '../shared/interfaces';
import { ENTROPY_INDEX } from '../shared/settings';

@Component({
  selector: 'gl-question-room',
  templateUrl: './question-room.component.html',
  styleUrls: ['./question-room.component.scss']
})
export class QuestionRoomComponent implements OnInit {
  question = this.questionService;
  clicked = false;
  activeIndex = 0;

  @Input() texts: JsonFeature[];
  @Input() questions: Question[];

  @ViewChild('selectionList')
  selection: MatSelectionList;
  constructor(
    private questionService: QuestionService,
    private gamification: GamificationService
  ) {}

  ngOnInit() {
    console.log(this.texts, this.questions);
  }

  isDone() {
    return !(this.activeIndex < this.texts.length);
  }

  submitAnswer(currentText: JsonFeature) {
    this.gamification.increaseScore(currentText.features[1][ENTROPY_INDEX]);
    const answers: string[] = [];
    this.selection.selectedOptions.selected.forEach(selected => {
      answers.push(selected.value);
    });
    this.question.handleSubmittedAnswers(answers);
    console.log(currentText);
    this.activeIndex++;
  }
}
