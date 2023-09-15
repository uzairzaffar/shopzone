import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DeleteProductDialogComponent } from './delete-product-dialog/delete-product-dialog.component';
import { ProductSaveDialogComponent } from './product-save-dialog/product-save-dialog.component';

@NgModule({
  declarations: [
    AdminComponent,
    DeleteProductDialogComponent,
    ProductSaveDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TranslateModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    AdminRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [
  ],
})
export class AdminModule {}
