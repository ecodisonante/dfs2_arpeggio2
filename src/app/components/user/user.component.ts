import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente padre para componentes relacionados a Usuarios
 */
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  // username: string = "";
  // password: string = "";


  // login() {
  //   //TODO
  // }

  // register() {
  //   //TODO
  // }

  // recover() {
  //   //TODO
  // }
}
