import { Injectable } from '@angular/core';

import { Status } from '../models/status.model';
import { Student } from '../models/student.model';

const statusStorageName = "statusStorage";
const studentStorageName = "studentsStorage";

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {

	private statusList: Status[] = new Array<Status>();
	private exampleStatus: Status = {code: "R", name: "Regular"};
	private studentsList: Student[] = new Array<Student>();
	private exampleStudent: Student = {
		docket: 12,
    	name: "Alumno",
    	surname: "Ejemplo",
    	dni: 123,
    	status: "Regular",
    	firstExam: "4",
    	secondExam: "4",
    	average: 4
	};

	constructor() {
		
		if (localStorage.getItem(statusStorageName)==null) {
			this.statusList.push(this.exampleStatus);
			localStorage.setItem(statusStorageName, JSON.stringify(this.statusList));
		} else {
			this.statusList = JSON.parse(localStorage.getItem(statusStorageName));
		}

		if (localStorage.getItem(studentStorageName)==null) {
			this.studentsList.push(this.exampleStudent);
			localStorage.setItem(studentStorageName, JSON.stringify(this.studentsList));
		} else {
			this.studentsList = JSON.parse(localStorage.getItem(studentStorageName));
		}
	 }

	/******** STATUS STORAGE ********/ 
	/* get list */
	getStatusList(): Status[]{	
		this.statusList = JSON.parse(localStorage.getItem(statusStorageName));	
		return this.statusList;
	}

	/* add a new status */
	addNewStatus(status: Status){
		this.statusList.push(status);
		localStorage.setItem(statusStorageName,JSON.stringify(this.statusList));
	}

	/* set list */
	setStatusList(newStatusList: Status[]){
		localStorage.setItem(statusStorageName,JSON.stringify(newStatusList));
	}

	/* remove a status */
	deleteStatus(status: Status){
		this.statusList.forEach(element => {
			if (status.code == element.code && status.name == element.name) {
				this.statusList = this.statusList.filter(x => x.name!= status.name);
				this.setStatusList(this.statusList);
			}
		});
	}


	/******** STUDENT STORAGE ********/ 

	/* get list */
	getStudentsList(): Student[]{
		this.studentsList = JSON.parse(localStorage.getItem(studentStorageName));	
		return this.studentsList;
	}

	/* add a new student */
	addNewStudent(student: Student){
		this.studentsList.push(student);
		localStorage.setItem(studentStorageName,JSON.stringify(this.studentsList));
	}

	/* set list */
	setStudentsList(newStudentList: Student[]){
		localStorage.setItem(studentStorageName,JSON.stringify(newStudentList));
	}

	/* remove a student */
	deleteStudent(student: Student){
		this.studentsList.forEach(element => {
			if (student.docket == element.docket && student.dni == element.dni) {
				this.studentsList = this.studentsList.filter(x => x.docket != student.docket);
				this.setStudentsList(this.studentsList);
			}
		});
	}
}


