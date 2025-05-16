import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Student } from 'src/app/shared/interfaces/student';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-form-dialog',
  imports: [FormsModule],
  templateUrl: './student-form-dialog.component.html',
  styleUrl: './student-form-dialog.component.css'
})
export class StudentFormDialogComponent {
  student: Student = {
    firstname: '',
    lastname: '',
    email: '',
    phone: 0,
    age: undefined,
    subjects: []
  };

  constructor(private dialogRef: MatDialogRef<StudentFormDialogComponent>) {}

  save() {
    this.dialogRef.close(this.student); 
  }

  cancel() {
    this.dialogRef.close(); 
  }
}
