import { Routes } from '@angular/router';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { ProductComponent } from './components/product/product.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { RecoveryComponent } from './components/user/recovery/recovery.component';
import { CartComponent } from './components/cart/cart.component';

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
        path: 'cart',
        title: 'Carrito',
        component: CartComponent,
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
            },
            {
                path: 'register',
                title: 'Crear Cuenta',
                component: RegisterComponent,
            },
            {
                path: 'recovery',
                title: 'Recuperar Contraseña',
                component: RecoveryComponent,
            }
        ]
    },




    { // Momentaneamente el home es la pagina categorias
        path: '',
        redirectTo: 'catalogo',
        pathMatch: 'full'
    }

];
