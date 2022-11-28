import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamStartComponent } from './team-start.component';

describe('TeamStartComponent', () => {
  let component: TeamStartComponent;
  let fixture: ComponentFixture<TeamStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamStartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
