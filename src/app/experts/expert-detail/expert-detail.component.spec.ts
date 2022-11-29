import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertDetailComponent } from './expert-detail.component';

describe('ExpertDetailComponent', () => {
  let component: ExpertDetailComponent;
  let fixture: ComponentFixture<ExpertDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
