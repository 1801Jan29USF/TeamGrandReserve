import { TestBed, inject } from '@angular/core/testing';

import { QuestionSocketService } from './question-socket.service';

describe('QuestionSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionSocketService]
    });
  });

  it('should be created', inject([QuestionSocketService], (service: QuestionSocketService) => {
    expect(service).toBeTruthy();
  }));
});
