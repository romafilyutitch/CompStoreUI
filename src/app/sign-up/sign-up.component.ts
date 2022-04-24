import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {RxwebValidators} from "@rxweb/reactive-form-validators";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm;

  constructor(private forBuilder: FormBuilder) {
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
    console.log('sign up user');
  }

  signIn() {
    console.log('sign in user');
  }
}
