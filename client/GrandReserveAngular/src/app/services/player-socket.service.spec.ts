import { TestBed, inject } from '@angular/core/testing';

import { PlayerSocketService } from './player-socket.service';

describe('PlayerSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerSocketService]
    });
  });

  it('should be created', inject([PlayerSocketService], (service: PlayerSocketService) => {
    expect(service).toBeTruthy();
  }));
});
