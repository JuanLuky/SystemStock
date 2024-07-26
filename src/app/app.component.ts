import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'crud_angular';

  constructor() {
    // Code to initialize the app goes here
    initFlowbite();
  }
}
