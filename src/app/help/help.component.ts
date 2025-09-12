import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css',
})
export class HelpComponent {
  faqs = [
    { q:'چطور مرخصی ثبت کنم؟', a:'از منوی «مرخصی» وارد شوید، نوع مرخصی را انتخاب کنید و ثبت کنید.' },
    { q:'فیش حقوقی را چطور دانلود کنم؟', a:'در صفحه «حقوق و دستمزد»، ماه مورد نظر را انتخاب و دکمه دانلود/چاپ را بزنید.' },
    { q:'تم روشن/تاریک کجاست؟', a:'در نوار بالا (هدر) دکمه ماه/خورشید را کلیک کنید.' },
  ];
}