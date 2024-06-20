export class User {
    username: string;
    nombre: string;
    apepat: string;
    apemat: string;
    direccion: string;
    email: string;
    password: string;
    activo: boolean;
    tempPass: string;
    isAdmin: boolean;

    constructor(username: string, nombre: string, apepat: string, apemat: string, direccion: string, email: string, password: string, activo: boolean, tempPass: string, isAdmin: boolean) {
        this.username = username;
        this.nombre = nombre;
        this.apepat = apepat;
        this.apemat = apemat;
        this.direccion = direccion;
        this.email = email;
        this.password = password;
        this.activo = activo;
        this.tempPass = tempPass;
        this.isAdmin = isAdmin;
    }
}