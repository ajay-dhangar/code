import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FiddleService } from 'src/app/services/fiddle.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public fiddleService:FiddleService, public userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.fiddleService.getFiddles().then((res:any)=>{
      this.fiddles = res.response;
      console.log(this.fiddles);
    })
  }

  fiddles:Array<any> = [];

  create(){
    this.fiddleService.newFiddle().then((res:any)=>{
      console.log(res);
      this.router.navigate(['/coding', res.response.fiddleid]);
    }).catch((err)=>{
      console.log(err);
    })
  }

  delete(fiddleid:any){
    for(let i = 0; i < this.fiddles.length; i++){
      if(this.fiddles[i].fiddleid == fiddleid){
        this.fiddles.splice(i, 1);
        this.fiddleService.delete(fiddleid);
      }
    }
  }


}
