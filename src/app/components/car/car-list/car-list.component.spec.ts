import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CarListComponent} from './car-list.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CarService} from "../../../services/car.service";
import {DebugElement} from "@angular/core";
import {getFakeCars} from "../../../../utils/tests/utils";
import {Observable} from "rxjs";
import {By} from "@angular/platform-browser";
import {ICar} from "../../../interfaces/car.interface";

describe('CarListComponent', () => {
  let component: CarListComponent;
  let fixture: ComponentFixture<CarListComponent>;
  let carService: CarService;
  let debug: DebugElement;
  let fakeCars: Array<ICar>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CarListComponent],
      providers: [CarService]
    })
      .compileComponents();

    fakeCars = getFakeCars(3);

    carService = TestBed.inject(CarService);
    spyOn(carService, 'getVehicleList').and.returnValue(new Observable(subscriber => {
      subscriber.next(fakeCars);
    }));

    fixture = TestBed.createComponent(CarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  describe('when creating the component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have 3 cars', () => {
      expect(component.cars.length).toEqual(3);
    })

    // Verify that the table is rendered and that it has 4 rows (the header and the 3 cars)
    it('should have a table with 4 rows', () => {
      expect(debug.query(By.css('table'))).toBeTruthy();
      expect(debug.queryAll(By.css('table tr')).length).toEqual(4);
    })

    // Verify that the table has the correct headers
    it('should have a table with the correct headers', () => {
      expect(debug.query(By.css('table'))).toBeTruthy();
      expect(debug.queryAll(By.css('table th'))[0].nativeElement.textContent).toEqual('#');
      expect(debug.queryAll(By.css('table th'))[1].nativeElement.textContent).toEqual('Marca');
      expect(debug.queryAll(By.css('table th'))[2].nativeElement.textContent).toEqual('Línea');
      expect(debug.queryAll(By.css('table th'))[3].nativeElement.textContent).toEqual('Modelo');
    })

    // Verify that the table has the correct data
    it('should have a table with the correct data', () => {
      expect(debug.query(By.css('table'))).toBeTruthy();
      expect(debug.queryAll(By.css('table td'))[0].nativeElement.textContent).toEqual(component.cars[0].id.toString());
      expect(debug.queryAll(By.css('table td'))[1].nativeElement.textContent).toEqual(component.cars[0].marca);
      expect(debug.queryAll(By.css('table td'))[2].nativeElement.textContent).toEqual(component.cars[0].linea);
      expect(debug.queryAll(By.css('table td'))[3].nativeElement.textContent).toEqual(component.cars[0].modelo);

      expect(debug.queryAll(By.css('table td'))[4].nativeElement.textContent).toEqual(component.cars[1].id.toString());
      expect(debug.queryAll(By.css('table td'))[5].nativeElement.textContent).toEqual(component.cars[1].marca);
      expect(debug.queryAll(By.css('table td'))[6].nativeElement.textContent).toEqual(component.cars[1].linea);
      expect(debug.queryAll(By.css('table td'))[7].nativeElement.textContent).toEqual(component.cars[1].modelo);

      expect(debug.queryAll(By.css('table td'))[8].nativeElement.textContent).toEqual(component.cars[2].id.toString());
      expect(debug.queryAll(By.css('table td'))[9].nativeElement.textContent).toEqual(component.cars[2].marca);
      expect(debug.queryAll(By.css('table td'))[10].nativeElement.textContent).toEqual(component.cars[2].linea);
      expect(debug.queryAll(By.css('table td'))[11].nativeElement.textContent).toEqual(component.cars[2].modelo);
    })
  })
});
