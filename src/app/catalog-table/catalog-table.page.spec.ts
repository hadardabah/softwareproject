import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogTablePage } from './catalog-table.page';

describe('CatalogTablePage', () => {
  let component: CatalogTablePage;
  let fixture: ComponentFixture<CatalogTablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogTablePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
