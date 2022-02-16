import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnagramFinderComponent } from './anagram-finder.component';

describe('AnagramFinderComponent', () => {
  let component: AnagramFinderComponent;
  let fixture: ComponentFixture<AnagramFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnagramFinderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnagramFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
