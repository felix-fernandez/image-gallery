import { async, ComponentFixture, TestBed, tick, fakeAsync, flush, discardPeriodicTasks } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

import { ImagesGalleryPage } from './images-gallery.page';
import { ImagesService } from '../services/images.service';

describe('ImagesGalleryPage', () => {
  let component: ImagesGalleryPage;
  let fixture: ComponentFixture<ImagesGalleryPage>;

  const mockList = [
    { id: 1, photo: 'photo1', text: 'text1' },
    { id: 2, photo: 'photo1', text: 'text1' },
    { id: 3, photo: 'photo1', text: 'text1' },
  ];
  beforeEach(async(() => {

    const ImagesServiceStub = {
      getList: () => of(mockList),
      filterList: () => []
    };
    TestBed.configureTestingModule({
      declarations: [ ImagesGalleryPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ImagesService, useValue: ImagesServiceStub },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ImagesGalleryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get list', (() => {
    component.currentList = [];
    component.dataList = Array(10);

    const ImagesServiceStub: ImagesService = fixture.debugElement.injector.get(
      ImagesService
    );

    spyOn(ImagesServiceStub, 'getList').and.callThrough();
    component.ngOnInit();
    expect(ImagesServiceStub.getList).toHaveBeenCalled();
    expect(component.dataList.length).toEqual(3);
  }));

  it('should stop loading data when all items are shown', () => {
    component.currentList = Array(20);
    component.dataList = Array(20);
    const event = { target: { value: 42, disabled: false }};

    component.loadData(event);

    expect(event.target.disabled).toBeTruthy();
  });

  it('should make expected calls', (() => {
    component.currentList = [];
    component.dataList = Array(10);

    const ImagesServiceStub: ImagesService = fixture.debugElement.injector.get(
      ImagesService
    );
    const event = { target: { value: '11' }};
    spyOn(ImagesServiceStub, 'filterList').and.callThrough();
    component.searchChanged(event);
    expect(ImagesServiceStub.filterList).toHaveBeenCalled();
  }));

  it('should load data when scrolling', fakeAsync(() => {
    component.numberToShow = 2;
    component.currentList = [];
    component.dataList = [
      { id: 1, photo: 'photo1', text: 'text1' },
      { id: 2, photo: 'photo1', text: 'text1' },
      { id: 3, photo: 'photo1', text: 'text1' },
    ];
    const event = { target: { value: 42, disabled: false, complete: () => {} }};

    component.loadData(event);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      tick(600);
      expect(component.currentList.length).toEqual(component.numberToShow);
    });

  }));

});
