import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './components/student/student.component';
import { StatusComponent } from './components/status/status.component';
import { QualificationComponent } from './components/qualification/qualification.component';
import { AverageComponent } from './components/average/average.component';
import { DisapprovedComponent } from './components/disapproved/disapproved.component';
import { UserManualComponent } from './components/user-manual/user-manual.component';


const routes: Routes = [
  {path: 'alumnos', component: StudentComponent},
  {path:'estados', component: StatusComponent},
  {path: 'notas', component: QualificationComponent},
  {path: 'reporte-promedios', component: AverageComponent},
  {path: 'reporte-desaprobados', component: DisapprovedComponent},
  {path: 'manual-usuario', component: UserManualComponent},
  {path: '**', pathMatch:'full', redirectTo:'alumnos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
