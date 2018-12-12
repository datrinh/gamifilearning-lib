import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user;
  userId: string;
  private token = null;

  constructor(private apollo: Apollo) {}

  login(username: string, password: string): void {
    this.apollo
      .query({
        query: gql`
          {
            login(username: "${username}", password: "${password}") {
              id,
              firstName,
              lastName,
              username,
              jwtToken {
                token
              }
            }
          }
        `
      })
      .subscribe((res: any) => {
        this.user = res.data.login;
        // this.userId = user.id;
        // this.token = user.jwtToken.token;
        console.log(this.user);
      });
  }

  logout(): void {
    this.apollo.query({
      query: gql`
        {
          logout()
        }
      `
    });
  }

  islogged(): Observable<boolean> {
    return this.apollo
      .query({
        query: gql`
          {
            me {
              active
            }
          }
        `
      })
      .pipe(map((res: any) => res.data.active));
  }
}
