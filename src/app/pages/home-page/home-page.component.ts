import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/auth.service";
import {ProductsService} from "./products.service";
import {Observable} from "rxjs";
import {ProductI} from "../../core/interfaces/products.interface";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [ProductsService],
})
export class HomePageComponent implements OnInit {
  public products$: Observable<ProductI[]>;
  private limit = 3;

  constructor(private productsService: ProductsService, private authService: AuthService) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.limit += 3;
    this.products$ = this.productsService.getProducts(this.limit) as Observable<ProductI[]>;
  }

  onScroll() {
    this.getProducts();
  }

  logout(): void {
    this.authService.logout();
  }
}
