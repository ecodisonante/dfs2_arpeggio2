import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
/**
 * @description
 * Componente encargado del inicio de sesion.
 * 
 * Valida que el usuario y la contraseña sean correctos y agrega el usuario a la sesión activa.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {

  loginForm!: FormGroup;
  successRegister: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let user = this.userService.findUser(this.loginForm.get('username')?.value.trim().toLowerCase());

      if (user?.password === this.loginForm.get('password')?.value) {
        this.userService.setUser(user!);
        Swal.fire({
          icon: "success",
          title: "Bienvenido, " + user?.nombre,
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
  }
}
