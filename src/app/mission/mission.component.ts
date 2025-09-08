import { Component } from '@angular/core';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerControl, MatDatepickerModule, MatDatepickerPanel } from '@angular/material/datepicker';
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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { identity } from 'rxjs/internal/util/identity';

@Component({
  selector: 'app-mission',
   imports: [CommonModule,MatSelectModule,MatInputModule,MatOptionModule,MatTimepickerModule,MatInputModule,MatIconModule,MatCardModule,MatToolbarModule,MatFormFieldModule,MatSelectModule,MatCheckboxModule,MatTableModule,MatNativeDateModule,MatInputModule,MatDatepickerModule],
  templateUrl: './mission.component.html',
  styleUrl: './mission.component.css'
})
export class MissionComponent{
  months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
  [x: string]: any;
    picker!: MatDatepickerPanel<MatDatepickerControl<any>, any, any>;
    picker1!: MatDatepickerPanel<MatDatepickerControl<any>, any, any>;
    picker2!: MatDatepickerPanel<MatDatepickerControl<any>, any, any>;
    picker3!: MatDatepickerPanel<MatDatepickerControl<any>, any, any>;
    picker4!: MatDatepickerPanel<MatDatepickerControl<any>, any, any>;
    picker5!: MatDatepickerPanel<MatDatepickerControl<any>, any, any>;
    picker6!: MatDatepickerPanel<MatDatepickerControl<any>, any, any>;
  startDate: any;
  
  RegisterForm:FormGroup | undefined;
  RegisterRequests=[]
  
  
  displayedColumns: string[] = ['id',  'date', 'fromhourse', 'tohourse', 'totalhourse', 'project', 'Description', 'operation'];
  dataSource = [
    {id: '1', date: '1403.12.04', fromhourse: '09:00', tohourse: '17:45', totalhourse: '8:45', project: 'کار روی سامانه  hr ', Description: 'کار', operation: ''},
    {id: '2', date: '1403.12.05', fromhourse: '09:00', tohourse: '17:45', totalhourse: '8:45', project: 'کار روی سامانه  hr ', Description: 'کار', operation: ''},
  ];
  constructor(private Fb:FormBuilder){
    this['Registerform']=this.Fb.group({
      id:['', Validators.required],
      Date:[null, Validators.required],
      fromhourse:['', Validators.required],
    tohourse:['', Validators.required],
    totalhourse:['', Validators.required],
      project:['', Validators.required],
      Description:['', Validators.required],
      operation:['', Validators.required],
      
    })
  }
  selectedOption: any;
  options= [
    { value: 'option1', viewValue: '1403فرودین' },
    { value: 'option2', viewValue: '1403اردیبهشت' },
    { value: 'option3', viewValue: '1403خرداد' }, 
    { value: 'option4', viewValue: '1403تیر' },
    { value: 'option5', viewValue: '1403مرداد' },
    { value: 'option6', viewValue: '1403شهریور' },
    { value: 'option7', viewValue: '1403مهر' },
    { value: 'option8', viewValue: '1403ابان' },
    { value: 'option9', viewValue: '1403آذر' },
    { value: 'option10', viewValue: '1403دی' },
    { value: 'option11', viewValue: '1403بهمن' },
    { value: 'option12', viewValue: '1403اسفند' },
  ];
  project= [
    { value: 'project1', viewValue: 'کارهای مهندسی داخلی'},
    { value: 'project2', viewValue: 'بازاریابی'},
    { value: 'project3', viewValue: 'ناهار'},
    { value: 'project4', viewValue: 'S.'},
    { value: 'project5', viewValue: 'AJ'},
    { value: 'project6', viewValue: 'AR'},
    { value: 'project7', viewValue: 'A.'},
    { value: 'project8', viewValue: 'AP'},
    { value: 'project9', viewValue: 'A5'},
    { value: 'project10', viewValue: 'نما'},
    { value: 'project11', viewValue: 'A4'},
    { value: 'project12', viewValue: 'A1'},
    { value: 'project13', viewValue: 'SD'},
    { value: 'project14', viewValue: 'A2'},
    { value: 'project15', viewValue: 'G2'},
    { value: 'project16', viewValue: 'A1-2'},
    { value: 'project17', viewValue: 'G30'},
    { value: 'project18', viewValue: 'PT4'},
    { value: 'project19', viewValue: 'دک سفارشی'},
    { value: 'project20', viewValue: 'دک صنایع'},
    { value: 'project21', viewValue: 'PT2'},
    { value: 'project22', viewValue: 'FM'},
    { value: 'project23', viewValue: 'ربات خانگی'},
    { value: 'project24', viewValue: 'نگهداری محیط زیست'},
    { value: 'project25', viewValue: 'تالاب'},
    { value: 'project26', viewValue: 'ارتقای محیط زیست'},
    { value: 'project27', viewValue: 'سامانه ماهشهر'},
    { value: 'project28', viewValue: 'نگهداری فاوا'},
    { value: 'project29', viewValue: 'ارتقا فاوا'},
    { value: 'project30', viewValue: 'شهرداری کرج'},
    { value: 'project31', viewValue: 'شهرداری اصفهان'},
    { value: 'project32', viewValue: 'وصول مطالبات بانک توسعه تعاون'},
    { value: 'project33', viewValue: 'ذوب آهن پاسارگاد-دفتر تهران'},
    { value: 'project34', viewValue: 'ذوب آهن پاسارگاد-دفتر کارخانه'},

  ];
   SubmitRegister(){
    console.log(this['Registerform'].value);
   }
   deleteRegister(){
    this['RegisterRequests']=this['RegisterRequests'].filter((item: { id: any; })=>item.id! == identity);
   }
  }