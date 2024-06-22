import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export abstract class UserService {
    private userKey = 'authUser';
    private userListKey = 'userList';

    constructor() { }

    // --- login --- //
    setUser(user: User): void {
        // no almacenar la contraseña
        user.password = "";
        sessionStorage.setItem(this.userKey, JSON.stringify(user));
    }

    getUser(): User | null {
        let user = sessionStorage.getItem(this.userKey);
        return user ? JSON.parse(user) : null;
    }

    removeUser(): void {
        sessionStorage.removeItem(this.userKey);
    }

    isAuthenticated(): boolean {
        return this.getUser() !== null;
    }

    isAdmin(): boolean {
        return this.isAuthenticated() && this.getUser()!.isAdmin;
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

}
