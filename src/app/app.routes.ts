import { Routes } from '@angular/router';
import CatalogoComponent from './components/catalogo/catalogo.component';
import ProductComponent from './components/product/product.component';
import UserComponent from './components/user/user.component';
import LoginComponent from './components/user/login/login.component';

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
    {
        path: 'user',
        title: 'Usuario',
        component: UserComponent,
        children: [
            {
                path: 'login',
                title: 'Ingresar',
                component: LoginComponent,
            }
        ]
    },




    { // Momentaneamente el home es la pagina categorias
        path: '',
        redirectTo: 'catalogo',
        pathMatch: 'full'
    }

];
