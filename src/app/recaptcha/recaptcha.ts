import { Component, OnInit } from '@angular/core';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-recaptcha',
  imports: [RecaptchaModule, RecaptchaFormsModule],
  templateUrl: './recaptcha.html',
  styleUrl: './recaptcha.css'
})
export class RecaptchaComponent {
onCaptchaResolved($event: string|null) {
throw new Error('Method not implemented.');
}

}
