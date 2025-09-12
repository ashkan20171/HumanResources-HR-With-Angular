import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

// Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,           // ← حتماً این را داشته باش
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatSidenavModule, MatListModule, MatExpansionModule, MatIconModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  username: string | null = '';
  avatar: string | null = null;
  currentRole: string = localStorage.getItem('role') || 'user';

  ngOnInit(): void {
    this.username = localStorage.getItem('user');
    this.avatar = localStorage.getItem('avatar');
    this.currentRole = localStorage.getItem('role') || 'user';
  }

  hasRole(roles: string[]): boolean {
    const r = (this.currentRole || 'user').toLowerCase();
    return roles.map(x => x.toLowerCase()).includes(r);
  }
}
