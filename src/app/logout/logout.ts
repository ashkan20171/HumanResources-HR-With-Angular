import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  template: ''
})
export class LogoutComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
