import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = this.fb.group({
    // TODO: more thorough validation
    // TODO: we don't actually use firstname and lastname, maybe add to mongo schema?
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    user: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirm: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void {
  }

  // TODO: make error messages more like gmail
  submit(): void {
    if (!this.signupForm.valid) {
      alert('Form Invalid');
      return;
    }

    let newuser = this.signupForm.getRawValue();
    if (newuser.password !== newuser.confirm) {
      alert('Passwords do not match');
      return;
    }

    const passwordComplexity =
      new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')
    if (!passwordComplexity.test(newuser.password)) {
      alert('Password does not meet complexity requirements');
      return;
    }

    const email = `${newuser.user}@gmail.com`;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      alert('Username not of correct format');
      return;
    }

    newuser = {
      firstname: newuser.firstname,
      lastname: newuser.lastname,
      email,
      password: newuser.password
    }
    this.auth.signup(newuser).subscribe(data => {
      if (data.status == "success") {
        this.router.navigate(['signin']);
      } else {
        console.log(data)
        alert(data.msg);
      }
    });
  }
}
