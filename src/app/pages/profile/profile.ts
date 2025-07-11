import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { DashboardStateService } from '../../services/dashboardState.service';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    MatCardModule, 
    MatIcon, 
    MatButtonModule, 
    MatDividerModule, 
    MatListModule,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  dashboardService = inject(DashboardStateService);
  user = this.dashboardService.user$;
  accounts = this.dashboardService.accounts$;
  cards = this.dashboardService.cards$;

  ngOnInit() {
    this.dashboardService.initDashboard();
  }
}
