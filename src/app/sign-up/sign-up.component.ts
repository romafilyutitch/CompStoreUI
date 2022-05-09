import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {AuthenticationService} from "../service/authentication.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm;
  @ViewChild('registerSuccessful')
  registerSuccessful: TemplateRef<any> | undefined;
  @ViewChild('loginSuccessful')
  loginSuccessful: TemplateRef<any> | undefined;
  @ViewChild('failedAuthenticate')
  loginFailed: TemplateRef<any> | undefined;

  constructor(private forBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private modalService: NgbModal,
              private router: Router) {
    this.signupForm = forBuilder.group({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmPassword: ['', RxwebValidators.compare({fieldName: 'password'})]
    })
  }

  ngOnInit(): void {
  }

  signUp() {
    console.log('Login user');
    this.authenticationService.authenticate(this.signupForm.value.username, this.signupForm.value.password)
      .subscribe(data => {
        this.modalService.open(this.loginSuccessful, {centered : true});
        this.router.navigate(['']);
      }, error => {
          if (error.status === HttpStatusCode.Unauthorized)  {
            this.modalService.open(this.loginFailed, {centered: true});
          }
        console.log(error.message);
      });
  }

  signIn() {
    console.log(`Register username ${this.signupForm.value.username} password ${this.signupForm.value.password}` );
    this.authenticationService.register(this.signupForm.value.username, this.signupForm.value.email, this.signupForm.value.password)
      .subscribe(data => {
        console.log(data);
        this.modalService.open(this.registerSuccessful, {centered : true});
      });
  }
}
