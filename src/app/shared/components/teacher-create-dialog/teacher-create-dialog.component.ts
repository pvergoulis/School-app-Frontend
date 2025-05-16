import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Teacher, Subject } from '../../interfaces/teacher';

@Component({
  selector: 'app-teacher-create-dialog',
  imports: [FormsModule, MatDialogModule],
  templateUrl: './teacher-create-dialog.component.html',
  styleUrl: './teacher-create-dialog.component.css'
})
export class TeacherCreateDialogComponent {
  newTeacher: Teacher = {
    firstname: '',
    lastname: '',
    vat: '',
    city: '',
    age: 0,
    cv: '',
    phone: undefined,
    email: undefined,
    subjects: []
  };

   subjectName: string = '';

  constructor(public dialogRef: MatDialogRef<TeacherCreateDialogComponent>) {}


  close(): void {
    this.dialogRef.close();
  }

  register(): void {
    this.dialogRef.close(this.newTeacher); 
  }

  addSubject(): void {
    if (this.subjectName.trim()) {
      this.newTeacher.subjects?.push({ subjectName: this.subjectName });
      this.subjectName = ''; 
    }
  }
}
