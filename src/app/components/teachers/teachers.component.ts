import { Component,inject } from '@angular/core';
import { NavbarBeforeLoginComponent } from "../navbar-before-login/navbar-before-login.component";
import { FooterComponent } from "../footer/footer.component";
import { TeacherService } from 'src/app/shared/services/teacher.service';
import { Subject, Teacher } from 'src/app/shared/interfaces/teacher';
import { MatDialog } from '@angular/material/dialog';
import { TeacherDialogCvComponent } from 'src/app/shared/components/teacher-dialog-cv/teacher-dialog-cv.component';

@Component({
  selector: 'app-teachers',
  imports: [NavbarBeforeLoginComponent, FooterComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent {

  teacherService = inject(TeacherService)
  teacherData : Teacher[] = []
  dialog = inject(MatDialog)


  ngOnInit():void{
    this.getAllTeachers()
  }

  getAllTeachers(){
    this.teacherService.getAllTeachers().subscribe((data)=>{
      this.teacherData = data.data
      console.log(this.teacherData)
    })
  }

  getSubjectsAsString(subjects: Subject[] | undefined): string {
  return subjects && subjects.length > 0 ? subjects.map(s => s.subjectName).join(', ') : 'Δεν υπάρχουν μαθήματα';

  }

  openDialog(teacher: Teacher): void {
    this.dialog.open(TeacherDialogCvComponent, {
      width: '400px',
      data: teacher,
    });
  }

}
