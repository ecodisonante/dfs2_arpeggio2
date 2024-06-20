import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  logoClass: string = 'bar-logo-off';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 130) {
      this.logoClass = 'bar-logo-on';
    } else {
      this.logoClass = 'bar-logo-off';
    }
  }

}
