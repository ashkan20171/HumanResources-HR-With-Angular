import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

type Entry = { user:string; month:number; year:number; gross:number; net:number; tax:number };

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.css',
})
export class PayrollComponent {
  displayed = ['user','month','year','gross','tax','net'];
  rows: Entry[] = [
    { user:'علی رضایی', month:6, year:1404, gross:140000000, tax:12500000, net:127500000 },
    { user:'سارا کاوه', month:6, year:1404, gross:120000000, tax:10500000, net:109500000 },
  ];
}