import { TestBed } from '@angular/core/testing';

import { OpenWeathermapApiService } from './open-weathermap-api.service';

describe('OpenWeathermapApiService', () => {
  let service: OpenWeathermapApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenWeathermapApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
