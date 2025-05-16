import { Component, inject, OnInit } from '@angular/core';
import { Student } from 'src/app/shared/interfaces/student';
import { StudentService } from 'src/app/shared/services/student.service';
import { NavbarBeforeLoginComponent } from "../navbar-before-login/navbar-before-login.component";
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../footer/footer.component";
import { UserService } from 'src/app/shared/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from 'src/app/shared/components/student-dialog/student-dialog.component';
import { StudentFormDialogComponent } from 'src/app/shared/components/student-form-dialog/student-form-dialog.component';

@Component({
  selector: 'app-students',
  imports: [NavbarBeforeLoginComponent, FormsModule, FooterComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {

  userService = inject(UserService)
  user = this.userService.user$

  


  studentName : string = '' 
  selectedStudent: Student | null = null;

  studentService = inject(StudentService)
  studentData : Student[]  = []
  studentEmail : string = ''

  ngOnInit():void{
    this.getAllStudents()
  }

  getAllStudents(){
    this.studentService.getAllStudents().subscribe((data)=>{
      this.studentData = data.data
      
    })
  }

    deleteStudent() {
      if (this.selectedStudent) {
      const confirmation = window.confirm(`Είσαι σίγουρος ότι θέλεις να διαγράψεις τον μαθητή ${this.selectedStudent.firstname} ${this.selectedStudent.lastname};`);
      
      if (!confirmation) {
        return; 
      }

      this.studentService.deleteOneStudent(this.selectedStudent.email).subscribe((data) => {
        console.log("Student Deleted:", data);
        this.getAllStudents(); 
        this.selectedStudent = null; 
      });
    }
  }

  constructor(private dialog: MatDialog) {}

  // update student dialog
  updateStudent(){
    if (this.selectedStudent) {
    const dialogRef = this.dialog.open(StudentDialogComponent, {
      width: '400px',
      data: { ...this.selectedStudent }
    });

    dialogRef.afterClosed().subscribe(updatedStudent => {
      if (updatedStudent) {
        this.studentService.updateStudent(updatedStudent).subscribe(() => {
          this.getAllStudents(); 
        });
      }
    });
  }
  }

  // create student Dialog
  addStudent() {
  const dialogRef = this.dialog.open(StudentFormDialogComponent, {
    width: '400px'
  });

  dialogRef.afterClosed().subscribe(newStudent => {
    if (newStudent) {
      this.studentService.createStudent(newStudent).subscribe(() => {
        this.getAllStudents(); // Ενημέρωση λίστας
      });
    }
  });
}


  onInput() {
    if (!this.studentName.trim()) {
      this.selectedStudent = null;
      return;
    }

    this.studentService.getOneStudent(this.studentName).subscribe((res) => {
      this.selectedStudent = res.data;
      console.log(this.selectedStudent)
    });
  }

  // sort student
  sortColumn: keyof Student | null = null; 
  sortDirection: 'asc' | 'desc' = 'asc';

  
  sortStudents(column: keyof Student) {
  if (this.sortColumn === column) {
   
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    
    this.sortColumn = column;
    this.sortDirection = 'asc';
  }

  this.studentData.sort((a, b) => {
    const valueA = a[column]!;
    const valueB = b[column]!;

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return this.sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    } else {
      return this.sortDirection === 'asc' ? (valueA as number) - (valueB as number) : (valueB as number) - (valueA as number);
    }
  });
}


  

}
