import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyFill } from './survey-fill';

describe('SurveyFill', () => {
  let component: SurveyFill;
  let fixture: ComponentFixture<SurveyFill>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyFill]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyFill);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
