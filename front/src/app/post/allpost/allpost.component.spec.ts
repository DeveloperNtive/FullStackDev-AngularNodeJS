import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllpostComponent } from './allpost.component';

describe('AllpostComponent', () => {
  let component: AllpostComponent;
  let fixture: ComponentFixture<AllpostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllpostComponent]
    });
    fixture = TestBed.createComponent(AllpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
