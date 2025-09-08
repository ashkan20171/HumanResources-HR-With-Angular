import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import moment from 'moment-jalaali';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username = 'اشکان';
  totalDays = 18;
  requiredHours = 160;
  approvedLeaves = 12;
  performanceScore = 87;
  happinessLevel = 74;
  totalWorkedHours = 122;
  note = '';

  productivityPercent = 0;
  avgDailyHours = 0;
  daysLeftInMonth = 0;
  recommendation = '';
  dynamicQuote = '';

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    const savedNote = this.storageService.get('user-note');
    if (savedNote) {
      this.note = savedNote;
    }

    this.calculateStats();
    this.generateRecommendation();
    this.calculateDaysLeft();
    this.generateDynamicQuote();
  }

  calculateStats(): void {
    this.productivityPercent = Math.min(
      Math.round((this.totalWorkedHours / this.requiredHours) * 100),
      100
    );
    this.avgDailyHours = Math.round((this.totalWorkedHours / this.totalDays) * 100) / 100;
  }

  calculateDaysLeft(): void {
    const today = moment();
    const endOfMonth = moment().endOf('jMonth');
    this.daysLeftInMonth = endOfMonth.diff(today, 'days');
  }

  generateRecommendation(): void {
    if (this.productivityPercent >= 90) {
      this.recommendation = '🌟 عالیه! ادامه بده، در مسیر موفقیت هستی.';
    } else if (this.productivityPercent >= 70) {
      this.recommendation = '💪 عملکردت خوبه، اما جا برای بهتر شدن هست.';
    } else if (this.productivityPercent >= 50) {
      this.recommendation = '🔄 لازمه زمان‌بندی بهتری داشته باشی.';
    } else {
      this.recommendation = '⚠️ حتماً با مدیر مستقیمت درباره‌ی برنامه‌ریزی صحبت کن.';
    }
  }

  generateDynamicQuote(): void {
    if (this.happinessLevel >= 80) {
      this.dynamicQuote = '🌈 روحیه‌ات فوق‌العاده‌س! همیشه بدرخش!';
    } else if (this.happinessLevel >= 50) {
      this.dynamicQuote = '🌤️ کمی استراحت کن، ولی با قدرت ادامه بده.';
    } else {
      this.dynamicQuote = '⛅ شاید نیاز داری با یه دوست صحبت کنی یا از مرخصی استفاده کنی.';
    }
  }

  saveNote(): void {
    this.storageService.set('user-note', this.note);
  }
}