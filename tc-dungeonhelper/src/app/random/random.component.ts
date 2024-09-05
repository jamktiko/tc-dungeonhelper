import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-random',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './random.component.html',
  styleUrl: './random.component.css'
})
export class RandomComponent {

}
