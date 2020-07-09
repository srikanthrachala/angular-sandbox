import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";

import { ProductDTO } from "./product";

@Injectable({
  providedIn : 'root'
})
export class ProductService {
  
  private productUrl ='assets/products/products.json';

  constructor(private http : HttpClient) {}

  getProducts(): Observable<ProductDTO[]> {

    return this.http.get<ProductDTO[]>(this.productUrl).pipe(
                tap(data => console.log('All: '+JSON.stringify(data))),
                catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is : ${err.message}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }

  getProduct(id: number): Observable<ProductDTO | undefined> {
    return this.getProducts()
      .pipe(
        map((products: ProductDTO[]) => products.find(p => p.productId === id))
      );
  }
}
