import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbookwithimageComponent } from './addbookwithimage.component';

describe('AddbookwithimageComponent', () => {
  let component: AddbookwithimageComponent;
  let fixture: ComponentFixture<AddbookwithimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddbookwithimageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbookwithimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
