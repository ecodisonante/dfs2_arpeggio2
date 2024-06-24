/**
 * Modelo para Categoria de Productos
 */
export class Category {
    /**
     * Identificador único de la categoría
     */
    id: number;
    /**
     * Nombre de la categoría
     */
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}