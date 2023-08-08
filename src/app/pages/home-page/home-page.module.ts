import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomePageComponent} from "./home-page.component";
import {SharedModule} from "../../shared/shared.module";
import {HomePageRoutingModule} from "./home-page-routing.module";
import { HomeComponent } from './home/home.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";



@NgModule({
  declarations: [HomePageComponent, HomeComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    SharedModule,
    InfiniteScrollModule,
  ]
})
export class HomePageModule { }
