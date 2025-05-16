import { Component,inject  } from '@angular/core';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { NavbarBeforeLoginComponent } from "../navbar-before-login/navbar-before-login.component";
import { TeacherService } from 'src/app/shared/services/teacher.service';
import { Subject, Teacher } from 'src/app/shared/interfaces/teacher';
import { TeacherDialogCvComponent } from 'src/app/shared/components/teacher-dialog-cv/teacher-dialog-cv.component';
import { MatDialog } from '@angular/material/dialog';
import { TeacherEditDialogComponent } from 'src/app/shared/components/teacher-edit-dialog/teacher-edit-dialog.component';
import { TeacherCreateDialogComponent } from 'src/app/shared/components/teacher-create-dialog/teacher-create-dialog.component';



@Component({
  selector: 'app-admin-teachers',
  imports: [SideBarComponent, FooterComponent, FormsModule, NavbarBeforeLoginComponent],
  templateUrl: './admin-teachers.component.html',
  styleUrl: './admin-teachers.component.css'
})
export class AdminTeachersComponent {
  teacherService = inject(TeacherService)
  teacherData :Teacher[] = []

  selectedTeacher : Teacher | null = null
  teacherFirstname : string =''


  dialog= inject(MatDialog)

  ngOnInit(){
    this.getAllTeachers()
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

  getAllTeachers(){
    this.teacherService.getAllTeachers().subscribe((data)=>{
      this.teacherData = data.data
    })
  }

  onInput(){
    if(!this.teacherFirstname.trim()){
      this.selectedTeacher = null
      return
    }

    this.teacherService.getOneTeacher(this.teacherFirstname).subscribe((data)=>{
      this.selectedTeacher = data.data
    })
  }


  deleteTeacher(vat : string){
    const confirmDelete = window.confirm(`Είσαι σίγουρος ότι θέλεις να διαγράψεις τον χρήστη με ΑΦΜ ${vat};`);

    if(confirmDelete){
      this.teacherService.deleteOneTeacher(vat).subscribe(()=>{
        alert('Ο καγηγητής διαγράφηκε επιτυχώς!')
        this.getAllTeachers()
      }, (error)=>{
        console.error('Σφάλμα στη διαγραφή του Καθηγητή:', error);
        alert('Πρόβλημα στη διαγραφή του Καθηγητή.');
      })
    }
  }



  openEditDialog(teacher: Teacher): void {
    const dialogRef = this.dialog.open(TeacherEditDialogComponent, {
      width: '400px',
      data: { ...teacher }
    });

    dialogRef.afterClosed().subscribe(updatedTeacher => {
      if (updatedTeacher) {
        this.updateTeacher(updatedTeacher);
      }
    });
  }

  updateTeacher(updatedTeacher: Teacher) {
    this.teacherService.updateTeacher(updatedTeacher).subscribe(() => {
      alert('Ο καθηγητής ενημερώθηκε επιτυχώς!');
      this.getAllTeachers();
    }, error => {
      console.error('Σφάλμα στην ενημέρωση καθηγητή:', error);
      alert('Πρόβλημα στην ενημέρωση του καθηγητή.');
    });
  }



  openCreateDialog(): void {
    const dialogRef = this.dialog.open(TeacherCreateDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(newTeacher => {
      if (newTeacher) {
        this.createTeacher(newTeacher);
      }
    });
  }

  createTeacher(newTeacher: Teacher) {
    this.teacherService.createTeacher(newTeacher).subscribe(() => {
      alert('Ο καθηγητής δημιουργήθηκε επιτυχώς!');
      this.getAllTeachers();
    }, error => {
      console.error('Σφάλμα στη δημιουργία καθηγητή:', error);
      alert('Πρόβλημα στη δημιουργία του καθηγητή.');
    });
  }


}
