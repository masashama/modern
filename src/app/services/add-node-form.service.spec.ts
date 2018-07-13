import { TestBed, inject } from '@angular/core/testing';

import { AddNodeFormService } from './add-node-form.service';

describe('AddNodeFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddNodeFormService]
    });
  });

  it('should be created', inject([AddNodeFormService], (service: AddNodeFormService) => {
    expect(service).toBeTruthy();
  }));
});
