import { Component } from '@angular/core';
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
import { MatNativeDateModule } from '@angular/material/core';

export interface Leave {
  id: number;
  date: string;
  fromHour: string;
  toHour: string;
  totalHour: string;
  leaveType: string;
  status: string;
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
  ]
})
export class LeaveComponent {
  leaveForm!: FormGroup;
  selectedRow: Leave | null = null;
  dataSource: Leave[] = [];
  displayedColumns = ['id', 'date', 'fromHour', 'toHour', 'totalHour', 'leaveType', 'status', 'description', 'actions'];
  months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'];
  selectedMonth = '';

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
