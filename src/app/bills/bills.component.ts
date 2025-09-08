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
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  // فلگ برای پیش‌نمایش داخل صفحه
  showInlinePreview = false;

  displayedColumns: string[] = ['operation','month','year','receiptNumber','index'];

  // ماه‌ها برای نمایش
  monthTitles: Record<number, string> = {
    1:'فروردین',2:'اردیبهشت',3:'خرداد',4:'تیر',5:'مرداد',6:'شهریور',
    7:'مهر',8:'آبان',9:'آذر',10:'دی',11:'بهمن',12:'اسفند'
  };

  // داده نمونه (بعداً از API پر کن)
  rows: Bill[] = [
    {index:'1',  receiptNumber:'12',  year:'1404', month:'1'},
    {index:'2',  receiptNumber:'22',  year:'1404', month:'2'},
    {index:'3',  receiptNumber:'32',  year:'1404', month:'3'},
    {index:'4',  receiptNumber:'42',  year:'1404', month:'4'},
    {index:'5',  receiptNumber:'52',  year:'1404', month:'5'},
    {index:'6',  receiptNumber:'62',  year:'1404', month:'6'},
    {index:'7',  receiptNumber:'72',  year:'1404', month:'7'},
    {index:'8',  receiptNumber:'82',  year:'1404', month:'8'},
    {index:'9',  receiptNumber:'92',  year:'1404', month:'9'},
    {index:'10', receiptNumber:'102', year:'1404', month:'10'},
    {index:'11', receiptNumber:'112', year:'1404', month:'11'},
    {index:'12', receiptNumber:'122', year:'1404', month:'12'},
  ];

  // به‌جای Signals فقط یک رشته ساده
  selectedKey = '1404-01';

  // گزینه‌های انتخاب ماه
  options: { value: string; viewValue: string }[] = [];

  ngOnInit(): void {
    this.options = this.rows.map(r => ({
      value: `${r.year}-${r.month}`,
      viewValue: `${r.year} ${this.monthTitles[+r.month]}`
    }));
  }

  onSelectChange(val: string) {
    this.selectedKey = val;
  }

  get selectedBill(): Bill | null {
    const [y, m] = this.selectedKey.split('-');
    return this.rows.find(r => r.year === y && r.month === m) ?? null;
  }

  // فعلاً ساده؛ وقتی صفحه پایدار شد PDF واقعی را وصل می‌کنیم
  preview() {
    const b = this.selectedBill; if (!b) return;
    window.open('', '_blank')?.document.write(`<pre>${JSON.stringify(b, null, 2)}</pre>`);
  }
  print()  { window.print(); }
  downloadPdf() { alert('دانلود PDF را بعد از پایدار شدن صفحه فعال می‌کنیم.'); }
}
