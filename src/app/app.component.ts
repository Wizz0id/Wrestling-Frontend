import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  standalone:true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Wrestling-Frontend';
  backgrounds: string[] = [
    '/background/background1.jpg',
    '/background/background2.jpg',
    '/background/background3.jpg',
    '/background/background4.jpg',
    '/background/background5.jpg',
    '/background/background6.jpg',
    '/background/background7.jpg',
    '/background/background8.jpg',
    '/background/background9.jpg',
    '/background/background10.jpg',
    '/background/background11.jpg',
    '/background/background12.jpg',
    '/background/background13.jpg',
    '/background/background14.jpg',
    '/background/background15.jpg',
    '/background/background16.jpg',
    '/background/background17.jpg',
    '/background/background18.jpg',
    '/background/background19.jpg',
    '/background/background20.jpg'
  ];

  ngOnInit(): void {
    setInterval(() => this.changeBackground(), 20000);
    this.changeBackground();
  }
  getRandomBackground(): string {
    const randomIndex: number = Math.floor(Math.random() * this.backgrounds.length);
    return this.backgrounds[randomIndex];
  }
  changeBackground(): void {
    const animationElement: HTMLElement | null = document.querySelector('.animation');
    if (animationElement && !animationElement.classList.contains('static')) {
      const newBackground: string = this.getRandomBackground();
      animationElement.style.backgroundImage = `url('${newBackground}')`;
    }
  }
}
