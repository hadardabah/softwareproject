import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsboardTablePage } from './eventsboard-table.page';

describe('EventsboardTablePage', () => {
  let component: EventsboardTablePage;
  let fixture: ComponentFixture<EventsboardTablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsboardTablePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsboardTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
