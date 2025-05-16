import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCreateDialogComponent } from './teacher-create-dialog.component';

describe('TeacherCreateDialogComponent', () => {
  let component: TeacherCreateDialogComponent;
  let fixture: ComponentFixture<TeacherCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherCreateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
