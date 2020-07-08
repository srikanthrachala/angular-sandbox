import { Component, OnInit } from '@angular/core';

import { ProductDTO } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: ProductDTO[] = [];
  products: ProductDTO[] = [];

  constructor(private productService: ProductService) { 
  }

  onRatingClicked(message: string): void {
    this.pageTitle = "Product List "+message;
  }


  performFilter(filterBy: string): ProductDTO[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: ProductDTO) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
      //this.products = this.productService.getProductsMock();
      this.productService.getProducts().subscribe({
        next: products => {
          this.products = products;
          this.filteredProducts = this.products;
          },
        error: err => this.errorMessage = err
      });
  }
}
