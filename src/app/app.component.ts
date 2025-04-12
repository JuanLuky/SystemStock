import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { initFlowbite } from 'flowbite';
import { LayoutsComponent } from "./layouts/layouts.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutsComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'crud_angular';

  constructor() {
    // Code to initialize the app goes here
    initFlowbite();
  }
}
