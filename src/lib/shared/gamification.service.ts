import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const GIPHY_API_KEY = 'n8VZGDtSpax8HM6j486SScMj5vMcavN2';

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

  getPicOfTheDay() {
    return this.http
      .get('http://api.giphy.com/v1/gifs/trending', {
        params: {
          api_key: GIPHY_API_KEY,
          limit: '1',
          rating: 'g'
        }
      })
      .pipe(map((gif: any) => gif.data[0]));
  }
}
