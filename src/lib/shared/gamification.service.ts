import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const GIPHY_API_KEY = 'n8VZGDtSpax8HM6j486SScMj5vMcavN2';
const GIPHY_URL = 'http://api.giphy.com/v1/gifs/search';

@Injectable({
  providedIn: 'root'
})
export class GamificationService {
  private score = new BehaviorSubject(0);
  score$ = this.score.asObservable();

  private progress = new BehaviorSubject(0);
  progress$ = this.progress.asObservable();

  constructor(private http: HttpClient) {
    this.fetchScore().subscribe(score => this.score.next(score));
  }

  increaseScore(weight: number) {
    this.doIncreaseScore(weight).subscribe(score => this.score.next(score));
    // this.score.next(this.score.value + Math.floor(weight * 100));
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
        // chose a random gif out of the array of gifs
        map((gif: any) => this.getRandomElement(gif.data))
      );
  }

  // currently mocked. Should be persisted in backend later
  private fetchScore() {
    return of(500);
  }

  // currently mocked too
  private doIncreaseScore(weight: number) {
    return of(this.score.value + Math.floor(weight * 100));
  }

  /** Helper function to chose a random element from an array */
  private getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}
