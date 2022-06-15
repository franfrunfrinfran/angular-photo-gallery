import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { Auth } from '../interfaces/auth.interface';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth: Auth | undefined;
  private baseURL: string = environment.baseURL;
  

  constructor(private http: HttpClient) { }

  verificarAutenticacion(): Observable<boolean> {
    if(!this._auth) {
      //console.log("No auth")
      if(!localStorage.getItem("id")){
        //console.log("aquiii")
        return of(false);
      }

      //console.log("Antes de llamara get")
      this.http.get<Auth>(`${this.baseURL}/auth/profile`)
        .pipe(
          map(auth => {
            console.log("AAAAYYYYYGGGG " + JSON.stringify(auth))
            this._auth = auth;
            return true
          })
        )

      return of(true);
    }

    return of(true)
  }

  isLogin(): boolean {
    if(!this._auth)
    {
      let autenticado = false;
      // this.verificarAutenticacion()
      //   .subscribe(resp => autenticado = resp)
      this.verificarAutenticacion()
        .subscribe({
          next: (res) => autenticado = res,
          error: (err) => {
            autenticado = false;
            this.logout();
          }
        })
      return autenticado;
    }
    return true;
  }

  // login(email: string, password: string): Observable<any> {
    
  //   return this.http.post<any>(`${this.baseURL}/auth/signin`, {email, password})
  //     .pipe(
  //       tap(auth => this._auth = auth),
  //       tap(auth => localStorage.setItem("id", auth._id)),
  //       tap(auth => {
  //         localStorage.setItem("id", auth._id)
  //       })
  //     )
  // }

  login(email: string, password: string): Observable<any> {

    return this.http.post<any>(`${this.baseURL}/auth/signin`, {email, password})
      .pipe(
        tap(auth => this._auth = auth.user),
        tap(auth => localStorage.setItem("id", auth.user._id)),
        tap(auth => localStorage.setItem("token", auth.authToken))
      )
  }

  signup(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/auth/signup`, usuario)
    .pipe(
      tap(auth => {this._auth = auth.user; console.log(auth)}),
      tap(auth => localStorage.setItem("id", auth.user._id)),
      tap(auth => localStorage.setItem("token", auth.authToken))
    );
  }

  logout() {
    this._auth = undefined;
    localStorage.removeItem("id");
    localStorage.removeItem("token");
  }

  existeUsuario(nombre: string): Observable<boolean> {
    console.log("asd")
    return of(true)
    //return this.http.get<boolean>(`${this.baseURL}/usuario/existis/${nombre}`);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
