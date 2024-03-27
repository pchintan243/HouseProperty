import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private toast: ToastrService) { }

  addUser(user: User) {
    let users: any[] = [];
    const usersString = localStorage.getItem('Users');

    if (usersString) {
      users = JSON.parse(usersString);

      const isExist = users.find((u: User) => u.email === user.email);

      if (!isExist) {
        users = [...users, user];
        this.toast.success('User added successfully');
      } else {
        this.toast.error('Users already exist');
      }

    } else {
      users = [user];
    }
    localStorage.setItem('Users', JSON.stringify(users));
  }
}
