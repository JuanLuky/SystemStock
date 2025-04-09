import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/layouts/header/header.component';
import { SidebarComponent } from "../../components/layouts/sidebar/sidebar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
