import { Routes } from '@angular/router';
import CatalogoComponent from './pages/catalogo/catalogo.component';

export const routes: Routes = [

    {
        path: 'catalogo',
        title: 'Catálogo',
        component: CatalogoComponent,
    },




    { // Momentaneamente el home es la pagina categorias
        path: '',
        redirectTo: 'catalogo',
        pathMatch: 'full'
    }

];
