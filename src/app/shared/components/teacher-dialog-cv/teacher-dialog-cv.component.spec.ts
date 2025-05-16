import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDialogCvComponent } from './teacher-dialog-cv.component';

describe('TeacherDialogCvComponent', () => {
  let component: TeacherDialogCvComponent;
  let fixture: ComponentFixture<TeacherDialogCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherDialogCvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherDialogCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
