import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Header, Sidebar],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout implements OnInit{
  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = sessionStorage.getItem('user');
    if (!user) {
      this.router.navigate(['/login']);
    }
  }
}
