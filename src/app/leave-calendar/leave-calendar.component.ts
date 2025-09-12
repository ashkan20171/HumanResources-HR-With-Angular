import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

type LeaveType = 'paid' | 'unpaid' | 'sick' | 'mission';
interface DayCell { date: Date; inMonth: boolean; type?: LeaveType; note?: string; }

@Component({
  selector: 'app-leave-calendar',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatSelectModule, FormsModule],
  templateUrl: './leave-calendar.component.html',
  styleUrl: './leave-calendar.component.css',
})
export class LeaveCalendarComponent {
  // State
  today = new Date();
  viewYear = this.today.getFullYear();
  viewMonth = this.today.getMonth(); // 0-11
  filter: LeaveType | 'all' = 'all';

  // Sample leave data (replace with API)
  leaves: { date: string; type: LeaveType; note?: string }[] = [
    { date: this.yyyymmdd(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()), type: 'paid', note: 'نیم‌روز' },
    { date: this.yyyymmdd(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()+2), type: 'mission', note: 'ماموریت کرج' },
    { date: this.yyyymmdd(this.today.getFullYear(), this.today.getMonth(), 1), type: 'sick', note: 'مرخصی استعلاجی' },
    { date: this.yyyymmdd(this.today.getFullYear(), this.today.getMonth(), 10), type: 'unpaid', note: 'بدون حقوق' },
  ];

  // Helpers
  yyyymmdd(y:number,m:number,d:number){ const dt = new Date(y, m, d); return dt.toISOString().slice(0,10); }

  get monthName(): string {
    const lang = (localStorage.getItem('lang') || 'fa-IR');
    return new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric' }).format(new Date(this.viewYear, this.viewMonth, 1));
  }

  prevMonth(){ const d = new Date(this.viewYear, this.viewMonth-1, 1); this.viewYear=d.getFullYear(); this.viewMonth=d.getMonth(); }
  nextMonth(){ const d = new Date(this.viewYear, this.viewMonth+1, 1); this.viewYear=d.getFullYear(); this.viewMonth=d.getMonth(); }

  get weeks(): DayCell[][] {
    const first = new Date(this.viewYear, this.viewMonth, 1);
    const start = new Date(first);
    // week starts on Saturday in fa-IR commonly; we'll normalize to Sunday (0) for simplicity
    const weekday = start.getDay(); // 0 Sun - 6 Sat
    start.setDate(start.getDate() - ((weekday + 6) % 7)); // start from Saturday-like grid

    const cells: DayCell[] = [];
    for (let i=0;i<42;i++){
      const d = new Date(start); d.setDate(start.getDate()+i);
      const key = d.toISOString().slice(0,10);
      const found = this.leaves.find(x => x.date === key);
      const inMonth = d.getMonth() === this.viewMonth;
      const cell: DayCell = { date: d, inMonth };
      if (found) { cell.type = found.type; cell.note = found.note; }
      if (this.filter !== 'all' && cell.type && cell.type !== this.filter) {
        // hide by filter: mark as no leave (but still show day)
        cell.type = undefined;
      }
      cells.push(cell);
    }
    // split to weeks
    const weeks: DayCell[][] = [];
    for (let i=0;i<6;i++){ weeks.push(cells.slice(i*7,(i+1)*7)); }
    return weeks;
  }

  typeLabel(t: LeaveType | undefined){
    switch(t){
      case 'paid': return 'استحقاقی';
      case 'unpaid': return 'بدون حقوق';
      case 'sick': return 'استعلاجی';
      case 'mission': return 'ماموریت';
      default: return '';
    }
  }
}