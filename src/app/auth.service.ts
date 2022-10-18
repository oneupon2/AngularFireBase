import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth :  AngularFireAuth, private router : Router) { }


  login(email : string , password :  string)
  {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
      localStorage.setItem('token','true');
      this.router.navigate(['dashboard']);

      if(res.user?.emailVerified == true)
      {
        this.router.navigate(['dashboard']);
      }
    },err => {
      alert('Something went wrong');
      this.router.navigate(['/login']);
    })
  }

  register(email : string, password : string)
  {
    this.fireauth.createUserWithEmailAndPassword(email,password).then((res : any) =>{
      alert('Registration Successfull');
      this.router.navigate(['/login']);
      this.sendEmailForVerification(res.user); //email verification

    }, err =>{
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err=>{
      alert(err.message);
    })
  }

  //email verfication and password reset
  forgotPassword(email : string)
  {
      this.fireauth.sendPasswordResetEmail(email).then(() =>{
        this.router.navigate(['/verify-email'])
      }, err =>{
        alert('Something went wrong');
      })
  }

  sendEmailForVerification(user : any)
  {
    user.sendEmailForVerification().then((res : any) => {
      this.router.navigate(['/verify-email']);
    }, (err : any)=>{
      alert('Something went wrong. Not able to send mail to registered mail.')
    })
  }

}
