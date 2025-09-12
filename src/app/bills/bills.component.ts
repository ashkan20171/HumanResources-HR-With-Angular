import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

type Bill = { index: string; receiptNumber: string; year: string; month: string; };

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatCardModule, MatFormFieldModule, MatSelectModule,
    MatTableModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css'
})
export class BillsComponent implements OnInit {
  // Table data expected by the original template
  rows: Bill[] = [
    { index: '1', receiptNumber: 'HR-1404-06-001', year: '1404', month: '6' },
    { index: '2', receiptNumber: 'HR-1404-05-001', year: '1404', month: '5' },
  ];
  displayedColumns: string[] = ['index', 'receiptNumber', 'year', 'month'];

  // Month titles accessed via monthTitles[+e.month]
  monthTitles = ['', 'فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];

  // Selector options: value "YYYY-M"
  options = [
    { value: '1404-6', viewValue: '1404 / شهریور' },
    { value: '1404-5', viewValue: '1404 / مرداد' },
  ];
  selectedKey = '1404-6';

  // For payslip header
  selectedYear = '1404';
  selectedMonth = 'شهریور';
  username: string | null = '';

  // UI flags
  showInlinePreview = true;

  // The currently selected bill entry
  selectedBill: Bill | null = this.rows[0];

  ngOnInit(): void {
    this.username = localStorage.getItem('user');
    // ensure selectedBill according to selectedKey
    this.syncSelectedByKey();
  }

  private syncSelectedByKey(): void {
    const [y, mStr] = this.selectedKey.split('-');
    const m = parseInt(mStr, 10);
    this.selectedYear = y;
    this.selectedMonth = this.monthTitles[m] || String(m);
    const found = this.rows.find(r => r.year === y && +r.month === m);
    this.selectedBill = found || null;
  }

  onSelectChange(value: string): void {
    this.selectedKey = value;
    this.syncSelectedByKey();
  }

  // Preview/Print/PDF actions used in the original HTML
  preview(): void {
    this.showInlinePreview = true;
  }

  print(): void {
    window.print();
  }

  downloadPdf(): void {
    // در وب معمولاً برای دریافت PDF از Print-to-PDF استفاده می‌شود
    window.print();
  }

  // Payslip print added in later enhancement
  printPayslip(): void {
    window.print();
  }
}