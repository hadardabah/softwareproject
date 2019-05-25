import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanPage } from './human.page';

describe('HumanPage', () => {
  let component: HumanPage;
  let fixture: ComponentFixture<HumanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
