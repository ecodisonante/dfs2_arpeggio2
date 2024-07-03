import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, Subject, catchError, map, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';

/**
 * Clase de servicios relacionados a Usuarios
 */
@Injectable({
    providedIn: 'root'
})
export class UserService {
    /** 
     * Llave para identificar persistencia de usuario 
     */
    private userKey = 'authUser';
    /** 
     * Indicador observable de usuario activo 
     */
    private isLoggedIn = new BehaviorSubject<boolean>(this.checkAuthenticated());
    /** 
     * Indicador observable de usuario activo con permisos de admin 
     */
    private isAdmin = new BehaviorSubject<boolean>(this.checkAdmin());

    private userUrl: string = 'https://firebasestorage.googleapis.com/v0/b/dfs2-1f652.appspot.com/o/arpeggio%2Fuser.json?alt=media&token=4afef7b7-3ab9-44c3-be4a-ff0c1ea4365b';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 4afef7b7-3ab9-44c3-be4a-ff0c1ea4365b'
        })
    }

    constructor(
        private http: HttpClient,
        private storage: StorageService
    ) { }

    /**
     * Obtiene la lista completa de usuarios registrados
     * 
     * @returns `Observable` de `User[]`
     */
    getUserList(): Observable<User[]> {
        return this.http.get<User[]>(this.userUrl);
    }

    /**
     * Agrega usuario activo a sessionStorage y actualiza indicadores
     */
    logIn(user: User): boolean {
        this.storage.setItem(this.userKey, JSON.stringify(user));

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
        return this.getUserList().pipe(
            map((users: User[]) => {
                let user = users.find(u => u.username === username && u.password === password);
                if (user) user.password = "";
                return user;
            })
        );
    }

    /**
     * Agregar usuario a la lista de usuarios
     * 
     * @param user Usuario nuevo para agregar
     * 
     * @returns Observable<boolean> indica si la operacion se realizó con exito
     */
    addUser(user: User): Observable<boolean> {
        const result = new Subject<boolean>();

        this.getUserList().subscribe({
            next: (users) => {
                // Agrega a lista existente
                users.push(user);
                this.http.post(this.userUrl, users, this.httpOptions).pipe(
                    map(() => {
                        // Emitir resultado de post
                        result.next(true);
                        result.complete();
                    }),
                    catchError((error) => {
                        result.error(false);
                        return of(false);
                    })
                ).subscribe();
            },
            error: (err) => {
                result.error(false);
            }
        });

        return result.asObservable();
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
        return this.getUserList().pipe(
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
    getActiveUser(): User | null {
        let user = this.storage.getItem(this.userKey);
        return user ? JSON.parse(user) : null;
    }

    /**
     * Termina la sesion del usuario
     */
    logOut(): void {
        this.storage.removeItem(this.userKey);
        this.isLoggedIn.next(this.checkAuthenticated());
        this.isAdmin.next(this.checkAdmin());
    }

    /**
     * Comprueba si hay un usuario activo
     */
    checkAuthenticated(): boolean {
        return this.getActiveUser() !== null;
    }

    /**
     * Comprueba si hay un usuario activo con permisos admin
     */
    checkAdmin(): boolean {
        return this.getActiveUser() !== null && this.getActiveUser()!.isAdmin;
    }



}
