import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email :  string = '';
  password : string = '';
  constructor(private auth : AuthService) { }

   
  loginForm: FormGroup = new FormGroup({
    email: new FormControl ('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  ngOnInit(){
  
  }
  hide: boolean = false;
 


  login(){
    if(this.email == '')
    {
      alert('Please enter mail');
      return;
    }

    if(this.password == '')
    {
      alert('Please enter password');
      return;
    }

    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
    
  }

}
