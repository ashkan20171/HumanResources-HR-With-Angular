import { Component } from '@angular/core';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-recaptcha',
  standalone: true,
  imports: [RecaptchaModule, RecaptchaFormsModule],
  templateUrl: './recaptcha.html',
  styleUrl: './recaptcha.css'
})
export class RecaptchaComponent {
  token: string | null = null;

  onCaptchaResolved($event: string | null) {
    this.token = $event;
    // optionally: localStorage.setItem('captcha', this.token ?? '');
  }
}
