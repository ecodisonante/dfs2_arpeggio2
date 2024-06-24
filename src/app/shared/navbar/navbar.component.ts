import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

/**
 * @description
 * Componente encargado de manejar la barra de navegación.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  logoClass: string = 'bar-logo-off';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe((authStatus: boolean) => { this.isAuthenticated = authStatus; });
    this.userService.isAdminAuth.subscribe((adminStatus: boolean) => { this.isAdmin = adminStatus; });
  }

  /**
   * @description
   * Termina la sesión del usuario activo.
   */
  salir() {
    this.userService.logOut();
    Swal.fire({
      icon: "success",
      title: "Vuelve pronto !!",
    }).then(() => {
      this.router.navigate(['/']);
    });
  }

  /**
   * @description
   * Vuelve visible el logo de la barra de navegación cuando llega a la parte superior de la pantalla
   */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 130) {
      this.logoClass = 'bar-logo-on';
    } else {
      this.logoClass = 'bar-logo-off';
    }
  }

}
