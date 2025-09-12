import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

type Noti = { id:number; title:string; body:string; type:'info'|'success'|'warning'; time:string; unread:boolean };

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  items: Noti[] = [
    { id:1, title:'تأیید مرخصی', body:'مرخصی ۳ شهریور تأیید شد.', type:'success', time:'۲ دقیقه پیش', unread:true },
    { id:2, title:'یادآوری ثبت ساعت', body:'ساعت امروز را کامل ثبت نکردی.', type:'warning', time:'امروز 10:00', unread:true },
    { id:3, title:'پرداخت حقوق', body:'فیش مرداد 1404 آماده مشاهده است.', type:'info', time:'دیروز', unread:false },
  ];

  markAllRead() { this.items = this.items.map(i => ({...i, unread:false})); }
  clearAll() { this.items = []; }
}