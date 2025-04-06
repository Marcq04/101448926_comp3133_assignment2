import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Check if the auth token exists in localStorage
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if ((decodedToken.exp ?? 0) < currentTime) {
        // Token has expired, redirect to login page
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    } else {
      // Token does not exist, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
