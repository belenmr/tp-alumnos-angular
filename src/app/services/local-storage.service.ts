import { Injectable } from '@angular/core';

import { Status } from '../models/status.model';
import { Student } from '../models/student.model';

const statusStorageName = "statusStorage";
const studentStorageName = "studentStorage";

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {

	private statusList: Status[];
	private studentsList: Student[];
	constructor() {
		//this.statusList = JSON.parse(localStorage.getItem(statusStorageName));
		if (localStorage.getItem(statusStorageName)==null) {
			localStorage.setItem(statusStorageName, JSON.stringify(this.statusList));
		} else {
			this.statusList = JSON.parse(localStorage.getItem(statusStorageName));
		}

		//this.studentsList = JSON.parse(localStorage.getItem(studentStorageName));
		if (localStorage.getItem(studentStorageName)==null) {
			localStorage.setItem(studentStorageName, JSON.stringify(this.studentsList));
		} else {
			this.statusList = JSON.parse(localStorage.getItem(studentStorageName));
		}
	 }

	/******** STATUS STORAGE ********/ 
	/* get list */
	getStatusList(): Status[]{		
		return [...this.statusList];
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
	getStudentList(): Student[]{
		return [...this.studentsList];
	}

	/* add a new student */
	addNewStudent(student: Student){
		this.studentsList.push(student);
		localStorage.setItem(studentStorageName,JSON.stringify(this.studentsList));
	}

	/* set list */
	setStudentList(newStudentList: Student[]){
		localStorage.setItem(studentStorageName,JSON.stringify(newStudentList));
	}

	/* remove a student */
	deleteStudent(student: Student){
		this.studentsList.forEach(element => {
			if (student.docket == element.docket && student.dni == element.dni) {
				this.studentsList = this.studentsList.filter(x => x.docket != student.docket);
				this.setStudentList(this.studentsList);
			}
		});
	}
}


