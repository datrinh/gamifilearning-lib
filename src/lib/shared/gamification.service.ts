import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const GIPHY_API_KEY = 'n8VZGDtSpax8HM6j486SScMj5vMcavN2';
const GIPHY_URL = 'http://api.giphy.com/v1/gifs/search';

@Injectable({
  providedIn: 'root'
})
export class GamificationService {
  private currentScore = 500;
  private score = new BehaviorSubject(this.currentScore);
  score$ = this.score.asObservable();
  constructor(private http: HttpClient) {}

  increaseScore(weight: number) {
    this.currentScore = this.currentScore + Math.floor(weight * 100);
    this.score.next(this.currentScore);
  }

  getTrivia(date: Date = new Date()) {
    console.log(date.getMonth(), date.getDate());
    return this.http.get(
      `http://numbersapi.com/${date.getMonth() + 1}/${date.getDate()}/date`,
      {
        responseType: 'text'
      }
    );
  }

  getRandomGif(query: string) {
    return this.http
      .get(GIPHY_URL, {
        params: {
          api_key: GIPHY_API_KEY,
          limit: '50',
          rating: 'g',
          q: query
        }
      })
      .pipe(
        // get a random gif out of the array of gifs
        map((gif: any) => this.getRandomElement(gif.data))
      );
  }

  private getRandomElement(array: []) {
    return array[Math.floor(Math.random() * array.length)];
  }
}
