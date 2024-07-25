import { TestBed } from '@angular/core/testing';

import { ExampleHttpDatabase } from './stock.service';

describe('StockService', () => {
  let service: ExampleHttpDatabase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExampleHttpDatabase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
