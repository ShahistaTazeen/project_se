import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/LoginComponent';
import { SelectorComponent } from './selector/selector.component';
import { StudentComponent } from './student/student.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { SucessfulComponent } from './sucessful/sucessful.component';
import { RegisterComponent } from './register/register.component';
const routes: Routes = [
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path:'selector',
    component:SelectorComponent
  },
  {
    path:'',
    redirectTo:'selector',
    pathMatch:'full'
  },
  {
    path:'student',
    component:StudentComponent
  },
  {
    path:'organizer',
    component:OrganizerComponent
  },
  {path:'student:/eventName/register',
    component:RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
