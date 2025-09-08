import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import moment from 'moment-jalaali';
import { JalaliDateAdapter } from '../shared/jalali-date.adapter';
import { JALALI_DATE_FORMATS } from '../shared/jalali-date.format';
import { MatButtonModule } from '@angular/material/button';

moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: false });

@Component({
  selector: 'app-leave',
  standalone: true,
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    { provide: DateAdapter, useClass: JalaliDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: JALALI_DATE_FORMATS }
  ]
})
export class LeaveComponent implements OnInit {
  registerForm!: FormGroup;
  dataSource: any[] = [];
  editingId: number | null = null;
  displayedColumns = ['id', 'date', 'fromHour', 'toHour', 'totalHour', 'leaveType', 'status', 'description', 'actions'];
  selectedMonth: string = '';
  months: string[] = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];

  constructor(private fb: FormBuilder) {
    this.leaveForm = this.fb.group({
      date: ['', Validators.required],
      fromHour: ['', Validators.required],
      toHour: ['', Validators.required],
      totalHour: ['', Validators.required],
      leaveType: ['', Validators.required],
      description: ['']
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  submitForm() {
    if (this.leaveForm.invalid) return;
    const formValue = this.leaveForm.value;

    if (this.selectedRow) {
      const index = this.dataSource.findIndex(item => item.id === this.selectedRow!.id);
      this.dataSource[index] = {
        ...this.selectedRow,
        ...formValue,
        status: this.selectedRow.status
      };
      this.selectedRow = null;
    } else {
      const newId = this.dataSource.length + 1;
      this.dataSource.push({
        id: newId,
        ...formValue,
        status: 'در دست بررسی'
      });
    }
    this.leaveForm.reset();
  }

  editRow(row: Leave) {
    this.selectedRow = { ...row };
    this.leaveForm.patchValue(row);
  }

  deleteRow(row: Leave) {
    this.dataSource = this.dataSource.filter(item => item.id !== row.id);
    if (this.selectedRow?.id === row.id) {
      this.selectedRow = null;
      this.leaveForm.reset();
    }
  }

  convertToCSV(data: Leave[]): string {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    return [headers, ...rows].join('\r\n');
  }

  downloadExcel() {
    if (!this.dataSource.length) {
      alert('اطلاعاتی برای خروجی گرفتن وجود ندارد');
      return;
    }
    const csv = this.convertToCSV(this.dataSource);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leave-report.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}
