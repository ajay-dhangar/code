import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodingComponent } from './pages/coding/coding.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'login'},
  {path:'login', component:LoginComponent},
  {path:'create-account', component:CreateAccountComponent},
  {path:'home', component:HomeComponent},
  {path:'coding/:fiddleid', component: CodingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
