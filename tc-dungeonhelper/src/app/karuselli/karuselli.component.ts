import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';

interface CarouselItem {
  image: string;
  title: string;
  text: string;
}
@Component({
  selector: 'app-karuselli',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatButton,
  ],
  templateUrl: './karuselli.component.html',
  styleUrl: './karuselli.component.css',
})
export class KaruselliComponent {
  currentSlide = 0;
  slides: CarouselItem[] = [
    {
      image: 'assets/karuselli1.png',
      title: 'Dungeon master resources for every adventure',
      text: 'Subscribe to access tools for custom encounters, environments, and more!',
    },
    {
      image: 'assets/karuselli2.png',
      title: 'Unlimited customizable encounters',
      text: 'Subscribe to access tools for custom encounters, environments, and more!',
    },
    {
      image: 'assets/karuselli3.png',
      title: 'Community of Dungeonhelpers',
      text: 'Subscribe to access tools for custom encounters, environments, and more!',
    },
    {
      image: 'assets/karuselli4.png',
      title: 'Community of Dungeonhelpers',
      text: 'Subscribe to access tools for custom encounters, environments, and more!',
    },
  ];

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}
