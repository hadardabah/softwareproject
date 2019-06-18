import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsboardEditPage } from './eventsboard-edit.page';

describe('EventsboardEditPage', () => {
  let component: EventsboardEditPage;
  let fixture: ComponentFixture<EventsboardEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsboardEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsboardEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
