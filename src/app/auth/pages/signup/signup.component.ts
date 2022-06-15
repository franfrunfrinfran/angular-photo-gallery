import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  usuario: Usuario = {
    username: "",
    password: "",
    email: ""
  }
  passRep: string = "";

  usuarioValidoExiste: boolean = true;
  usuarioValidoLongitud: boolean = true;
  passValida: boolean = true;
  passRepValida: boolean = true;
  emailValido: boolean = true;
  registroValido: boolean = true;

  get passIgual(): boolean {
    if(this.passRep.length == 0){
      return true;
    }

    return this.usuario.password == this.passRep;
  }
  

  constructor(private authService: AuthService,
              private router: Router) { }




  registrar(): void {
    console.log("registrar")
    this.usuarioValidoExiste = true;
    if(this.validarCampos())
    {
      console.log("Registrando")
      
      this.authService.signup(this.usuario)
        .pipe(
          finalize(() => {
            if(this.registroValido){
              this.router.navigate(['/main'])
            }
          })
        )
        .subscribe({
          next: (resp) => {
            if(resp.user._id) {
              this.registroValido = true;
              console.log("Registrado!!")
            }
          },
          error: (err) => {
            this.registroValido = false;
            console.log(err);
            if(err.status == 409) {
              this.usuarioValidoExiste = false;
            }
          }
        })
        // .subscribe(
        //   (resp) => {
        //     if(resp.id) {
        //       this.registroValido = true;
        //       console.log("Registrado!!")
        //     }
        //   }, (err) => {
        //     this.registroValido = false;
        //     console.log(err);
        //     if(err.status == 409) {
        //       this.usuarioValidoExiste = false;
        //     }
        //   }
        // ) 
    }
  }

  validarCampos(): boolean {
    
    let valEmail = this.validarEmail();
    let valPass = this.validarPass();
    let valUsuario = this.validarUsuario();
    return valEmail && valPass && valUsuario;
  }

  validarEmail(): boolean {
    const emailRegex = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\.[a-z]{2,3}";

    if (this.usuario.email.match(emailRegex)){
      this.emailValido = true;
      return true;
    }
    this.emailValido = false;
    return false;
  }

  validarPass(): boolean {
    if(this.usuario.password.length < 2){
      this.passValida = false;
      return false;
    }
    this.passValida = true;
      return true;
  }

  validarUsuario(): boolean {
    if(this.usuario.username.length < 2) {
      this.usuarioValidoLongitud = false;
      this.usuarioValidoExiste = true;
      return false;
    }
    
    // this.authService.existeUsuario(this.usuario.username)
    //   .subscribe(existis => {
    //     if(existis){
    //       console.log("dentro de existe")
    //       this.usuarioValidoLongitud = true;
    //       this.usuarioValidoExiste = false;
    //       return false;
    //     }
    //     else {
    //       this.usuarioValidoLongitud = true;
    //       this.usuarioValidoExiste = true;
    //       return true;
    //     }
    //   })
    
    return true;
  }

}
