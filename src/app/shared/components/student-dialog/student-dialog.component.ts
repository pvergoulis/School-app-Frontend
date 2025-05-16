import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/shared/interfaces/student';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-dialog',
  imports: [FormsModule],
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.css'
})
export class StudentDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public student: Student
  ) {}

  save() {
    this.dialogRef.close(this.student); 
  }

  cancel() {
    this.dialogRef.close(); 
  }


}


