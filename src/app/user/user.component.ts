import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ProductService } from '../service/product.service';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})

export class UserComponent implements OnInit {
  categories: string[] = [];
  products: any[] = [];
  isLoading = false;
  isLoadingCategories = true;
  currentPage = 1;
  itemsPerPage = 5;
  selectedCategory: string = '';
  minPriceFilter: number | null = null;
  maxPriceFilter: number | null = null;
  selectedSortOption: 'asc' | 'desc' = 'asc';
  private filterSubject = new Subject<string>();
  private readonly destroy: DestroyRef = inject(DestroyRef);

  constructor(
    private productService: ProductService,
    private translate: TranslateService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.filterSubject.pipe(debounceTime(500)).subscribe(() => {
      this.loadProductsByCategory(this.selectedCategory);
    });
  }

  loadCategories() {
    this.productService
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe({
        next: (categories) => {
          this.categories = categories;
          if (this.categories && this.categories.length > 0) {
            this.loadProductsByCategory(categories[0]);
          }
        },
        error: () => {
          this.translate
            .get('user.categoriesFetchError')
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe((message: string) => {
              this.alertService.showError(message);
            });
        },
      });
  }

  loadProductsByCategory(category: string) {
    this.selectedCategory = category;
    this.isLoading = true;
    this.currentPage = 1;
    this.productService
      .getProductsByCategory(category)
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe({
        complete: () => {
          this.isLoading = false;
        },
        next: (products) => {
          this.products = products;
          this.applyFilters();
          this.applySort();
        },
        error: () => {
          this.translate
            .get('user.productsFetchError')
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe((message: string) => {
              this.alertService.showError(message);
            });
        },
      });
  }

  onFilterChange() {
    this.filterSubject.next('');
  }

  onPageChange(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
    }
  }

  applyFilters() {
    if (this.selectedCategory) {
      this.products = this.products.filter(
        (product) => product.category === this.selectedCategory
      );
    }

    this.products = this.products.filter((product) => {
      if (this.minPriceFilter !== null && product.price < this.minPriceFilter) {
        return false;
      }
      if (this.maxPriceFilter !== null && product.price > this.maxPriceFilter) {
        return false;
      }
      return true;
    });
  }

  applySort() {
    if (this.selectedSortOption === 'asc') {
      this.products.sort((a, b) => a.price - b.price);
    } else {
      this.products.sort((a, b) => b.price - a.price);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.displayedProducts.length / this.itemsPerPage);
  }

  get displayedProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.products.slice(startIndex, endIndex);
  }
}
