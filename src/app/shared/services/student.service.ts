import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../interfaces/student';
import { environment } from 'src/environments/environment.development';

const API_URL_STUDENT = `${environment.apiURL}/api/students`

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }

  http = inject(HttpClient)

  getAllStudents(){
    return this.http.get<{status: boolean, data: Student[]}>(API_URL_STUDENT, {
      headers: {
        accept: "application/json"
      }
    })
  }

  getOneStudent(studentName : string){
    return this.http.get<{ status: boolean; data: Student | null }>(`${API_URL_STUDENT}/${studentName}`, {
      headers: {
        accept : 'application/json'
      }
    })
  }

  deleteOneStudent(studentEmail: string){
    return this.http.delete<{status: boolean; data: Student}>(`${API_URL_STUDENT}/delete/${studentEmail}`, {
      headers :{
        accept: 'application/json'
      }
    })
  }

  updateStudent(student: Student) {
  return this.http.patch<{ status: boolean; data: Student }>(`${API_URL_STUDENT}/update/${student.email}`, student, 
    {
      headers: {
        accept: 'application/json'
      }
    }
  );
}

createStudent(student: Student) {
  return this.http.post<{ status: boolean; data: Student }>(
    `${API_URL_STUDENT}/create`, student
  );
}

}
