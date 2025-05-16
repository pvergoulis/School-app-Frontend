import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { WeAreComponent } from './components/we-are/we-are.component';
import { StudentsComponent } from './components/students/students.component';
import { authGuardGuard } from './shared/guards/auth-guard.guard';
import { adminRoleGuard } from './shared/guards/admin-role.guard';
import { TeachersComponent } from './components/teachers/teachers.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminTeachersComponent } from './components/admin-teachers/admin-teachers.component';
import { NoPermisionComponent } from './components/no-permision/no-permision.component';

export const routes: Routes = [
    {path: 'welcome', component: WelcomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate :[ authGuardGuard]},
    {path: 'we-are', component: WeAreComponent, canActivate :[ authGuardGuard]},
    {path: 'students', component: StudentsComponent, canActivate :[ authGuardGuard]},
    {path: 'teachers', component: TeachersComponent, canActivate: [authGuardGuard]},
    {path: 'admin',component: AdminComponent, canActivate: [authGuardGuard, adminRoleGuard]},
    {path: 'admin-user', component: AdminUsersComponent, canActivate :[authGuardGuard , adminRoleGuard]},
    {path: 'admin-teachers', component: AdminTeachersComponent, canActivate: [authGuardGuard , adminRoleGuard]},
    {path: 'no-permision', component: NoPermisionComponent},
    {path: '', redirectTo:'/welcome',pathMatch:'full'}
];
