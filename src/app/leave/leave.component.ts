import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import moment from 'moment-jalaali';
import { JalaliDateAdapter } from '../shared/jalali-date.adapter';
import { JALALI_DATE_FORMATS } from '../shared/jalali-date.format';

moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: false });

export interface Leave {
  id: number;
  date: any;           // Date (گرگوری) ذخیره می‌کنیم؛ در جدول جلالی نمایش می‌دهیم
  fromHour: string;
  toHour: string;
  totalHour: string;   // hh:mm
  leaveType: string;   // استحقاقی/...
  status: string;      // در دست بررسی/تایید شده/رد شده
  description: string;
}

@Component({
  selector: 'app-leave',
  standalone: true,
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: DateAdapter, useClass: JalaliDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: JALALI_DATE_FORMATS }
  ]
})
export class LeaveComponent implements OnInit {
  leaveForm!: FormGroup;
  selectedRow: Leave | null = null;
  dataSource: Leave[] = [];

  displayedColumns = [
    'id', 'date', 'fromHour', 'toHour', 'totalHour', 'leaveType', 'status', 'description', 'actions'
  ];

  months = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
  selectedMonth = '';

  // خلاصه‌ها
  sumApproved = '00:00';
  sumApprovedEstehghaghi = '00:00';
  sumRejected = '00:00';
  sumPending = '00:00';
  carryOverFromPrevMonth = '00:00'; // در صورت نیاز از API/لوکال‌استوریج بگیر

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.leaveForm = this.fb.group({
      date: ['', Validators.required],
      fromHour: ['', Validators.required],
      toHour: ['', Validators.required],
      totalHour: [''],
      leaveType: ['', Validators.required],
      status: ['در دست بررسی', Validators.required],
      description: ['']
    });

    // محاسبه خودکار جمع ساعت
    this.leaveForm.get('fromHour')?.valueChanges.subscribe(() => this.calculateTotalHour());
    this.leaveForm.get('toHour')?.valueChanges.subscribe(() => this.calculateTotalHour());
  }

  // ===== Helpers =====
  calculateTotalHour(): void {
    const from = this.leaveForm.get('fromHour')?.value;
    const to = this.leaveForm.get('toHour')?.value;
    if (!from || !to) return;

    const [fh, fm] = from.split(':').map(Number);
    const [th, tm] = to.split(':').map(Number);
    const totalMin = (th * 60 + tm) - (fh * 60 + fm);
    if (totalMin < 0) return;

    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    this.leaveForm.get('totalHour')?.setValue(`${this.pad(h)}:${this.pad(m)}`);
  }

  pad(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
  }

  convertToJalali(date: any): string {
    if (!date) return '';
    return moment(date).format('jYYYY/jMM/jDD');
  }

  timeToMinutes(t: string): number {
    if (!t) return 0;
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  }

  minutesToHHMM(mins: number): string {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${this.pad(h)}:${this.pad(m)}`;
  }

  // ===== CRUD =====
  submitForm(): void {
    if (this.leaveForm.invalid) return;
    const v = this.leaveForm.value;

    if (this.selectedRow) {
      // ویرایش
      const idx = this.dataSource.findIndex(x => x.id === this.selectedRow!.id);
      this.dataSource[idx] = {
        ...this.selectedRow!,
        date: v.date,
        fromHour: v.fromHour,
        toHour: v.toHour,
        totalHour: v.totalHour,
        leaveType: v.leaveType,
        status: v.status,
        description: v.description
      };
      this.selectedRow = null;
    } else {
      // افزودن
      const newId = this.dataSource.length ? Math.max(...this.dataSource.map(r => r.id)) + 1 : 1;
      this.dataSource = [
        ...this.dataSource,
        {
          id: newId,
          date: v.date,
          fromHour: v.fromHour,
          toHour: v.toHour,
          totalHour: v.totalHour,
          leaveType: v.leaveType,
          status: v.status,
          description: v.description
        }
      ];
    }

    this.leaveForm.reset({ status: 'در دست بررسی' });
    this.recalcSummary();
  }

  editRow(row: Leave): void {
    this.selectedRow = { ...row };
    // تبدیل تاریخ جلالی ذخیره‌شده به Date برای کنترل Datepicker (اگر لازم باشد)
    const patch = { ...row, date: moment(row.date).toDate() };
    this.leaveForm.patchValue(patch);
  }

  deleteRow(row: Leave): void {
    this.dataSource = this.dataSource.filter(r => r.id !== row.id);
    if (this.selectedRow?.id === row.id) {
      this.selectedRow = null;
      this.leaveForm.reset({ status: 'در دست بررسی' });
    }
    this.recalcSummary();
  }

  // ===== Summary (۵ آیتم) =====
  recalcSummary(): void {
    // فقط رکوردهای ماه انتخاب‌شده را در خلاصه لحاظ کن؛ اگر ماهی انتخاب نشده، همه
    const rows = this.selectedMonth
      ? this.dataSource.filter(r => this.months[moment(r.date).jMonth()] === this.selectedMonth)
      : this.dataSource;

    const totalApproved = rows
      .filter(r => r.status === 'تایید شده')
      .reduce((s, r) => s + this.timeToMinutes(r.totalHour), 0);

    const totalApprovedEsteh = rows
      .filter(r => r.status === 'تایید شده' && r.leaveType === 'استحقاقی')
      .reduce((s, r) => s + this.timeToMinutes(r.totalHour), 0);

    const totalRejected = rows
      .filter(r => r.status === 'رد شده')
      .reduce((s, r) => s + this.timeToMinutes(r.totalHour), 0);

    const totalPending = rows
      .filter(r => r.status === 'در دست بررسی')
      .reduce((s, r) => s + this.timeToMinutes(r.totalHour), 0);

    this.sumApproved = this.minutesToHHMM(totalApproved);
    this.sumApprovedEstehghaghi = this.minutesToHHMM(totalApprovedEsteh);
    this.sumRejected = this.minutesToHHMM(totalRejected);
    this.sumPending = this.minutesToHHMM(totalPending);

    // اگر جایی «بازمانده از ماه قبل» را ذخیره می‌کنی، اینجا بخوان (نمونه):
    // this.carryOverFromPrevMonth = localStorage.getItem('leaveCarryOver') ?? '00:00';
  }

  // ===== Excel =====
  convertToCSV(data: Leave[]): string {
    const rows = data.map(r => ({
      'ردیف': r.id,
      'تاریخ': moment(r.date).format('jYYYY/jMM/jDD'),
      'از ساعت': r.fromHour,
      'تا ساعت': r.toHour,
      'جمع ساعت': r.totalHour,
      'نوع مرخصی': r.leaveType,
      'وضعیت': r.status,
      'توضیحات': r.description
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = { Sheets: { Sheet1: ws }, SheetNames: ['Sheet1'] };
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([buf], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, `گزارش-مرخصی-${this.selectedMonth || 'همه-ماه‌ها'}.xlsx`);
    return '';
  }

  downloadExcel(): void {
    if (this.dataSource.length === 0) {
      alert('اطلاعاتی برای خروجی گرفتن وجود ندارد');
      return;
    }
    const filtered = this.selectedMonth
      ? this.dataSource.filter(r => this.months[moment(r.date).jMonth()] === this.selectedMonth)
      : this.dataSource;

    if (!filtered.length) {
      alert(`هیچ داده‌ای برای ماه ${this.selectedMonth} یافت نشد.`);
      return;
    }
    this.convertToCSV(filtered); // داخل convertToCSV ذخیرهٔ فایل را انجام می‌دهیم
  }
}
