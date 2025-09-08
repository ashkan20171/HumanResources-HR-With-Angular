import { Component } from '@angular/core';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';




@Component({
  selector: 'app-bills',
  imports: [CommonModule,MatSelectModule,MatInputModule,MatOptionModule,MatInputModule,MatIconModule,MatCardModule,MatToolbarModule,MatFormFieldModule,MatSelectModule,MatCheckboxModule,MatTableModule,MatNativeDateModule,MatInputModule,MatDatepickerModule],

  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css'
})
export class BillsComponent {
bills:any [] = [];
months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
   
displayedColumns: string[] = ['operation', 'month', 'year', 'receiptNumber', 'index'];
  dataSource = [    
   {index: '1', receiptNumber: '12', year: '1404', month: '1', operation: ''},
   {index: '2', receiptNumber: '22', year: '1404', month: '2', operation: ''},
   {index: '3', receiptNumber: '32', year: '1404', month: '3', operation: ''},
   {index: '4', receiptNumber: '42', year: '1404', month: '4', operation: ''},
   {index: '5', receiptNumber: '52', year: '1404', month: '5', operation: ''},
   {index: '6', receiptNumber: '62', year: '1404', month: '6', operation: ''},
   {index: '7', receiptNumber: '72', year: '1404', month: '7', operation: ''},
   {index: '8', receiptNumber: '82', year: '1404', month: '8', operation: ''},
   {index: '9', receiptNumber: '92', year: '1404', month: '9', operation: ''},
   {index: '10', receiptNumber: '102', year: '1404', month: '10', operation: ''},
   {index: '11', receiptNumber: '112', year: '1404', month: '11', operation: ''},
   {index: '12', receiptNumber: '122', year: '1404', month: '12', operation: ''},
  ];
selectedOption: any;

options= [
   { value: 'option1', viewValue: '1404فرودین' },
   { value: 'option2', viewValue: '1404اردیبهشت' },
   { value: 'option3', viewValue: '1404خرداد' }, 
   { value: 'option4', viewValue: '1404تیر' },
   { value: 'option5', viewValue: '1404مداد' },
   { value: 'option6', viewValue: '1404شهریور' },
   { value: 'option7', viewValue: '1404مهر' },
   { value: 'option8', viewValue: '1404ابان' },
   { value: 'option9', viewValue: '1404آذر' },                                                                                                  
   { value: 'option10', viewValue: '1404دی' },
   { value: 'option11', viewValue: '1404بهمن' },
   { value: 'option12', viewValue: '1404اسفند' },
];
  downloadbills(elements: any) {
    console.log('دانلود فیش حقوقی', Element);
  }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               