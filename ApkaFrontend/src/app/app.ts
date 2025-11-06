// W pliku: src/app/app.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Zostaw tylko RouterOutlet
import { NavbarComponent } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent], // Zostaw tylko RouterOutlet
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  // Wszystko stąd zniknęło!
}