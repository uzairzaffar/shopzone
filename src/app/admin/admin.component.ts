import { Component, inject, DestroyRef } from '@angular/core';
import { ProductService } from '../service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DeleteProductDialogComponent } from './delete-product-dialog/delete-product-dialog.component';
import { AlertService } from '../service/alert.service';
import { ProductSaveDialogComponent } from './product-save-dialog/product-save-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent{
  products: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);
  displayedColumns: string[] = ['id', 'title', 'price', 'actions'];
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);
  private alertService = inject(AlertService);
  private translate = inject(TranslateService);
  private readonly destroy: DestroyRef = inject(DestroyRef);
  
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService
      .getProducts()
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe({
        next: (data: any) => {
          this.products.data = data;
        },
        error: () => {
          this.translate
            .get('admin.productsFetchError')
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe((message: string) => {
              this.alertService.showError(message);
            });
        },
      });
  }

  openAddProductDialog() {
    const dialogRef = this.dialog.open(ProductSaveDialogComponent, {
      width: '600px',
      height: '400px',
      data: { product: null }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.addProduct(result)
        .pipe(takeUntilDestroyed(this.destroy))
        .subscribe({
          next: (data: any) => {
            this.translate
              .get('admin.productSaved')
              .pipe(takeUntilDestroyed(this.destroy))
              .subscribe((message: string) => {
                this.alertService.showError(message);
              });
          },
          error: () => {
            this.translate
              .get('admin.productSaveError')
              .pipe(takeUntilDestroyed(this.destroy))
              .subscribe((message: string) => {
                this.alertService.showError(message);
              });
          },
        });
        }
    });
  }

  openEditProductDialog(product: any) {
    const dialogRef = this.dialog.open(ProductSaveDialogComponent, {
      width: '600px',
      height: '400px',
      data: { product }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.editProduct(product.id, result)
        .pipe(takeUntilDestroyed(this.destroy))
        .subscribe({
          next: (data: any) => {
            this.translate
              .get('admin.productSaved')
              .pipe(takeUntilDestroyed(this.destroy))
              .subscribe((message: string) => {
                this.alertService.showError(message);
              });
          },
          error: () => {
            this.translate
              .get('admin.productSaveError')
              .pipe(takeUntilDestroyed(this.destroy))
              .subscribe((message: string) => {
                this.alertService.showError(message);
              });
          },
        });
        }
    });
  }
  
  deleteProduct(productId: number) {
    const dialogRef = this.dialog.open(DeleteProductDialogComponent, {
      width: '400px',
      height: '200px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      this.productService.deleteProduct(productId)
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe({
        next: (data: any) => {
          this.translate
            .get('admin.productDeleted')
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe((message: string) => {
              this.alertService.showError(message);
            });
        },
        error: () => {
          this.translate
            .get('admin.productDeleteError')
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe((message: string) => {
              this.alertService.showError(message);
            });
        },
      });
      }
    });
  }
}
