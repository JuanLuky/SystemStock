import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './banner.component.html',
})
export class BannerComponent {

}
