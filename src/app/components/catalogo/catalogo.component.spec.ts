import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CatalogoComponent } from './catalogo.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { TestingData } from '../../models/testing-data';
import { By } from '@angular/platform-browser';
import { Product } from '../../models/product.model';

describe('CatalogoComponent', () => {
    let component: CatalogoComponent;
    let fixture: ComponentFixture<CatalogoComponent>;
    let productService: ProductService;
    let cartService: CartService;
    let userService: UserService;
    let router: Router;
    let route: ActivatedRoute;

    let testingData: Product[] = TestingData.productList;
    let testingAdmin: boolean = false;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CatalogoComponent],
            providers: [
                { provide: ProductService, useValue: { filterProducts: () => testingData } },
                { provide: CartService, useValue: { addToActiveCart: () => { } } },
                { provide: UserService, useValue: { isAdminAuth: of(testingAdmin) } },
                { provide: Router, useValue: { navigate: () => { } } },
                { provide: ActivatedRoute, useValue: { queryParams: of({ sale: true }) } }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CatalogoComponent);
        component = fixture.componentInstance;
        productService = TestBed.inject(ProductService);
        cartService = TestBed.inject(CartService);
        userService = TestBed.inject(UserService);
        router = TestBed.inject(Router);
        route = TestBed.inject(ActivatedRoute);
        fixture.detectChanges();

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // it('should return complete product list', () => {
    //     component.productFilter();
    //     expect(component.catalogo.length).toBe(TestingData.productList.length);
    // });

    it('should add product to cart', () => {
        spyOn(cartService, 'addToActiveCart');

        component.addToCart(180442);
        
        expect(cartService.addToActiveCart).toHaveBeenCalled();
    });

    // it('should call addToCart when button clicked', () => {
    //     spyOn(component, 'addToCart');

    //     const button = fixture.debugElement.query(By.css("button"));
    //     button.nativeElement.click();

    //     expect(component.addToCart).toHaveBeenCalled();
    // });

});
