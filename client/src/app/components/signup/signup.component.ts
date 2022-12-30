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

  submit(): void {
    if (!this.signupForm.valid) {
      alert('Form Invalid'); // TODO: make more like gmail
      return;
    }

    let newuser = this.signupForm.getRawValue();
    if (newuser.password !== newuser.confirm) {
      alert('Passwords do not match');
      return;
    }

    newuser = {
      firstname: newuser.firstname,
      lastname: newuser.lastname,
      email: `${newuser.user}@gmail.com`,
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
