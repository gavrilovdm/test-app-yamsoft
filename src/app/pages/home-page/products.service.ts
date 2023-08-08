import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, EMPTY, map, Observable} from "rxjs";
import {ProductI} from "../../core/interfaces/products.interface";

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(limit: number): Observable<ProductI[] | Observable<never>> {
    return this.http.get(environment.apiUrl + `products?limit=${limit}`).pipe(
      map((data: ProductI[]) => data !== undefined ? data : EMPTY),
      catchError((err) => {
        alert(JSON.stringify(err.error));
        return EMPTY;
      })
    );
  }
}
