import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

/**
 * Clase de servicios relacionados a Usuarios
 */
@Injectable({
    providedIn: 'root'
})
export class UserService {
    /** Llave para identificar persistencia de usuario */
    private userKey = 'authUser';
    /** Llave para identificar persistencia de lista de usuarios */
    private userListKey = 'userList';
    /** Indicador observable de usuario activo */
    private isLoggedIn = new BehaviorSubject<boolean>(this.checkAuthenticated());
    /** Indicador observable de usuario activo con permisos de admin */
    private isAdmin = new BehaviorSubject<boolean>(this.checkAdmin());

    // --- login --- //

    /**
     * Agrega sesion de usuario a _sessionStorage_ y actualiza indicadores
     */
    logIn(user: User): void {
        // no almacenar la contraseña
        user.password = "";
        sessionStorage.setItem(this.userKey, JSON.stringify(user));

        // recargar restricciones
        this.isLoggedIn.next(this.checkAuthenticated());
        this.isAdmin.next(this.checkAdmin());
    }

    /**
     * Retorna indicador observable de usuario activo
     */
    get isAuthenticated() {
        return this.isLoggedIn.asObservable();
    }

    /**
     * Retorna indicador observable de usuario activo con permisos admin
     */
    get isAdminAuth() {
        return this.isAdmin.asObservable();
    }

    /**
     * Obtiene el usuario activo
     */
    getUser(): User | null {
        let user = sessionStorage.getItem(this.userKey);
        return user ? JSON.parse(user) : null;
    }

    /**
     * Termina la sesion del usuario
     */
    logOut(): void {
        sessionStorage.removeItem(this.userKey);
        this.isLoggedIn.next(this.checkAuthenticated());
        this.isAdmin.next(this.checkAdmin());
    }

    /**
     * Comprueba si hay un usuario activo
     */
    checkAuthenticated(): boolean {
        return this.getUser() !== null;
    }

    /**
     * Comprueba si hay un usuario activo con permisos admin
     */
    checkAdmin(): boolean {
        return this.getUser() !== null && this.getUser()!.isAdmin;
    }


    // --- Repositorio --- //

    /**
     * Almacena la lista de usuarios en _localStorage_
     */
    setUserList(users: User[]) {
        localStorage.setItem(this.userListKey, JSON.stringify(users));
    }

    /**
     * Obtiene lista completa de usuarios
     */
    getUserList(): User[] | null {
        let users = localStorage.getItem(this.userListKey);
        return users ? JSON.parse(users) : null;
    }

    /**
     * Encontrar un usuario por su _username_
     */
    findUser(username: string): User | undefined {
        return this.getUserList()!.find(x => x.username === username);
    }

    /**
     * Agregar usuario a la lista de usuarios
     */
    addUser(user: User) {
        let userList = this.getUserList();
        if (!userList) userList = [user];
        else userList.push(user);
        this.setUserList(userList);
    }
}
