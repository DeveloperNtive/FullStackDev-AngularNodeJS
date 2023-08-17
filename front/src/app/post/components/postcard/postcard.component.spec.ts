import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcardComponent } from './postcard.component';

describe('PostcardComponent', () => {
  let component: PostcardComponent;
  let fixture: ComponentFixture<PostcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostcardComponent]
    });
    fixture = TestBed.createComponent(PostcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
