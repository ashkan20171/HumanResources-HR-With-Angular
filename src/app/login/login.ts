import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Router } from '@angular/router';
import { RecaptchaComponent } from "../recaptcha/recaptcha";
import { RecaptchaModule } from "ng-recaptcha"

@Component({
  selector: 'app-login',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RecaptchaComponent,
    RecaptchaModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  RecaptchaResponse: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
      recaptcha: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const username = this.loginForm.value.username.trim();
    const password = this.loginForm.value.password.trim();

    if (username === 'ashkan' && password === 'ashkan') {
      localStorage.setItem('user', username);
      this.router.navigate(['/dashboard']);
    } else {
      alert('نام کاربری و رمز عبور درست نمی‌باشد.');
    }
  }
}
