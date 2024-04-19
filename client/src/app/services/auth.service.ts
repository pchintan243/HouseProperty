import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForLogin, UserForRegister } from '../model/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    authUser(user: UserForLogin) {
        return this.http.post('https://localhost:1002/api/account/login', user);
    }

    registerUser(user: UserForRegister) {
        return this.http.post('https://localhost:1002/api/account/register', user);
    }
}
