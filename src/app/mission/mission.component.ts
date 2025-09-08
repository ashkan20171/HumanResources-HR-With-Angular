import { Component, OnInit } from '@angular/core';
import {  MatOptionModule } from '@angular/material/core';
import { MatDatepickerControl, MatDatepickerPanel } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import moment from 'moment-jalaali';
import { JalaliDateAdapter } from '../shared/jalali-date.adapter';
import { JALALI_DATE_FORMATS } from '../shared/jalali-date.format';

moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: false });

@Component({
  selector: 'app-mission',
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
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css'],
  providers: [
    { provide: DateAdapter, useClass: JalaliDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: JALALI_DATE_FORMATS }
  ]
})
export class MissionComponent implements OnInit{
  missionForm!: FormGroup;
  dataSource: any[] = [];
  editingId: number | null = null;
  displayedColumns: string[] = ['id', 'date', 'fromHour', 'toHour', 'totalHour', 'project', 'description', 'actions'];
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
  
 
constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.missionForm = this.fb.group({
      id: [''],
      date: ['', Validators.required],
      fromHour: ['', Validators.required],
      toHour: ['', Validators.required],
      totalHour: [''],
      project: ['', Validators.required],
      description: [''],
    });
 
     this.missionForm.get('fromHour')?.valueChanges.subscribe(() => this.calculateTotalHour());
    this.missionForm.get('toHour')?.valueChanges.subscribe(() => this.calculateTotalHour());
  }

  calculateTotalHour(): void {
    const from = this.missionForm.get('fromHour')?.value;
    const to = this.missionForm.get('toHour')?.value;
    if (from && to) {
      const [fh, fm] = from.split(':').map(Number);
      const [th, tm] = to.split(':').map(Number);
      const totalMin = (th * 60 + tm) - (fh * 60 + fm);
      const hours = Math.floor(totalMin / 60);
      const minutes = totalMin % 60;
      this.missionForm.get('totalHour')?.setValue(`${this.pad(hours)}:${this.pad(minutes)}`);
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
    if (!this.missionForm.valid) return;

    const formValue = this.missionForm.value;
    const jalaliDate = formValue.date;

    const record = {
      id: this.editingId ?? (this.dataSource.length > 0 ? Math.max(...this.dataSource.map(r => r.id)) + 1 : 1),
      date: jalaliDate,
      fromHour: formValue.fromHour,
      toHour: formValue.toHour,
      totalHour: formValue.totalHour,
      project: formValue.project,
      description: formValue.description
      
    };

     if (this.editingId) {
          this.dataSource = this.dataSource.map(r => r.id === this.editingId ? record : r);
        } else {
          this.dataSource = [...this.dataSource, record];
        }
    
        this.missionForm.reset();
        this.editingId = null;
      }
    
      editRow(row: any): void {
        const clonedRow = { ...row, date: moment(row.date, 'jYYYY/jMM/jDD').toDate() };
        this.missionForm.patchValue(clonedRow);
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
            'تاریخ': row.date,
            'از ساعت': row.fromHour,
            'تا ساعت': row.toHour,
            'جمع ساعت': row.totalHour,
            'پروژه': row.project,
            'توضیحات': row.description,
          })));

          const workbook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
              const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
              const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
              FileSaver.saveAs(blob, `گزارش-ماه-${this.selectedMonth}.xlsx`);
            }
          }