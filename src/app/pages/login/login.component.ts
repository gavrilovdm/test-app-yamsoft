import {Component, OnDestroy, OnInit, SecurityContext} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/auth.service";
import {DomSanitizer} from "@angular/platform-browser";
import {map, Subject, takeUntil, tap} from "rxjs";
import {LoginResponseI} from "../../core/interfaces/login-response.interface";
import {Router} from "@angular/router";
import {getControl} from "../../shared/helpers";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public getControl = getControl;

  public hide = true;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private sanitizer: DomSanitizer, private router: Router) {
    this.initForm();
  }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) this.router.navigate(['home']);
  }

  initForm(): void {
    this.loginForm = this.fb.group(
      {
        username: ['mor_2314', [Validators.required]],
        password: ['83r5^_', [Validators.required]]
      },
    );
  }

  public onLoginFormSubmit() {
    const formValue = { ...this.loginForm.value };

    formValue.username = this.sanitizeString(formValue.username);
    formValue.password = this.sanitizeString(formValue.password);

    this.authService.login(formValue.username, formValue.password).pipe(
      map((data: LoginResponseI) => {
        console.log(data)
        if (data) localStorage.setItem('accessToken', data.token)
      }),
      tap(() => this.router.navigate(['home'])),
      takeUntil(this._unsubscribeAll)
    ).subscribe();
  }

  sanitizeString(value: string) {
    return this.sanitizer.sanitize(
      SecurityContext.HTML,
      value
    );
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
