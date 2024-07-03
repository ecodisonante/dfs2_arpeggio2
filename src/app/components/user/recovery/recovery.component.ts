import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { User } from '../../../models/user.model';

/**
 * @description
 * Componente encargado de la recuperación de contraseña.
 */
@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.css'
})
export class RecoveryComponent {

  /**
   * Formulario de recuperacion de contraseña
   */
  recoveryForm!: FormGroup;

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
    this.recoveryForm = this.fb.group({
      correo: ['', [Validators.required, , Validators.email]],
      usuario: ['', Validators.required],
    });
  }

  /**
   * Genera la recuperación de contraseña para el usuario ingresado.
   * - Valida que el username exista en los registros
   * - Valida que el correo y el username coincidan en una misma cuenta
   */
  recovery() {
    if (this.recoveryForm.valid) {
      const formValue = this.recoveryForm.value;

      let pista: string = "";
      let forgottenUser: User | undefined

      this.userService.findUserByEmail(formValue.usuario, formValue.correo).subscribe({
        next: (data) => forgottenUser = data,
        error: (error) => console.log(error),
        complete: () => {

          //TODO: eliminar pista
          if (!forgottenUser) pista = "Las credenciales que ingresaste no coinciden";
          else pista = `Tu password es "${forgottenUser?.password}"`;

          Swal.fire({
            icon: "success",
            title: "Correo Enviado",
            text: "Si tus datos son correctos, enviaremos un email con tu contraseña",
            //TODO: eliminar pista
            footer: `<i class="text-sm">psst!! - ${pista}</i>`,
          }).then(() => {
            this.router.navigate(['/']);
          });
          
        }
      });
    }
  }
}