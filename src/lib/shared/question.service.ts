import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommunicationService } from './communication.service.js';
import { JsonFeature, Question, Answer } from './interfaces.js';
import { NUMBER_OF_TEXTS, UNLABELED_INDEX, ENTROPY_INDEX } from './settings.js';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  questions: Question[] = [
    { id: 'music', label: 'Hat der Text Musikbezug?' },
    { id: 'event', label: 'Geht es um eine Veranstaltung?' }
  ];
  answers: Answer[] = [];
  activeTextIndex = 0;
  numberOfTexts = NUMBER_OF_TEXTS;
  data: JsonFeature[] = [];

  private progress = new BehaviorSubject(0);
  progress$ = this.progress.asObservable();

  private textsStore: JsonFeature[] = [];
  private texts = new BehaviorSubject([]);
  texts$ = this.texts.asObservable();

  constructor(private communication: CommunicationService) {}

  getUnlabeledInstances(data: JsonFeature[] = this.data): JsonFeature[] {
    return data.filter(feature => feature.features[1][UNLABELED_INDEX] != null);
  }

  getTopInstances(
    data: JsonFeature[] = this.data,
    number: number = this.numberOfTexts
  ): JsonFeature[] {
    const unlabeled = this.getUnlabeledInstances(data);
    return unlabeled
      .sort((a, b) => {
        if (a.features[1][ENTROPY_INDEX] < b.features[1][ENTROPY_INDEX]) {
          return 1;
        } else {
          return -1;
        }
      })
      .slice(0, number);
  }

  startLearning(features) {
    this.textsStore = this.getTopInstances(features);
    this.texts.next(this.textsStore);
  }

  getTextByIndex(index: number): JsonFeature {
    return this.textsStore[index];
  }

  handleSubmittedAnswers(selectedAnswers: string[]): void {
    this.addAnswersToTexts(selectedAnswers);
    // fake score inc
    // this.texts.next(this.textsStore);
    // this.activeTextIndex++;
    this.updateProgress();
  }

  private addAnswersToTexts(selectedAnswers) {
    // push a new empty element to avoid undefined
    this.answers.push({ id: this.activeTextIndex, answers: {} });
    // fill out answers for each question
    this.questions.forEach(question => {
      if (selectedAnswers.find(x => x === question.id)) {
        this.answers[this.activeTextIndex].answers[question.id] = true;
      } else {
        this.answers[this.activeTextIndex].answers[question.id] = false;
      }
    });
    console.log(this.answers);
  }

  private updateProgress(): void {
    this.progress.next((this.activeTextIndex / this.numberOfTexts) * 100);
    console.log(this.progress.value);
  }
}
