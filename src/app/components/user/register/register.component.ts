import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { minAgeValidator, passwordMatchValidator, passwordStregthValidator } from '../../../validators/custom-validator';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import Swal from 'sweetalert2';

/**
 * @description
 * Componente para manejar el registro de nuevos usuarios.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  /**
   * Formulario de registro
   */
  registerForm!: FormGroup;
  /**
   * Indicador de registro exitoso
   */
  successRegister: boolean = false;
  /**
   * Indicador de usuario con permisos de Admin
   */
  isAdmin: boolean = false;
  
  /**
   * constructor
   */
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

   /**
   * ngOnInit
   */
  ngOnInit():  void {
    this.userService.isAdminAuth.subscribe((adminStatus: boolean) => { this.isAdmin = adminStatus; });

    this.registerForm = this.fb.group({
      nombres: ['', Validators.required],
      apepat: ['', Validators.required],
      apemat: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', [Validators.required, , Validators.email]],
      usuario: ['', Validators.required],
      passwd: ['', [Validators.required, passwordStregthValidator()]],
      repasswd: ['', Validators.required],
      isadmin: [false]
    }, {
      validators: passwordMatchValidator('passwd', 'repasswd')
    });
  }

  /**
   * @description
   * Genera un nuevo usuario con los datos ingresados en el formulario
   * - Verifica que el username no haya sido utilizado previamente
   * - Solo los administradores pueden crear nuevos usuarios con rol admin
   */
  register() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;

      let nuevo = new User(
        formValue.usuario,
        formValue.nombres,
        formValue.apepat,
        formValue.apemat,
        formValue.direccion,
        formValue.correo,
        formValue.passwd,
        true,
        formValue.isadmin,
        undefined
      );

      if (this.userService.findUser(nuevo.username)) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ya hay un registro con ese nombre de usuario",
        });
      } else {
        this.userService.addUser(nuevo);
        this.successRegister = true;

        Swal.fire({
          icon: "success",
          title: "Usuario registrado",
        }).then(() => {
          this.router.navigate(['/']);
        });
      }

      console.log("Success Register!!");
    }
  }

}
