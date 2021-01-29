import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { ImagesService } from './images.service';

describe('ImagesService', () => {
  let service: ImagesService;
  const mockList = [
    { id: 1, photo: 'photo1', text: 'text1' },
    { id: 2, photo: 'photo1', text: 'text2' },
    { id: 3, photo: 'photo1', text: 'text3' },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list', () => {
    service.filteredList = new BehaviorSubject(mockList);
    const observableList = service.getList();
    observableList.subscribe(data => {
      expect(data).toEqual(mockList);
    });
  });

  it('should filter list', () => {
    service.list = mockList;
    service.filteredList = new BehaviorSubject([]);
    service.filterList('text1');

    service.filteredList.subscribe(data => {
      expect(data.length).toEqual(1);
    });
  });

});
