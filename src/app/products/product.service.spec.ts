import { TestBed, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { ProductDTO } from './product';

describe('PrductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    // inject the service
    service = TestBed.get(ProductService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the data successful', () => {

    const mockProduct : ProductDTO = {
      "productId": 1,
      "productName": "Samsung Galaxy Note 10+",
      "productCode": "SGN-11",
      "releaseDate": "March 19, 2019",
      "description": "Galaxy Note 10 shoots 4K videos, beautiful portraits, and sweeping landscapes with the all-new dual-camera system. Capture your best low-light photos with Night mode",
      "price": 1099.99,
      "starRating": 4.2,
      "imageUrl": "https://cdn.jsdelivr.net/gh/srikanthrachala/angular-sandbox@master/src/assets/images/note10.jpg"
    };

    service.getProduct(1).subscribe((data: ProductDTO) => {
      expect(data).toBe(mockProduct);
      expect(data.productId).toBe(1);
      expect(data.productName).toBe('Samsung Galaxy Note 10+');

    });

    const req = httpMock.expectOne('assets/products/products.json', 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush(mockProduct);

  });

});

