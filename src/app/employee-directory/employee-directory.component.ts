import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

type Emp = { id:number; name:string; role:string; dept:string; avatar?:string };

@Component({
  selector: 'app-employee-directory',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './employee-directory.component.html',
  styleUrl: './employee-directory.component.css',
})
export class EmployeeDirectoryComponent {
  items: Emp[] = [
    { id:1, name:'علی رضایی', role:'توسعه‌دهنده فرانت‌اند', dept:'فناوری' },
    { id:2, name:'نسترن احمدی', role:'کارشناس HR', dept:'منابع انسانی' },
    { id:3, name:'حسین موسوی', role:'حسابدار', dept:'مالی' },
    { id:4, name:'سارا کاوه', role:'طراح UI/UX', dept:'طراحی' },
  ];
}