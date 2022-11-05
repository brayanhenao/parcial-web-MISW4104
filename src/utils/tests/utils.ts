import {ICar} from "../../app/interfaces/car.interface";
import {faker} from "@faker-js/faker";

export function getFakeCars(numberOfCars: number): Array<ICar> {
  let cars: Array<ICar> = [];
  for (let i = 0; i < numberOfCars; i++) {
    cars.push(getFakeCar());
  }
  return cars;
}

export function getFakeCar(): ICar {
  return {
    id: faker.datatype.number(),
    marca: faker.vehicle.manufacturer(),
    linea: faker.vehicle.model(),
    modelo: faker.date.between('2000-01-01', '2021-01-01').getFullYear().toString(),
  }
}
