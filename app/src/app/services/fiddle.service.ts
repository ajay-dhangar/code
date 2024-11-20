import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FiddleService {

  constructor(private http:HttpClient, private userService:UserService) { }

  public newFiddle(){
    return new Promise((resolve, reject)=>{
      this.http.post('http://localhost:3000/fiddles', {userid: this.userService.user.userid}).subscribe(
        res=>{
          resolve(res);
        },
        err =>{
          reject(err);
        }
      )
    });
  }

  public getFiddles(){
    return new Promise((resolve, reject)=>{
      this.http.get('http://localhost:3000/fiddles/user/' + this.userService.user.userid).subscribe(
        res=>{
          resolve(res);
        },
        err =>{
          reject(err);
        }
      );
    });
  }

  getFiddleData(fiddleid:any){
    return new Promise((resolve, reject)=>{
      this.http.get('http://localhost:3000/fiddles/' + fiddleid).subscribe(
        res=>{
          resolve(res);
        },
        err =>{
          reject(err);
        }
      );
    });
  }

  run(opts:any){
    return new Promise((resolve, reject)=>{
      this.http.post('http://localhost:3000/execute', opts).subscribe(
        res=>{
          resolve(res);
        },
        err =>{
          reject(err);
        }
      );
    });
  }

  save(fiddleObj:any){
    return new Promise((resolve, reject)=>{
      this.http.put('http://localhost:3000/fiddles', fiddleObj).subscribe(
        res=>{
          resolve(res);
        },
        err =>{
          reject(err);
        }
      );
    });
  }

  delete(fiddleid:any){
    return new Promise((resolve, reject)=>{
      this.http.delete('http://localhost:3000/fiddles/' + fiddleid).subscribe(
        res=>{
          resolve(res);
        },
        err =>{
          reject(err);
        }
      );
    });
  }
}
