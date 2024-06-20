import { Routes } from '@angular/router';
import CatalogoComponent from './pages/catalogo/catalogo.component';
import ProductComponent from './pages/product/product.component';

export const routes: Routes = [

    {
        path: 'catalogo',
        title: 'Catálogo',
        component: CatalogoComponent,
    },
    {
        path: 'product/:id',
        title: 'Producto',
        component: ProductComponent,
    },





    { // Momentaneamente el home es la pagina categorias
        path: '',
        redirectTo: 'catalogo',
        pathMatch: 'full'
    }

];
