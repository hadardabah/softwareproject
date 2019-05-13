import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsboardPage } from './eventsboard.page';

describe('EventsboardPage', () => {
  let component: EventsboardPage;
  let fixture: ComponentFixture<EventsboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
