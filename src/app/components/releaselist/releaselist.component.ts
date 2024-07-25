import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-releaselist',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './releaselist.component.html',
  styleUrl: './releaselist.component.scss'
})
export class ReleaselistComponent {

}
