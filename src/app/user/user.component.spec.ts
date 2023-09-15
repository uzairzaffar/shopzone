import { TestBed, ComponentFixture } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from '../service/product.service';
import { AlertService } from '../service/alert.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('UserComponent', () => {
  let fixture: ComponentFixture<UserComponent>;
  let component: UserComponent;
  let alertService: AlertService;
  let productService: ProductService;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        TranslateModule.forRoot(),
        MatProgressSpinnerModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      providers: [
        TranslateService,
        AlertService,
        ProductService,
      ],
    });

    fixture = TestBed.createComponent(UserComponent);
    productService = TestBed.inject(ProductService);
    alertService = TestBed.inject(AlertService);
    translateService = TestBed.inject(TranslateService);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories on ngOnInit', () => {
    spyOn(productService, 'getCategories').and.returnValue(of(['Category1', 'Category2']));
    component.ngOnInit();
    expect(productService.getCategories).toHaveBeenCalled();
    expect(component.categories.length).toBeGreaterThan(0);
  });

  it('should handle error when loading categories', () => {
    spyOn(translateService, 'get').and.returnValue(of('Error message'));
    spyOn(alertService, 'showError');
    spyOn(productService, 'getCategories').and.returnValue(throwError('Error'));

    component.ngOnInit();

    expect(translateService.get).toHaveBeenCalledWith('user.categoriesFetchError');
    expect(alertService.showError).toHaveBeenCalledWith('Error message');
  });

  it('should load products by category', () => {
    const category = 'Category1';
    spyOn(productService, 'getProductsByCategory').and.returnValue(of([
      { name: 'Product1', category: 'Category1', price: 10 },
      { name: 'Product2', category: 'Category2', price: 20 },
    ]));
    component.loadProductsByCategory(category);

    expect(productService.getProductsByCategory).toHaveBeenCalledWith(category);
    expect(component.products.length).toBeGreaterThan(0);
  });

  it('should apply filters correctly', () => {
    component.selectedCategory = 'Category1';
    component.products = [
      { name: 'Product1', category: 'Category1', price: 10 },
      { name: 'Product2', category: 'Category2', price: 20 },
    ];
    component.minPriceFilter = 5;
    component.maxPriceFilter = 15;

    component.applyFilters();

    expect(component.displayedProducts.length).toBe(1);
    expect(component.displayedProducts[0].name).toBe('Product1');
  });

  it('should apply sorting in ascending order', () => {
    // Mock data
    component.products = [
      { name: 'Product1', category: 'Category1', price: 10 },
      { name: 'Product2', category: 'Category1', price: 5 },
    ];
    component.selectedSortOption = 'asc';

    component.applySort();

    expect(component.products[0].price).toBe(5);
  });

  it('should apply sorting in descending order', () => {
    component.products = [
      { name: 'Product1', category: 'Category1', price: 10 },
      { name: 'Product2', category: 'Category1', price: 5 },
    ];
    component.selectedSortOption = 'desc';

    component.applySort();

    expect(component.products[0].price).toBe(10);
  });

  it('should calculate total pages correctly based on displayedProducts and itemsPerPage', () => {
    component.products = [
      { name: 'Product1', category: 'Category1', price: 10 },
      { name: 'Product2', category: 'Category1', price: 5 },
      { name: 'Product3', category: 'Category1', price: 15 },
    ];
    component.itemsPerPage = 2;
    const expectedTotalPages = Math.ceil(component.displayedProducts.length / component.itemsPerPage);
    const totalPages = component.totalPages;
  
    expect(totalPages).toBe(expectedTotalPages);
  });
  
  it('should not change current page when onPageChange is called with an invalid page number', () => {
    const newPage = -1;
    const currentPage = component.currentPage;

    component.onPageChange(newPage);

    expect(component.currentPage).toBe(currentPage);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
