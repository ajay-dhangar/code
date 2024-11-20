import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(private fb: FormBuilder, public userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  createAccountForm = this.fb.group({
    email:['', [Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(6)]]
  });

  create(){
    this.userService.createAccount(this.createAccountForm.value).then((res:any)=>{
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
