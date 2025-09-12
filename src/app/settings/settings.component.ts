import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatIconModule, MatSelectModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  lang = 'fa-IR';
  theme: 'light'|'dark' = 'dark';
  username: string | null = '';

  avatarDataUrl: string | null = null;

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'fa-IR';
    this.theme = (localStorage.getItem('theme') === 'light') ? 'light' : 'dark';
    this.username = localStorage.getItem('user');
    this.avatarDataUrl = localStorage.getItem('avatar') || null;
  }

  save(): void {
    localStorage.setItem('lang', this.lang);
    localStorage.setItem('theme', this.theme);
    if (this.avatarDataUrl) localStorage.setItem('avatar', this.avatarDataUrl);
    alert('تنظیمات ذخیره شد. لطفاً برای اعمال کامل، یکبار صفحه را ریفرش کنید.');
  }

  onAvatarChange(ev: any): void {
    const file = ev.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { this.avatarDataUrl = String(reader.result); };
    reader.readAsDataURL(file);
  }
}