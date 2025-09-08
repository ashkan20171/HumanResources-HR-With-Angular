import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterHourseComponent } from './register-hourse.component';

describe('RegisterHourseComponent', () => {
  let component: RegisterHourseComponent;
  let fixture: ComponentFixture<RegisterHourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterHourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterHourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});