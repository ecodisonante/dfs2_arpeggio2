import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

    private userUrl: string = 'https://firebasestorage.googleapis.com/v0/b/dfs2-1f652.appspot.com/o/arpeggio%2Fuser.json?alt=media&token=b83956f2-6914-4059-b222-a166d06b02d5';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 3aaf6e9c-996e-4022-a780-29ccfe9ab44c'
        })
    }

    constructor(
        private http: HttpClient
    ) { }

    // --- login --- //

    /**
     * Agrega sesion de usuario a _sessionStorage_ y actualiza indicadores
     */
    logIn(user: User): boolean {
        sessionStorage.setItem(this.userKey, JSON.stringify(user));

        // recargar restricciones
        this.isLoggedIn.next(this.checkAuthenticated());
        this.isAdmin.next(this.checkAdmin());

        return true
    }

    /**
     * Obtiene un usuario a través de su username y constraseña
     * 
     * @param username Identificador del usuario solicitado
     * @param password Contraseña del usuario solicitado
     * 
     * @return `Observable` de `User` si coincide un registro, en caso contrario `undefined`
     */
    findUser(username: string, password: string): Observable<User | undefined> {
        return this.http.get<User[]>(this.userUrl).pipe(
            map((users: User[]) => {
                let user = users.find(u => u.username === username && u.password === password);
                if (user) user.password = "";
                return user;
            })
        );
    }

    /**
     * Obtiene un usuario a través de su username y su email
     * 
     * @param username Identificador del usuario solicitado
     * @param email Correo electrónico del usuario solicitado
     * 
     * @return `Observable` de `User` si coincide un registro, en caso contrario `undefined`
     */
    findUserByEmail(username: string, email: string): Observable<User | undefined> {
        return this.http.get<User[]>(this.userUrl).pipe(
            map((users: User[]) => {
                let user = users.find(u => u.username === username && u.email === email);
                return user;
            })
        );
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
        // let user = sessionStorage.getItem(this.userKey);
        // return user ? JSON.parse(user) : null;
        return null;
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

    // /**
    //  * Encontrar un usuario por su _username_
    //  */
    // findUser(username: string): User | undefined {
    //     return this.getUserList()!.find(x => x.username === username);
    // }

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
