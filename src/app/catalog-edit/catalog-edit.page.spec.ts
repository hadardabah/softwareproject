import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogEditPage } from './catalog-edit.page';

describe('CatalogEditPage', () => {
  let component: CatalogEditPage;
  let fixture: ComponentFixture<CatalogEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
