import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FiddleService } from 'src/app/services/fiddle.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-coding',
  templateUrl: './coding.component.html',
  styleUrls: ['./coding.component.css']
})
export class CodingComponent implements OnInit {

  constructor(private route: ActivatedRoute, private rotuer:Router, public fiddleService:FiddleService, public userService:UserService) { }

  ngOnInit(): void {
    this.fiddleid =  this.route.snapshot.paramMap.get('fiddleid');
    this.fiddleService.getFiddleData(this.fiddleid).then((res:any)=>{
      this.fiddle = res.response;
      this.code = this.fiddle.code;
      this.editorOptions.language = this.fiddle.language;
      console.log(this.fiddle);
    }).catch((err)=>{
      console.log(err);
    });
  }


  fiddleid:any = '';
  fiddle:any;
  stdin:any = '';
  

  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';
  stdout = "Run the code to get the output";


  save(){
    this.fiddle.code = this.code;
    this.fiddleService.save(this.fiddle).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    });
  }

  delete(){
    this.fiddleService.delete(this.fiddle.fiddleid).then((_)=>{
      this.rotuer.navigate(['/home']);
    }).catch((err)=>{
      console.log(err);
    });
  }

  run(){
    let opts = {
      script: this.code,
      stdin : this.stdin,
      language: this.fiddle.language
    };
    this.fiddleService.run(opts).then((res:any)=>{
      console.log(res);
      this.stdout = res.response.output;
    }).catch((err)=>{
      console.log(err);
    });
  }
}
