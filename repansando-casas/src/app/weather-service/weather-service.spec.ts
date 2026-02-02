import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherService } from './weather-service';

describe('WeatherService', () => {
  let component: WeatherService;
  let fixture: ComponentFixture<WeatherService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
