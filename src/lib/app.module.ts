import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RootComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import {
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatProgressBarModule,
  MatInputModule,
  MatTableModule,
  MatToolbarModule,
  MatBadgeModule,
  MatListModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { QuestionRoomComponent } from './question-room/question-room.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChartComponent } from './chart/chart.component';
import { HttpClientModule } from '@angular/common/http';

const MaterialModules = [
  MatInputModule,
  MatProgressBarModule,
  MatCardModule,
  MatButtonModule,
  MatGridListModule,
  MatMenuModule,
  MatIconModule,
  LayoutModule,
  MatTableModule,
  MatToolbarModule,
  MatBadgeModule,
  MatListModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [
    RootComponent,
    DashboardComponent,
    LeaderboardComponent,
    QuestionRoomComponent,
    NavbarComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModules,
    HttpClientModule
    // NgxChartsModule
  ],
  providers: [],
  bootstrap: [RootComponent],
  exports: [RootComponent, QuestionRoomComponent],
  entryComponents: [QuestionRoomComponent]
})
export class GLModule {}