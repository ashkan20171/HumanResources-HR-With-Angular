import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatCardModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  // اگر app-recaptcha را در HTML دارید و هنوز import نکرده‌اید، این schema مانع خطا می‌شود.
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent implements OnInit {
  role: string = localStorage.getItem('role') || 'user';

  loginForm!: FormGroup;     // اینجا فقط تعریف می‌کنیم
  loading = false;
  errorMsg = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // ساخت فرم اینجا (fb آماده است)
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // اگر کاربر قبلاً لاگین بوده:
    const u = localStorage.getItem('user');
    if (u) {
      const savedRole = localStorage.getItem('role') || 'user';
      if (savedRole === 'user') this.router.navigate(['/register-hourse']);
      else this.router.navigate(['/dashboard']);
    }
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

      const { username, password } = this.loginForm.value;
      if (!username || !password) {
        this.errorMsg = 'نام کاربری و رمز عبور الزامی است';
        return;
      }

      // ذخیره کاربر + نقش
      localStorage.setItem('user', String(username));
      localStorage.setItem('role', this.role);

      // هدایت بر اساس نقش
      if (this.role === 'user') {
        this.router.navigate(['/register-hourse']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    }, 300);
  }
}
