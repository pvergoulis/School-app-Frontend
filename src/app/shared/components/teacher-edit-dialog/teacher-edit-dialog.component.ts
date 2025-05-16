import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Teacher } from '../../interfaces/teacher';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teacher-edit-dialog',
  imports: [FormsModule, MatDialogModule],
  templateUrl: './teacher-edit-dialog.component.html',
  styleUrl: './teacher-edit-dialog.component.css'
})
export class TeacherEditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TeacherEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public teacher: Teacher
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.teacher); 
  }
}
