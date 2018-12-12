import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId: string;

  constructor(private communication: CommunicationService) {}

  login(password: string) {}
}
