import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { of, Observable } from 'rxjs';
import { AdminComponent } from './admin.component';
import { ProductService } from '../service/product.service';
import { AlertService } from '../service/alert.service';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let productService: ProductService;
  let alertService: AlertService;
  let dialog: MatDialog;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        MatSnackBarModule,
        MatTableModule,
        MatDialogModule
      ],
      providers: [ProductService, AlertService],
    });

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    alertService = TestBed.inject(AlertService);
    dialog = TestBed.inject(MatDialog);
    translateService = TestBed.inject(TranslateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on ngOnInit', () => {
    const products: any = [{ id: 1, title: 'Product 1', price: 10 }];
    spyOn(productService, 'getProducts').and.returnValue(of(products));

    component.ngOnInit();

    expect(productService.getProducts).toHaveBeenCalled();
    expect(component.products.data).toEqual(products);
  });

  it('should open a dialog for adding a product', () => {
    const dialogRef = {
      afterClosed: () => of({}) as Observable<any>
    } as MatDialogRef<any>;
  
    spyOn(dialog, 'open').and.returnValue(dialogRef);

    component.openAddProductDialog();

    expect(dialog.open).toHaveBeenCalled();
  });

  it('should open a dialog for editing a product', () => {
    const product = { id: 1, title: 'Product 1', price: 10 };
    const dialogRef = {
      afterClosed: () => of({}) as Observable<any>
    } as MatDialogRef<any>;
  
    spyOn(dialog, 'open').and.returnValue(dialogRef);

    component.openEditProductDialog(product);

    expect(dialog.open).toHaveBeenCalled();
  });

  it('should open a dialog for deleting a product', () => {
    const dialogRef = {
      afterClosed: () => of({}) as Observable<any>
    } as MatDialogRef<any>;
  
    spyOn(dialog, 'open').and.returnValue(dialogRef);

    component.deleteProduct(1);

    expect(dialog.open).toHaveBeenCalled();
  });
});
