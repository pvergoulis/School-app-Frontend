import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Teacher } from '../../interfaces/teacher';

@Component({
  selector: 'app-teacher-dialog-cv',
  imports: [FormsModule],
  templateUrl: './teacher-dialog-cv.component.html',
  styleUrl: './teacher-dialog-cv.component.css'
})
export class TeacherDialogCvComponent {
  constructor(
    public dialogRef: MatDialogRef<TeacherDialogCvComponent>,
    @Inject(MAT_DIALOG_DATA) public teacher: Teacher
  ) {}

  close() {
    this.dialogRef.close();
  }
}
