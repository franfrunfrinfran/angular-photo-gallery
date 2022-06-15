import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // return this.authService.verificarAutenticacion()
    //   .pipe(
    //     tap(estadoAutenticacion => {
    //       if(!estadoAutenticacion) {
    //         this.router.navigate(["./auth/login"])
    //       }
    //     })
    //   )
    console.log("VERIFICATRIOOOOOOOOOON")
    let verification = false;
    this.authService.verificarAutenticacion()
      .subscribe({
        next: (res) => {
          verification = res
          console.log(res)
        },
        error: (err) => {
          verification =  false;
          console.log("Error while verification: " + err)
          this.authService.logout();
          this.router.navigate(["./auth/login"]);
        }
      })

    if(!verification)
    {
      this.router.navigate(["./auth/login"])
    }
    
    return verification;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      // return this.authService.verificarAutenticacion()
      //   .pipe(
      //     tap(estaAutenticado => {
      //       if(!estaAutenticado) {
      //         this.router.navigate(["./auth/login"]);
      //       }
      //     })
      //   );
      console.log("VERIFICATRIOOOOOOOOOON")
      let verification = false;
      this.authService.verificarAutenticacion()
        .subscribe({
          next: (res) => verification = res,
          error: (err) => {
            verification =  false;
            console.log("Error while verification: " + err)
            this.authService.logout();
            this.router.navigate(["./auth/login"]);
          }
        })
  
        if(!verification)
        {
          this.router.navigate(["./auth/login"])
        }
        
      return verification;
  }
}
