import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

type Req = { id:number; user:string; type:'leave'|'mission'; date:string; days?:number; city?:string; status:'pending'|'approved'|'rejected' };

@Component({
  selector: 'app-approvals',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './approvals.component.html',
  styleUrl: './approvals.component.css',
})
export class ApprovalsComponent {
  items: Req[] = [
    { id:1, user:'علی رضایی', type:'leave', date:'1404/06/20', days:2, status:'pending' },
    { id:2, user:'سارا کاوه', type:'mission', date:'1404/06/22', city:'اصفهان', status:'pending' },
  ];
  approve(i: Req){ i.status = 'approved'; }
  reject(i: Req){ i.status = 'rejected'; }
}