import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbookbycategoryComponent } from './viewbookbycategory.component';

describe('ViewbookbycategoryComponent', () => {
  let component: ViewbookbycategoryComponent;
  let fixture: ComponentFixture<ViewbookbycategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewbookbycategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewbookbycategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
