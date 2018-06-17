import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class GuardAuthentificationService implements CanActivate {

  constructor(private authentification: AuthService, private router: Router) { }

  canActivate() {

    if (!this.authentification.isAuthenticated()) {  

      this.router.navigateByUrl('/');
      return false;
    }    

    return true;
  }

}