import { effect, inject, Injectable, signal } from '@angular/core';
import { User,Credentials,LoggedInUser } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

const API_URL = `${environment.apiURL}/api/users`
const API_URL_AUTH = `${environment.apiURL}/api/auth`

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  http: HttpClient = inject(HttpClient)
  router = inject(Router)

  user$ = signal<LoggedInUser | null>(null)

  constructor(){
    const access_token = localStorage.getItem('access_token');
      if (access_token) {
        const decodedTokenSubject = jwtDecode(
          access_token,
        ) as unknown as LoggedInUser;
        this.user$.set({
          username: decodedTokenSubject.username,
          email: decodedTokenSubject.email,
          roles: decodedTokenSubject.roles,
        });
      }


    effect(() =>{
      if(this.user$()){
        console.log('User Logged IN', this.user$()?.username)
        console.log('User:', this.user$());
      } else {
        console.log('User Not Logged in')
      }
    })
  }

 

   registerUser(user : User){
    return this.http.post<{status: boolean, data: User}> (`${API_URL}/register`, user)
  }
  
  check_dublicate_email(email : string){
    return this.http.get<{status : boolean, data : User}> (`${API_URL}/check_duplicate_email/${email}`)
  }

  loginUser(credentials : Credentials){
    return this.http.post<{status: boolean, data : string}>(`${API_URL_AUTH}/login`, credentials)
  }

  check_dublicate_username(username : string){
    return this.http.get<{status: boolean, data: User}> (`${API_URL}/check_duplicate_username/${username}`)
  }

  logoutUser(){
    this.user$.set(null)
    localStorage.removeItem('access_token')
    this.router.navigate(['welcome'])
  }


  isTokenExpired(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) return true;

    try {
      const decoded = jwtDecode(token);
      const exp = decoded.exp;
      const now = Math.floor(Date.now() / 1000);
      if (exp) {
        return exp < now;
      } else {
        return true;
      }
    } catch (e) {
      return true;
    }
  }
 
}
