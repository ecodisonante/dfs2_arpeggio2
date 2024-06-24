/**
 * Modelo para Usuario
 */
export class User {
    /** Identificador del Usuario */
    username: string;
    /** Nombre del Usuario */
    nombre: string;
    /** Apellido Paterno del Usuario */
    apepat: string;
    /** Apellido Materno del Usuario */
    apemat: string;
    /** Direccion del Usuario */
    direccion: string;
    /** Email del Usuario */
    email: string;
    /** Contraseña del Usuario */
    password: string;
    /** Indica si el Usuario está activo */
    activo: boolean;
    /** Contraseña temporal del Usuario */
    tempPass?: string;
    /** Indica si el Usuario tiene permisos de Admin */
    isAdmin: boolean;

    /** constructor */
    constructor(username: string, nombre: string, apepat: string, apemat: string, direccion: string, email: string, password: string, activo: boolean, isAdmin: boolean, tempPass?: string) {
        this.username = username;
        this.nombre = nombre;
        this.apepat = apepat;
        this.apemat = apemat;
        this.direccion = direccion;
        this.email = email;
        this.password = password;
        this.activo = activo;
        this.isAdmin = isAdmin;
        this.tempPass = tempPass;
    }
}