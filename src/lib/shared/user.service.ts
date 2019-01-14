import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  id: number;
  username: string;
  jwtToken: { token: string };
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;

  constructor() {}

  // login(username: string, password: string): Observable<User> {
  //   return this.apollo
  //     .query({
  //       query: gql`
  //         {
  //           login(username: "${username}", password: "${password}") {
  //             id,
  //             firstName,
  //             lastName,
  //             username,
  //             jwtToken {
  //               token
  //             }
  //           }
  //         }
  //       `
  //     })
  //     .pipe(
  //       map((res: any) => {
  //         this.user = res.data.login;
  //         window.localStorage.setItem('token', this.user.jwtToken.token);
  //         return this.user;
  //       })
  //     );
  // }

  // logout(): void {
  //   this.apollo
  //     .query({
  //       query: gql`
  //         {
  //           logout
  //         }
  //       `
  //     })
  //     .subscribe(
  //       _ => {
  //         window.localStorage.removeItem('token');
  //         this.router.navigate(['/']);
  //       },
  //       err => {
  //         console.error(err);
  //       }
  //     );
  // }

  // isLogged(): boolean {
  //   return window.localStorage.getItem('token') ? true : false;
  // }
}
