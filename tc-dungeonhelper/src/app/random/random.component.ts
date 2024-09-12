import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-random',
  standalone: true,
  imports: [RouterModule, RouterOutlet, MatButtonModule],
  templateUrl: './random.component.html',
  styleUrl: './random.component.css',
})
export class RandomComponent {

}
