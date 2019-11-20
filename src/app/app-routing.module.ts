import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './components/student/student.component';
import { StatusComponent } from './components/status/status.component';


const routes: Routes = [
  {path: 'alumnos', component: StudentComponent},
  {path:'estados', component: StatusComponent},
  {path: '**', pathMatch:'full', redirectTo:'alumnos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
