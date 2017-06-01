import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapEventsComponent } from './map-events.component';

describe('MapEventsComponent', () => {
  let component: MapEventsComponent;
  let fixture: ComponentFixture<MapEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
