import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUser } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }

  private server = 'http://localhost:3000/app/home'

  login() {

  }

  newUser(param: NewUser) {
    return this.http.post(this.server, param)
  }

}
