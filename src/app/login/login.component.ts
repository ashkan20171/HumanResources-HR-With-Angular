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

type Role = 'user' | 'manager' | 'hr' | 'accounting';

const USERS: Record<string, { password: string; role: Role; display?: string }> = {
  'admin':      { password: '1234', role: 'manager',   display: 'مدیر سیستم' },
  'hruser':     { password: '1111', role: 'hr',        display: 'کارشناس منابع انسانی' },
  'acc':        { password: '2222', role: 'accounting',display: 'کارشناس حسابداری' },
  'accounting': { password: '2222', role: 'accounting',display: 'کارشناس حسابداری' },
  'user1':      { password: '0000', role: 'user',      display: 'کاربر عادی' },
};

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
  showPass = false;

  requireCaptcha = true;
  siteKey: string = '6Lcqm5MrAAAAAM_MH12BxYp9wsGap5UcCFSb7sjP';
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
      this.router.navigate([savedRole === 'user' ? '/register-hourse' : '/dashboard']);
    }
  }

  onCaptchaResolved(token: string | null) { this.captchaToken = token; }

  private authenticate(username: string, password: string): { ok: boolean; role?: Role } {
    const u = (username || '').toString().trim().toLowerCase();
    const p = (password || '').toString().trim();
    const rec = USERS[u];
    if (!rec) return { ok: false };
    if (rec.password !== p) return { ok: false };
    return { ok: true, role: rec.role };
  }

  onSubmit(): void {
    this.errorMsg = '';
    if (this.loginForm.invalid) { this.loginForm.markAllAsTouched(); return; }
    if (this.requireCaptcha && !this.captchaToken) { this.errorMsg = 'لطفاً کپچا را تکمیل کنید.'; return; }

    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      const { username, password } = this.loginForm.value;
      const result = this.authenticate(username, password);
      if (!result.ok) { this.errorMsg = 'نام کاربری یا رمز عبور اشتباه است'; return; }

      localStorage.setItem('user', String(username).trim());
      localStorage.setItem('role', result.role!);

      this.router.navigate([result.role === 'user' ? '/register-hourse' : '/dashboard']);
    }, 150);
  }
}