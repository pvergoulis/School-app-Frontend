import { Component,inject, OnInit } from '@angular/core';
import { NavbarBeforeLoginComponent } from "../navbar-before-login/navbar-before-login.component";
import { SideBarComponent } from "../side-bar/side-bar.component";
import { AdminUserService } from 'src/app/shared/services/admin-user.service';
import { adminUser } from 'src/app/shared/interfaces/user';
import { FormsModule } from '@angular/forms';
import { UserEditDialogComponent } from 'src/app/shared/components/user-edit-dialog/user-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FooterComponent } from "../footer/footer.component";
import { UserCreateDialogComponent } from 'src/app/shared/components/user-create-dialog/user-create-dialog.component';
@Component({
  selector: 'app-admin-users',
  imports: [NavbarBeforeLoginComponent, SideBarComponent, FormsModule, FooterComponent],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {
  adminUserService= inject(AdminUserService)
  userData : adminUser[] = []

  dialog = inject(MatDialog);

  userUsername: string = ''
  selectedUser: adminUser | null = null

  ngOnInit(){
    this.getAllUsers()
  }

  getAllUsers(){
    this.adminUserService.getAllUser().subscribe((data)=>{
      console.log(data)
      this.userData = data.data
    })
  }

  onInput(){
    if(!this.userUsername.trim()){
      this.selectedUser = null
      return
    }

    this.adminUserService.getOneUser(this.userUsername).subscribe((data)=>{
      this.selectedUser = data.data
      console.log(this.selectedUser)
    })
  }

  deleteUser(username: string) {
    const confirmDelete = window.confirm(`Είσαι σίγουρος ότι θέλεις να διαγράψεις τον χρήστη ${username};`);
    
    if (confirmDelete) {
        this.adminUserService.deleteOneUser(username).subscribe(() => {
            alert('Ο χρήστης διαγράφηκε επιτυχώς!');
            this.getAllUsers(); 
        }, (error) => {
            console.error('Σφάλμα στη διαγραφή χρήστη:', error);
            alert('Πρόβλημα στη διαγραφή του χρήστη.');
        });
    }
  }

  openEditDialog(user: adminUser): void {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      width: '400px',
      data: { ...user } 
    });

    dialogRef.afterClosed().subscribe(updatedUser => {
      if (updatedUser) {
        this.updateUser(updatedUser);
      }
    });
  }

    updateUser(updatedUser: adminUser) {
    this.adminUserService.updateUser(updatedUser).subscribe(() => {
      alert('Ο χρήστης ενημερώθηκε επιτυχώς!');
      this.getAllUsers(); 
    }, error => {
      console.error('Σφάλμα στην ενημέρωση χρήστη:', error);
      alert('Πρόβλημα στην ενημέρωση του χρήστη.');
    });
  }
  


  openCreateDialog(): void {
    const dialogRef = this.dialog.open(UserCreateDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(newUser => {
      if (newUser) {
        this.createUser(newUser);
      }
    });
  }

  createUser(newUser: adminUser) {
    this.adminUserService.createUser(newUser).subscribe(() => {
      alert('Ο χρήστης δημιουργήθηκε επιτυχώς!');
      this.getAllUsers();
    }, error => {
      console.error('Σφάλμα στη δημιουργία χρήστη:', error);
      alert('Πρόβλημα στη δημιουργία του χρήστη.');
    });
  }

}
