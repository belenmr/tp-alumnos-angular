import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

const minQualification: number = 4;

@Component({
  	selector: 'app-disapproved',
  	templateUrl: './disapproved.component.html',
  	styleUrls: ['./disapproved.component.css']
})


export class DisapprovedComponent implements OnInit {

	private studentsList: Student[];
	private DisapprovedStudentsList: Student[];
	private storage: LocalStorageService= new LocalStorageService(); 
	

  	constructor() {
		this.studentsList = this.storage.getStudentsList();
		this.DisapprovedStudentsList = this.loadDisapprovedList(this.studentsList);

		if (!this.existDisapproved(this.DisapprovedStudentsList)) {
			alert("No hay alumnos desaprobados");
		}
	}

	loadDisapprovedList(list: Student[]): Student[]{
		let disapproveds: Student[] = new Array<Student>();

		list.forEach(element => {
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
