import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
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
  styleUrls: ['./bills.component.css'] // دقت کن: s دارد
})
export class BillsComponent {
  // فلگ برای نمایش پیش‌نمایش داخل صفحه
  showInlinePreview = false;

  readonly monthTitles: Record<number, string> = {
    1:'فروردین',2:'اردیبهشت',3:'خرداد',4:'تیر',5:'مرداد',6:'شهریور',
    7:'مهر',8:'آبان',9:'آذر',10:'دی',11:'بهمن',12:'اسفند'
  };

  private rows: Bill[] = [
    {index:'1', receiptNumber:'12',  year:'1404', month:'1'},
    {index:'2', receiptNumber:'22',  year:'1404', month:'2'},
    {index:'3', receiptNumber:'32',  year:'1404', month:'3'},
    {index:'4', receiptNumber:'42',  year:'1404', month:'4'},
    {index:'5', receiptNumber:'52',  year:'1404', month:'5'},
    {index:'6', receiptNumber:'62',  year:'1404', month:'6'},
    {index:'7', receiptNumber:'72',  year:'1404', month:'7'},
    {index:'8', receiptNumber:'82',  year:'1404', month:'8'},
    {index:'9', receiptNumber:'92',  year:'1404', month:'9'},
    {index:'10', receiptNumber:'102', year:'1404', month:'10'},
    {index:'11', receiptNumber:'112', year:'1404', month:'11'},
    {index:'12', receiptNumber:'122', year:'1404', month:'12'},
  ];

  displayedColumns: string[] = ['operation','month','year','receiptNumber','index'];
  dataSource = new MatTableDataSource<Bill>(this.rows);

  selectedKey = signal<string>('1404-01');
  selectedBill = computed<Bill | null>(() => {
    const key = this.selectedKey();
    if (!key) return null;
    const [y, m] = key.split('-');
    return this.rows.find(r => r.year === y && r.month === m) ?? null;
  });

  get options() {
    return this.rows.map(r => ({
      value: `${r.year}-${r.month}`,
      viewValue: `${r.year} ${this.monthTitles[+r.month]}`
    }));
  }

  onSelectChange(val: string) { this.selectedKey.set(val); }

  // ——— این‌ها فقط با کلیک اجرا می‌شوند؛ هیچ ارجاعی به window در زمان رندر اولیه نداریم
  preview() {
    const bill = this.selectedBill(); if (!bill) return;
    window.open('', '_blank')?.document.write(`<pre>${JSON.stringify(bill,null,2)}</pre>`);
  }
  print()  { window.print(); }
  downloadPdf() { /* بعد از پایدار شدن صفحه برمی‌گردیم و jsPDF/html2canvas را وصل می‌کنیم */ }
}