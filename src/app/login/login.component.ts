import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RecaptchaComponent } from "../recaptcha/recaptcha.component";
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RecaptchaComponent,
    RecaptchaModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  RecaptchaResponse: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
      recaptcha: [''],
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