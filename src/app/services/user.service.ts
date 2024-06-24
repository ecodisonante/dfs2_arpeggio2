import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userKey = 'authUser';
    private userListKey = 'userList';

    private isLoggedIn = new BehaviorSubject<boolean>(this.checkAuthenticated());
    private isAdmin = new BehaviorSubject<boolean>(this.checkAdmin());

    // --- login --- //

    logIn(user: User): void {
        // no almacenar la contraseña
        user.password = "";
        sessionStorage.setItem(this.userKey, JSON.stringify(user));

        // recargar restricciones
        this.isLoggedIn.next(this.checkAuthenticated());
        this.isAdmin.next(this.checkAdmin());
    }

    get isAuthenticated() {
        return this.isLoggedIn.asObservable();
    }

    get isAdminAuth() {
        return this.isAdmin.asObservable();
    }

    getUser(): User | null {
        let user = sessionStorage.getItem(this.userKey);
        return user ? JSON.parse(user) : null;
    }

    logOut(): void {
        sessionStorage.removeItem(this.userKey);
        this.isLoggedIn.next(this.checkAuthenticated());
        this.isAdmin.next(this.checkAdmin());
    }

    checkAuthenticated(): boolean {
        return this.getUser() !== null;
    }

    checkAdmin(): boolean {
        return this.getUser() !== null && this.getUser()!.isAdmin;
    }


    // --- Repositorio --- //
    setUserList(users: User[]) {
        localStorage.setItem(this.userListKey, JSON.stringify(users));
    }

    getUserList(): User[] | null {
        let users = localStorage.getItem(this.userListKey);
        return users ? JSON.parse(users) : null;
    }

    findUser(username: string): User | undefined {
        return this.getUserList()!.find(x => x.username === username);
    }

    addUser(user: User) {
        let userList = this.getUserList();
        if (!userList) userList = [user];
        else userList.push(user);
        this.setUserList(userList);
    }
}
