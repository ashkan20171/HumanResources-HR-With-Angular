import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

type Row = { date: string; hours: number; leave?: number; overtime?: number };

@Component({
  selector: 'app-work-report',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './work-report.component.html',
  styleUrl: './work-report.component.css',
})
export class WorkReportComponent {
  rows: Row[] = [
    { date: '1404-06-01', hours: 7.5, leave: 0.5 },
    { date: '1404-06-02', hours: 8 },
    { date: '1404-06-03', hours: 6, leave: 2 },
    { date: '1404-06-04', hours: 9, overtime: 1 },
    { date: '1404-06-05', hours: 8 },
  ];

  displayed = ['date', 'hours', 'leave', 'overtime'];

  get totalHours(): number {
    return this.rows.reduce((s, r) => s + (r.hours || 0), 0);
  }
  get totalLeave(): number {
    return this.rows.reduce((s, r) => s + (r.leave || 0), 0);
  }
  get totalOT(): number {
    return this.rows.reduce((s, r) => s + (r.overtime || 0), 0);
  }
  get avgHours(): number {
    return Math.round((this.totalHours / this.rows.length) * 10) / 10;
  }

  maxHours = 10; // for bar scale

  exportCSV(): void {
    const header = ['date', 'hours', 'leave', 'overtime'];
    const lines = [header.join(',')];
    for (const r of this.rows) {
      lines.push([r.date, r.hours ?? '', r.leave ?? '', r.overtime ?? ''].join(','));
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'work-report.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}