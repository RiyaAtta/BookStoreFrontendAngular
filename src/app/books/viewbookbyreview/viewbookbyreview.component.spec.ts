import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbookbyreviewComponent } from './viewbookbyreview.component';

describe('ViewbookbyreviewComponent', () => {
  let component: ViewbookbyreviewComponent;
  let fixture: ComponentFixture<ViewbookbyreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewbookbyreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewbookbyreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
