import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CommunicationService } from './communication.service.js';
import {
  JsonFeature,
  Answer,
  DataObject,
  ObjectToLabel,
  BackendResponse
} from './data.interface.js';
import { NUMBER_OF_TEXTS, UNLABELED_INDEX, ENTROPY_INDEX } from '../config.js';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  data: JsonFeature[] = [];

  private currentInstance = new BehaviorSubject<BackendResponse>(null);
  currentInstance$ = this.currentInstance.asObservable();

  private progress = new BehaviorSubject(0);
  progress$ = this.progress.asObservable();

  // private textsStore: JsonFeature[] = [];
  // private texts = new BehaviorSubject([]);
  // texts$ = this.texts.asObservable();

  constructor(private communication: CommunicationService) {
    this.updateNextInstance();
  }

  getUnlabeledInstances(data: JsonFeature[] = this.data): JsonFeature[] {
    return data.filter(feature => feature.features[1][UNLABELED_INDEX] != null);
  }

  updateNextInstance() {
    this.communication.getNextInstance().subscribe(instance => {
      this.currentInstance.next(instance);
    });
  }

  /**
   * Return top scoring data objects
   * @param data corresponding data set
   * @param number number of instances to return
   */
  getTopInstances(
    data: JsonFeature[],
    number: number = NUMBER_OF_TEXTS
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

  // startLearning(features) {
  //   this.textsStore = this.getTopInstances(features);
  //   this.texts.next(this.textsStore);
  // }

  // getTextByIndex(index: number): JsonFeature {
  //   return this.textsStore[index];
  // }

  handleSubmittedAnswers(selectedAnswers: string[], featureId: number) {}

  // handleSubmittedAnswers(
  //   selectedAnswers: string[],
  //   feature: JsonFeature
  // ): void {
  //   this.answers = [
  //     ...this.answers,
  //     this.createAnswers(selectedAnswers, feature.id)
  //   ];
  //   console.log(this.answers);
  // }

  // private createAnswers(selectedAnswers: string[], id: number): Answer {
  //   // push a new empty element to avoid undefined
  //   const answer: Answer = {
  //     featureId: id,
  //     answers: {}
  //   };
  //   // fill out answers for each question

  //   this.questions.forEach(question => {
  //     if (
  //       selectedAnswers.find(selectedAnswer => selectedAnswer === question.id)
  //     ) {
  //       answer.answers[question.id] = true;
  //     } else {
  //       answer.answers[question.id] = false;
  //     }
  //   });
  //   return answer;
  // }
}
