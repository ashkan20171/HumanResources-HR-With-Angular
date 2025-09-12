import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

type Doc = { id:number; title:string; type:'policy'|'form'|'guide'; updated:string };

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css',
})
export class DocumentsComponent {
  items: Doc[] = [
    { id:1, title:'آیین‌نامه مرخصی', type:'policy', updated:'1404/04/15' },
    { id:2, title:'فرم درخواست مأموریت', type:'form', updated:'1404/03/20' },
    { id:3, title:'راهنمای ثبت‌ساعت', type:'guide', updated:'1404/02/05' },
  ];
}