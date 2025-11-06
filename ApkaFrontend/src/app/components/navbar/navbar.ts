import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // 1. Zaimportuj RouterLink

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink], // 2. Dodaj RouterLink tutaj
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  // Pusto - cała logika jest w HTML
}