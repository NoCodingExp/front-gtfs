import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class notGuardAuthentificationService implements CanActivate {

  constructor(private authentification: AuthService, private router: Router) { }

  canActivate() {

    if (this.authentification.isAuthenticated()) {  

      this.router.navigateByUrl('/dashboard');
      return false;
    }    

    return true;
  }

}