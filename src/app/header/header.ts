import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {

  username: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        this.username = parsed.username || '';
      } catch {
        this.username = userData;
      }
    }
  }

  logout(): void {
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}

