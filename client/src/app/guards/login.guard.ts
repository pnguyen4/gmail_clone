import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

// too long, made alias
type GuardType = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): GuardType {
    if (this.auth.loggedIn()) {
      this.router.navigate(['/mail']);
      return false;
    }
    return true;
  }
  
}
