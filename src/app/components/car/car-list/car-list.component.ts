import {Component, Input, OnInit} from '@angular/core';
import {ICar} from "../../../interfaces/car.interface";
import {CarService} from "../../../services/car.service";

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Array<ICar> = [];
  brands: Array<string> = [];

  constructor(carService: CarService) {
    carService.getVehicleList().subscribe(cars => {
      this.cars = cars
      this.brands = this.getBrandsCount(cars);
    });
  }

  ngOnInit(): void {
  }

  private getBrandsCount(cars: ICar[]): Array<string> {
    let finalBrands: Array<string> = [];
    const brands = cars.map(car => car.marca);
    const uniqueBrands = [...new Set(brands)];
    uniqueBrands.forEach(brand => {
      finalBrands.push(`Total ${brand}: ${brands.filter(b => b === brand).length}`);
    });
    return finalBrands;
  }
}
