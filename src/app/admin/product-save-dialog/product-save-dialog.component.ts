import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-save-dialog',
  templateUrl: './product-save-dialog.component.html',
  styleUrls: ['./product-save-dialog.component.sass'],
})
export class ProductSaveDialogComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ProductSaveDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    if(this.data && this.data.product) {
      this.productForm.get('title')?.setValue(this.data.product.title);
      this.productForm.get('description')?.setValue(this.data.product.description);
      this.productForm.get('price')?.setValue(this.data.product.price);
    }
  }

  onSave() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      this.dialogRef.close(formData);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
