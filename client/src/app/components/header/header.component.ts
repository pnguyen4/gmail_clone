import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  visible: boolean = false;

  constructor(private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void {
  }

  toggle(): void {
    this.visible = !this.visible;
  }

  signout(): void {
    this.auth.signout();
    this.router.navigate(['/']);
  }

}
