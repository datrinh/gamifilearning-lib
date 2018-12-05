import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QuestionService } from '../shared/question.service';
import { MatSelectionList } from '@angular/material/list';
import { GamificationService } from '../shared/gamification.service';
import { JsonFeature } from '../shared/interfaces';
import { ENTROPY_INDEX } from '../shared/settings';

@Component({
  selector: 'gl-question-room',
  templateUrl: './question-room.component.html',
  styleUrls: ['./question-room.component.scss']
})
export class QuestionRoomComponent implements OnInit {
  question = this.questionService;
  clicked = false;

  @ViewChild('selectionList')
  selection: MatSelectionList;
  constructor(
    private questionService: QuestionService,
    private gamification: GamificationService
  ) {}

  ngOnInit() {}

  isDone() {
    return !(this.question.activeTextIndex < this.question.numberOfTexts);
  }

  submitAnswer(currentText: JsonFeature) {
    this.gamification.increaseScore(currentText.features[1][ENTROPY_INDEX]);
    const answers: string[] = [];
    this.selection.selectedOptions.selected.forEach(selected => {
      answers.push(selected.value);
    });
    this.question.handleSubmittedAnswers(answers);
    console.log(currentText);
  }
}
