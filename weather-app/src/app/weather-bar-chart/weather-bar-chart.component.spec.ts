import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherBarChartComponent } from './weather-bar-chart.component';

describe('WeatherBarChartComponent', () => {
  let component: WeatherBarChartComponent;
  let fixture: ComponentFixture<WeatherBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
