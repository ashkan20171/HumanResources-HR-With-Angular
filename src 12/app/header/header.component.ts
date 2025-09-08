import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})
export class HeaderComponent implements OnInit {
   
username: string | null = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('user');
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}