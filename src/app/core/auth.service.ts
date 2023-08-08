import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, EMPTY, map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {LoginResponseI} from "./interfaces/login-response.interface";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {
  }

  login(username: string, password: string): Observable<LoginResponseI | Observable<never>> {
    const body = JSON.stringify({username: username, password: password})

    return this.http.post(environment.apiUrl + 'auth/login', body, {
      headers: {'Content-Type': 'application/json'}
    }).pipe(
      map((data: { token: string }) => data !== undefined ? data : EMPTY),
      catchError((err) => {
        alert(JSON.stringify(err.error));
        return EMPTY;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    this.router.navigate(['login']);
  }
}
