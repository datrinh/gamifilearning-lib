import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { pulseAnimation } from '../shared/animations';
import { GamificationService } from '../shared/gamification.service';

@Component({
  selector: 'gl-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('scoreChange', [
      transition(
        ':increment',
        useAnimation(pulseAnimation, {
          params: {
            timings: '400ms cubic-bezier(.11,.99,.83,.43)',
            scale: 1.25
          }
        })
      )
    ])
  ]
})
export class NavbarComponent implements OnInit {
  gamification = this.gamificationService;
  constructor(private gamificationService: GamificationService) {}

  ngOnInit() {}
}
