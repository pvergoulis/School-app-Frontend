import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { adminUser } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';

const API_URL = `${environment.apiURL}/api/users`;
@Injectable({
  providedIn: 'root',
})
export class AdminUserService {
  http = inject(HttpClient);

  getAllUser() {
    return this.http.get<{ status: boolean; data: adminUser[] }>(`${API_URL}`, {
      headers: {
        Accept: 'application/json',
      },
    });
  }

  getOneUser(userUsernameName: string) {
    return this.http.get<{ status: boolean; data: adminUser | null }>(
      `${API_URL}/${userUsernameName}`,
      {
        headers: {
          accept: 'application/json',
        },
      }
    );
  }

  deleteOneUser(username: string) {
    return this.http.delete<{ status: boolean }>(
      `${API_URL}/delete/${username}`,
      {
        headers: { Accept: 'application/json' },
      }
    );
  }

  updateUser(user: adminUser) {
    return this.http.patch<{ status: boolean }>(
      `${API_URL}/update/${user.username}`,
      user,
      {
        headers: { Accept: 'application/json' },
      }
    );
  }


  createUser(user: adminUser) {
      return this.http.post<{ status: boolean }>(`${API_URL}/create`, user, {
          headers: { Accept: 'application/json' }
      });
  } 

}
