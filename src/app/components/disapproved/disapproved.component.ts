import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

const minQualification: number = 4;

@Component({
  	selector: 'app-disapproved',
  	templateUrl: './disapproved.component.html',
  	styleUrls: ['./disapproved.component.css']
})


export class DisapprovedComponent implements OnInit {

	private studentsList: Student[];
	private disapprovedStudentsList: Student[];
	private storage: LocalStorageService= new LocalStorageService();
	
	

  	constructor(private route: Router ) {
		 
		this.studentsList = this.storage.getStudentsList();
		this.disapprovedStudentsList = this.loadDisapprovedList();

		if (!this.existDisapproved(this.disapprovedStudentsList)) {
			alert("No hay alumnos desaprobados");
			route.navigateByUrl("reporte-promedios");
			
		}
	}

	loadDisapprovedList(): Student[]{
		let disapproveds: Student[] = new Array<Student>();

		this.studentsList.forEach(element => {
			if (element.average < minQualification) {
				disapproveds.push(element);
			}
		});

		return disapproveds;
	}


	existDisapproved(list: Student[]):boolean{
		let exist: boolean = true;
		let size: number = list.length;

		if (size == 0) {
			exist = false;
		}
		
		return exist;
	}



  	ngOnInit() {
  	}

}
