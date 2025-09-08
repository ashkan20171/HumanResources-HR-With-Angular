import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
  RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
