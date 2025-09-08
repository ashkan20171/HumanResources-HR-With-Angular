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
  leaveForm: any;

  constructor(private fb: FormBuilder) {
    this.leaveForm = this.fb.group({
      date: ['', Validators.required],
      fromHour: ['', Validators.required],
      toHour: ['', Validators.required],
      totalHour: ['', Validators.required],
      leaveType: ['', Validators.required],
      description: ['']
    });
    this.registerForm.get('fromHour')?.valueChanges.subscribe(() => this.calculateTotalHour());
    this.registerForm.get('toHour')?.valueChanges.subscribe(() => this.calculateTotalHour());
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
   calculateTotalHour(): void {
    const from = this.registerForm.get('fromHour')?.value;
    const to = this.registerForm.get('toHour')?.value;
    if (from && to) {
      const [fh, fm] = from.split(':').map(Number);
      const [th, tm] = to.split(':').map(Number);
      const totalMin = (th * 60 + tm) - (fh * 60 + fm);
      const hours = Math.floor(totalMin / 60);
      const minutes = totalMin % 60;
      this.leaveForm.get('totalHour')?.setValue(`${this.pad(hours)}:${this.pad(minutes)}`);
    }
  }
pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  convertToJalali(date: any): string {
    if (!date) return '';
    return moment(date).format('jYYYY/jMM/jDD');
  }

  submitForm(): void {
      if (!this.registerForm.valid) return;
  
      const formValue = this.registerForm.value;
      const jalaliDate = formValue.date;
  
      const record = {
        id: this.editingId ?? (this.dataSource.length > 0 ? Math.max(...this.dataSource.map(r => r.id)) + 1 : 1),
        date: jalaliDate,
        fromHour: formValue.fromHour,
        toHour: formValue.toHour,
        totalHour: formValue.totalHour,
        project: formValue.project,
        activity: formValue.activity,
        description: formValue.description,
        remote: formValue.remote
      };
  
      if (this.editingId) {
        this.dataSource = this.dataSource.map(r => r.id === this.editingId ? record : r);
      } else {
        this.dataSource = [...this.dataSource, record];
      }
  
      this.registerForm.reset();
      this.editingId = null;
    }
  
    editRow(row: any): void {
      const clonedRow = { ...row, date: moment(row.date, 'jYYYY/jMM/jDD').toDate() };
      this.registerForm.patchValue(clonedRow);
      this.editingId = row.id;
    }
  
    deleteRow(row: any): void {
      this.dataSource = this.dataSource.filter(r => r.id !== row.id);
    }

  downloadExcel(): void {
      if (!this.selectedMonth) {
        alert('لطفاً یک ماه را انتخاب کنید.');
        return;
      }
  
      const filteredData = this.dataSource.filter(row => {
        const date = moment(row.date, 'jYYYY/jMM/jDD');
        const monthName = this.months[date.jMonth()];
        return monthName === this.selectedMonth;
      });
  
      if (filteredData.length === 0) {
        alert(`هیچ داده‌ای برای ماه ${this.selectedMonth} یافت نشد.`);
        return;
      }
  
      const worksheet = XLSX.utils.json_to_sheet(filteredData.map(row => ({
        'ردیف': row.id,
        'شماره مرخصی': row.leaveId,
        'تاریخ': row.date,
        'از ساعت': row.fromHour,
        'تا ساعت': row.toHour,
        'جمع ساعت': row.totalHour,
        'نوع مرخصی': row.leaveType,
        'وضعیت': row.leavestatus,
        'توضیحات': row.description,
        
      })));

      const workbook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
          const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
          FileSaver.saveAs(blob, `گزارش-ماه-${this.selectedMonth}.xlsx`);
        }
      }
