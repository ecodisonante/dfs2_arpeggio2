import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../models/cart.model';
import { User } from '../../../models/user.model';

/**
 * @description
 * Componente encargado del inicio de sesion.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  /**
   * Formulario de ingreso
   */
  loginForm!: FormGroup;

  /**
   * constructor
   */
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private cartService: CartService
  ) { }


  /**
  * ngOnInit
  */
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * @description
   * Valida que el usuario y la contraseña sean correctos y agrega el usuario a la sesión activa.
   */
  login() {
    if (this.loginForm.valid) {

      const login = this.loginForm.value;
      let logingUser: User | undefined;

      this.userService.findUser(login.username, login.password).subscribe({
        next: (data) => logingUser = data,
        error: (error) => console.log(error),
        complete: () => {

          if (logingUser) {
            this.userService.logIn(logingUser);

            // activar carrito del usuario
            if (!logingUser.isAdmin) {
              let cart = this.cartService.findUserCart(logingUser.username);
              if (!cart) cart = new Cart(logingUser.username, [], 0, 0);
              this.cartService.setActiveCart(cart);
            }

            Swal.fire({
              icon: "success",
              title: "Bienvenido, " + logingUser.nombre,
            }).then(() => {
              this.router.navigate(['/']);
            });

          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Credenciales Incorrectas",
            });
          }

        }
      });
    }
  }

}
