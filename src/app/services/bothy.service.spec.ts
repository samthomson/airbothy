/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BothyService } from './bothy.service';

describe('BothyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BothyService]
    });
  });

  it('should ...', inject([BothyService], (service: BothyService) => {
    expect(service).toBeTruthy();
  }));
});
