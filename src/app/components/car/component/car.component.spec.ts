import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CarComponent} from './car.component';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('CarComponent', () => {
  let component: CarComponent;
  let fixture: ComponentFixture<CarComponent>;
  let debug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a <app-header> element', () => {
    expect(debug.query(By.css('app-header'))).toBeTruthy();
  });

  it('should have a <app-car-list> element', () => {
    expect(debug.query(By.css('app-car-list'))).toBeTruthy();
  });

  it('should have a <app-footer> element', () => {
    expect(debug.query(By.css('app-footer'))).toBeTruthy();
  });
});
