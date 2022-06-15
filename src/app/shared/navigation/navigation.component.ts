import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  
  constructor(private authService: AuthService,
              private route: Router) { }

  logout(){
    this.authService.logout();
    this.route.navigate([""])
  }

  isLogin(): boolean {
    return this.authService.isLogin();
  }

  routerTo(): string {
    if(this.isLogin()) {
      return "/main"
    } else {
      return "/"
    }
  }

}
