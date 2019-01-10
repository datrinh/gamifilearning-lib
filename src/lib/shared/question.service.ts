import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JsonFeature, BackendResponse, Answer } from './data.interface.js';
import { NUMBER_OF_TEXTS, UNLABELED_INDEX, ENTROPY_INDEX } from '../config.js';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  data: JsonFeature[] = [];

  private currentInstance = new BehaviorSubject<BackendResponse>(null);
  currentInstance$ = this.currentInstance.asObservable();

  private answers = new BehaviorSubject<Answer[]>([]);
  answers$ = this.answers.asObservable();

  constructor(/** private communication: CommunicationService*/) {
    // this.updateNextInstance();
  }

  getUnlabeledInstances(data: JsonFeature[] = this.data): JsonFeature[] {
    return data.filter(feature => feature.features[1][UNLABELED_INDEX] != null);
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

  handleSubmittedAnswers(answers: Answer[]) {
    this.answers.next(answers);
  }
}
