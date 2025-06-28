/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { FuncsService } from './funcs.service';

describe('Service: Funcs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FuncsService]
    });
  });

  it('should ...', inject([FuncsService], (service: FuncsService) => {
    expect(service).toBeTruthy();
  }));
});
