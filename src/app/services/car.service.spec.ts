import {TestBed} from '@angular/core/testing';

import {CarService} from './car.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {getFakeCars} from "../../utils/tests/utils";
import {HttpErrorResponse} from "@angular/common/http";

describe('CarService', () => {
  let carService: CarService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CarService],
    });
    carService = TestBed.inject(CarService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(carService).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getCarList', () => {
    it('should test car list call', () => {
      const expectedCars = getFakeCars(3);

      carService.getVehicleList().subscribe((cars) => {
        expect(cars).toEqual(expectedCars);
      });

      const req = httpMock.expectOne(carService.baseCarUrl);
      expect(req.request.method).toBe('GET');
      req.flush(expectedCars);
    });

    it('should test get car by id call with an error', () => {
      const errorResponse = new HttpErrorResponse({
        error: '404 error',
        status: 404,
        statusText: 'Not Found'
      });

      carService.getVehicleList().subscribe({
        next: () => fail('expected an error, not cars'),
        error: (error) => {
          expect(error.message)
            .withContext('should return the 404 error')
            .toContain('404 Not Found');
        }
      });

      const req = httpMock.expectOne(carService.baseCarUrl);
      req.flush('404 error', errorResponse);
    });
  })
});
