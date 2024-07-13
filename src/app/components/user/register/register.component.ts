import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { minAgeValidator, passwordMatchValidator, passwordStregthValidator } from '../../../validators/custom-validator';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import Swal from 'sweetalert2';
import { error } from 'console';

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
  ngOnInit(): void {
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
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;

      let existingUser: User | undefined

      this.userService.findUserByEmail(formValue.usuario, formValue.correo).subscribe({
        next: (data) => existingUser = data,
        error: (error) => console.log(error),
        complete: () => {

          if (existingUser) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Ya hay un registro con ese nombre de usuario",
            });
          } else {

            this.saveUser(formValue);
          }
        }
      });
    }
  }

  private saveUser(form: any) {

    let nuevo = new User(
      form.usuario,
      form.nombres,
      form.apepat,
      form.apemat,
      form.direccion,
      form.correo,
      form.passwd,
      true,
      form.isadmin,
      undefined
    );

    let result: boolean;
    this.userService.addUser(nuevo).subscribe({
      next: (data) => result = data,

      error: (error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error,
        });
      },

      complete: () => {
        if (result) {

          Swal.fire({
            icon: "success",
            title: "Usuario registrado",
          }).then(() => {
            this.router.navigate(['/']);
          });

          console.log("Success Register!!");
          this.successRegister = true;
        }
      }
    });
  }

}
