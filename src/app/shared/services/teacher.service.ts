import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Teacher } from '../interfaces/teacher';

const API_URL_TEACHER = `${environment.apiURL}/api/teachers`

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  http = inject(HttpClient)

  getAllTeachers(){
    return this.http.get<{status: boolean, data : Teacher[]}>(API_URL_TEACHER, {
      headers: {
        Accept : "application/json"
      }
    })
  }

  getOneTeacher(teacherFirstname : string){
    return this.http.get<{status: boolean, data: Teacher}>(`${API_URL_TEACHER}/firstname/${teacherFirstname}`,{
      headers: {
        Accept : 'application/json'
      }
    })
  }
 

  deleteOneTeacher(vat: string) {
    return this.http.delete<{ status: boolean }>(`${API_URL_TEACHER}/delete/vat/${vat}`, {
      headers: { Accept: 'application/json' }
    });
  }


  updateTeacher(teacher: Teacher) {
    return this.http.patch<{ status: boolean }>(`${API_URL_TEACHER}/update/${teacher.vat}`, teacher, {
      headers: { Accept: 'application/json' }
    });
  }


  createTeacher(teacher: Teacher) {
    return this.http.post<{ status: boolean }>(`${API_URL_TEACHER}/create`, teacher, {
        headers: { Accept: 'application/json' }
    });
  }
}
