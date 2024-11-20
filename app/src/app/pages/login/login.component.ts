import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, public userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  loginForm = this.fb.group({
    email: ['',[Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(6)]]
  });

  login(){
    this.userService.login(this.loginForm.value).then((res:any)=>{
      console.log(res);
      if(!res.error){
        this.userService.user = res.response;
        localStorage.setItem('user', JSON.stringify(res.response));
        this.router.navigate(['/home']);
      }
    }).catch((err)=>{
      console.log(err);
    });
  }

}
