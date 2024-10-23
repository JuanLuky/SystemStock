import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [MatCardModule, SidebarComponent],
  templateUrl: './banner.component.html',
})
export class BannerComponent {

}
