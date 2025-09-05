import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';
import { RecaptchaComponent } from '../recaptcha/recaptcha';
import { RecaptchaModule } from 'ng-recaptcha';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    RecaptchaModule,
    RecaptchaComponent
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  private returnUrl = '/dashboard';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
    const r = this.route.snapshot.queryParamMap.get('returnUrl');
    if (r) this.returnUrl = r;
  }

  onSubmit(): void {
    const username = (this.loginForm.value.username || '').toString().trim();
    const password = (this.loginForm.value.password || '').toString().trim();

    if (username === 'ashkan' && password === 'ashkan') {
      this.auth.login(username);
      this.router.navigateByUrl(this.returnUrl);
    } else {
      alert('نام کاربری و رمز عبور درست نمی‌باشد.');
    }
  }
}
