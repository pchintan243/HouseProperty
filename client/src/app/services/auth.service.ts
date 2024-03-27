import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }

    authUser(user: any) {
        let userList = [];
        if (localStorage.getItem('Users')) {
            userList = JSON.parse(localStorage.getItem('Users') as string);
        }
        return userList.find((p: any) => p.userName === user.userName && p.password === user.password);
    }
}
