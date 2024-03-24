import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  addUser(user: User) {
    let users: any[] = [];
    const usersString = localStorage.getItem('Users');
    if (usersString) {
      users = JSON.parse(usersString);
      users = [...users, user];

    } else {
      users = [user];
    }

    localStorage.setItem('Users', JSON.stringify(users));
  }
}
