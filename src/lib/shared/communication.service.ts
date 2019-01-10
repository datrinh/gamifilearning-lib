import { Injectable } from '@angular/core';
import { JsonFeature, BackendResponse, Answer } from './data.interface';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UNLABELED_INDEX, ENTROPY_INDEX, URL_TO_DATA } from '../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  data: JsonFeature[] = [];
  constructor(private http: HttpClient) {}
  loadData(src: string = URL_TO_DATA): Observable<JsonFeature[]> {
    return this.http
      .get<JsonFeature[]>(URL_TO_DATA)
      .pipe(map(res => this.enhanceFeatures(res)));
  }

  /** Mocking data to add unlabeled data and selectionScore (entropy) */
  enhanceFeatures(data: JsonFeature[]): JsonFeature[] {
    const features = data;
    for (let i = 0; i < features.length / 2; i++) {
      features[i]['features'][1][UNLABELED_INDEX] = 0;
      features[i]['features'][1][ENTROPY_INDEX] = Math.random();
    }
    return features;
  }

  // getNextInstance(): Observable<BackendResponse> {
  //   // TODO clean up subscribe chain
  //   return this.http.get<BackendResponse>('assets/mock.dataobject.json').pipe(
  //     map(obj => {
  //       this.http
  //         .get<string>('https://icanhazdadjoke.com/', {
  //           headers: new HttpHeaders({
  //             Accept: 'application/json'
  //           })
  //         })
  //         .subscribe((quote: any) => {
  //           obj.text = quote.joke;
  //         });
  //       obj.objectId = Math.floor(Math.random() * 100);
  //       return obj;
  //     })
  //   );
  // }

  // sendAnswersBack(answer: Answer[]): Observable<boolean> {
  //   // Fake connection
  //   return of(true);
  // }
}
