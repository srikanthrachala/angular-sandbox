import { Component, OnInit } from '@angular/core';

import { ProductDTO } from './product';

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

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: ProductDTO[] = [];
  products: ProductDTO[] = [
    {
      "productId": 1,
      "productName": "Leaf Rake",
      "productCode": "GDN-0011",
      "releaseDate": "March 19, 2019",
      "description": "Leaf rake with 48-inch wooden handle.",
      "price": 19.95,
      "starRating": 3.2,
      "imageUrl": "https://cdn.jsdelivr.net/gh/srikanthrachala/angular-sandbox@master/src/assets/images/leaf_rake.png"
    },
    {
      "productId": 2,
      "productName": "Garden Cart",
      "productCode": "GDN-0023",
      "releaseDate": "March 18, 2019",
      "description": "15 gallon capacity rolling garden cart",
      "price": 32.99,
      "starRating": 4.2,
      "imageUrl": "https://cdn.jsdelivr.net/gh/srikanthrachala/angular-sandbox@master/src/assets/images/garden_cart.png"
    }];

  constructor() { 
    this.filteredProducts = this.products;
    this.listFilter='cart';

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
  }
}
