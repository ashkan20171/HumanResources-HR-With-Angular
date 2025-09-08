import { Component } from '@angular/core';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-recaptcha',
  standalone: true,
  imports: [RecaptchaModule, RecaptchaFormsModule],
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.css']
})
export class RecaptchaComponent {
onCaptchaResolved($event: string|null) {
throw new Error('Method not implemented.');
}

}