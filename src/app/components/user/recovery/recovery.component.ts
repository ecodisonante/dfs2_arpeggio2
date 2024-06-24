import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.css'
})
export class RecoveryComponent {
  recoveryForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.recoveryForm = this.fb.group({
      correo: ['', [Validators.required, , Validators.email]],
      usuario: ['', Validators.required],
    });
  }

  recovery() {
    if (this.recoveryForm.valid) {
      const formValue = this.recoveryForm.value;

      let pista: string = "";
      let user = this.userService.findUser(formValue.usuario.trim().toLowerCase());

      //TODO: eliminar pista
      if (!user) pista = "El usuario que ingresaste no existe";
      else if (user.email !== formValue.correo) pista = "El usuario y correo no coinciden";
      else pista = `Tu password es "${user?.password}"`;

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
  }
}