import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErropageComponent } from './erropage.component';

describe('ErropageComponent', () => {
  let component: ErropageComponent;
  let fixture: ComponentFixture<ErropageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErropageComponent]
    });
    fixture = TestBed.createComponent(ErropageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
