import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  usuario: string = "";
  pass: string = "";
  
  constructor(private authService: AuthService, private router: Router) { }

  login() {
    let loginCorrecto = false;
    this.authService.login(this.usuario, this.pass)
      .pipe(
        finalize(() => {
          if(loginCorrecto) {
            this.router.navigate(['/main'])
          }
        })
      )
      .subscribe({
        next: (resp) => {
          loginCorrecto = true;
        },
        error: (error) => {
          loginCorrecto = false;
        }
      });
  }

}
