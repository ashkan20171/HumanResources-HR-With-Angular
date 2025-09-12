
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatCardModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    RecaptchaModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  errorMsg = '';

  siteKey: string = '6Lcqm5MrAAAAAM_MH12BxYp9wsGap5UcCFSb7sjP'; // ← Site Key واقعی‌ت را قرار بده
  captchaToken: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    const u = localStorage.getItem('user');
    if (u) {
      const savedRole = localStorage.getItem('role') || 'user';
      if (savedRole === 'user') this.router.navigate(['/register-hourse']);
      else this.router.navigate(['/dashboard']);
    }
  }

  onCaptchaResolved(token: string | null) {
    this.captchaToken = token;
  }

  private resolveRoleByUsername(username: string): string {
    const u = username.toLowerCase();
    if (u === 'admin') return 'manager';
    if (u === 'hruser') return 'hr';
    if (u === 'acc' || u === 'accounting') return 'accounting';
    return 'user';
  }

  onSubmit(): void {
    this.errorMsg = '';
    this.loading = true;

    setTimeout(() => {
      this.loading = false;

      if (this.loginForm.invalid) {
        this.errorMsg = 'نام کاربری و رمز عبور را وارد کنید';
        return;
      }

      if (!this.captchaToken) {
        this.errorMsg = 'لطفاً کپچا را تکمیل کنید.';
        return;
      }

      const { username, password } = this.loginForm.value;
      if (!username || !password) {
        this.errorMsg = 'نام کاربری و رمز عبور الزامی است';
        return;
      }

      const role = this.resolveRoleByUsername(String(username));

      localStorage.setItem('user', String(username));
      localStorage.setItem('role', role);

      if (role === 'user') {
        this.router.navigate(['/register-hourse']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    }, 250);
  }
}
