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

moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: false });

@Component({
  selector: 'app-register-hourse',
  standalone: true,
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
  templateUrl: './register-hourse.component.html',
  styleUrls: ['./register-hourse.component.css'],
  providers: [
    { provide: DateAdapter, useClass: JalaliDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: JALALI_DATE_FORMATS }
  ]
})
export class RegisterHourseComponent implements OnInit {
  registerForm!: FormGroup;
  dataSource: any[] = [];
  editingId: number | null = null;
  displayedColumns: string[] = ['id', 'date', 'fromHour', 'toHour', 'totalHour', 'project', 'activity', 'description', 'remote', 'actions'];
  selectedMonth: string = '';
  months: string[] = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];

   project = [
    { value: 'project1', viewValue: 'کارهای مهندسی داخلی' },
    { value: 'project2', viewValue: 'بازاریابی' },
    { value: 'project3', viewValue: 'ناهار' },
    { value: 'project4', viewValue: 'S.' },
    { value: 'project5', viewValue: 'AJ' },
    { value: 'project6', viewValue: 'AR' },
    { value: 'project7', viewValue: 'A.' },
    { value: 'project8', viewValue: 'AP' },
    { value: 'project9', viewValue: 'A5' },
    { value: 'project10', viewValue: 'نما' },
    { value: 'project11', viewValue: 'A4' },
    { value: 'project12', viewValue: 'A1' },
    { value: 'project13', viewValue: 'SD' },
    { value: 'project14', viewValue: 'A2' },
    { value: 'project15', viewValue: 'G2' },
    { value: 'project16', viewValue: 'A1-2' },
    { value: 'project17', viewValue: 'G30' },
    { value: 'project18', viewValue: 'PT4' },
    { value: 'project19', viewValue: 'دک سفارشی' },
    { value: 'project20', viewValue: 'دک صنایع' },
    { value: 'project21', viewValue: 'PT2' },
    { value: 'project22', viewValue: 'FM' },
    { value: 'project23', viewValue: 'ربات خانگی' },
    { value: 'project24', viewValue: 'نگهداری محیط زیست' },
    { value: 'project25', viewValue: 'تالاب' },
    { value: 'project26', viewValue: 'ارتقای محیط زیست' },
    { value: 'project27', viewValue: 'سامانه ماهشهر' },
    { value: 'project28', viewValue: 'نگهداری فاوا' },
    { value: 'project29', viewValue: 'ارتقا فاوا' },
    { value: 'project30', viewValue: 'شهرداری کرج' },
    { value: 'project31', viewValue: 'شهرداری اصفهان' },
    { value: 'project32', viewValue: 'وصول مطالبات بانک توسعه تعاون' },
    { value: 'project33', viewValue: 'ذوب آهن پاسارگاد-دفتر تهران' },
    { value: 'project34', viewValue: 'ذوب آهن پاسارگاد-دفتر کارخانه' }
  ];

  activity = [
    { value: 'activity1', viewValue: 'تحقیق و یادگیری' },
    { value: 'activity2', viewValue: 'طراحی و توسعه' },
    { value: 'activity3', viewValue: 'ساخت مستقیم' },
    { value: 'activity4', viewValue: 'تست و آنالیز' },
    { value: 'activity5', viewValue: 'اداری و مالی' },
    { value: 'activity6', viewValue: 'طراحی برد(pcb شماتیک و )' },
    { value: 'activity7', viewValue: 'توسعه کد میکرو' },
    { value: 'activity8', viewValue: 'ui  توسعه کد' },
    { value: 'activity9', viewValue: 'مونتاژ و رفع عیب' },
    { value: 'activity10', viewValue: 'آموزش و پاسخگویی' },
    { value: 'activity11', viewValue: 'مستند سازی' },
    { value: 'activity12', viewValue: 'شرکت در جلسه' },
    { value: 'activity13', viewValue: 'پشتیبانی' },
    { value: 'activity14', viewValue: 'توسعه الگوریتم' },
    { value: 'activity15', viewValue: 'تحلیل داده تست' },
    { value: 'activity16', viewValue: 'DT8' },
    { value: 'activity17', viewValue: 'DMS-1' },
    { value: 'activity18', viewValue: 'DR5' },
    { value: 'activity19', viewValue: 'میز موقعیت یابی تصویری' },
    { value: 'activity20', viewValue: 'IT' },
    { value: 'activity21', viewValue: 'اجرایی' },
    { value: 'activity22', viewValue: 'HR' },
    { value: 'activity23', viewValue: 'مالی' },
    { value: 'activity24', viewValue: 'اداری' },
    { value: 'activity25', viewValue: 'تامین تجهیزات' },
    { value: 'activity26', viewValue: 'برنامه ریزی و کنترل پروژه' },
    { value: 'activity27', viewValue: 'ناهار' },
    { value: 'activity28', viewValue: 'DSS' },
    { value: 'activity29', viewValue: 'ارتباط با دانشگاه' },
    { value: 'activity30', viewValue: 'شرکت در جلسات فنی' },
    { value: 'activity31', viewValue: 'DMS-2' },
    { value: 'activity32', viewValue: 'تبدیل LAN به 8 سریال' },
    { value: 'activity33', viewValue: 'نوشتن پروپوزال' },
    { value: 'activity34', viewValue: 'پرزنت شرکت در جلسات' },
    { value: 'activity35', viewValue: 'ارائه خدمات به کارفرما بالقوه' },
    { value: 'activity36', viewValue: 'انبارداری' },
    { value: 'activity37', viewValue: 'سایت های شرکت' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      id: [''],
      date: ['', Validators.required],
      fromHour: ['', Validators.required],
      toHour: ['', Validators.required],
      totalHour: [''],
      project: ['', Validators.required],
      activity: ['', Validators.required],
      description: [''],
      remote: [false]
    });

    this.registerForm.get('fromHour')?.valueChanges.subscribe(() => this.calculateTotalHour());
    this.registerForm.get('toHour')?.valueChanges.subscribe(() => this.calculateTotalHour());
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
      this.registerForm.get('totalHour')?.setValue(`${this.pad(hours)}:${this.pad(minutes)}`);
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

  getTotalHours(): string {
    const total = this.dataSource.reduce((acc, curr) => acc + this.parseTime(curr.totalHour), 0);
    return total.toFixed(2) + ' ساعت';
  }

  parseTime(time: string): number {
    if (!time) return 0;
    const [h, m] = time.split(':').map(Number);
    return h + m / 60;
  }

  getPendingLeaves(): string {
    return '0 ساعت';
  }

  getRequiredHours(): string {
    return '160 ساعت';
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
      'تاریخ': row.date,
      'از ساعت': row.fromHour,
      'تا ساعت': row.toHour,
      'جمع ساعت': row.totalHour,
      'پروژه': row.project,
      'فعالیت': row.activity,
      'توضیحات': row.description,
      'دورکاری': row.remote ? 'بله' : 'خیر'
    })));

    const workbook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, `گزارش-ماه-${this.selectedMonth}.xlsx`);
  }
}
