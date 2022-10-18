import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email : string = '';

  constructor(private auth : AuthService) { }
  loginForm: FormGroup = new FormGroup({
    email: new FormControl ('', [Validators.required, Validators.email])
  })

  ngOnInit(): void {
  }
  forgotPassword()
  {
    this.auth.forgotPassword(this.email);
    this.email = '';
  }
}
