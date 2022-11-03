import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CarRoutingModule} from './car-routing.module';
import {CarComponent} from './component/car.component';
import {CarListComponent} from './car-list/car-list.component';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";


@NgModule({
  declarations: [
    HeaderComponent,
    CarComponent,
    CarListComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    CarRoutingModule
  ]
})
export class CarModule {
}
