import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { Status } from 'src/app/models/status.model';
import { LocalStorageService } from '../../services/local-storage.service'

@Component({
  	selector: 'app-student',
  	templateUrl: './student.component.html',
	styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

	private statusList: Status[];
	private storage: LocalStorageService = new LocalStorageService();
	private studentsList: Student[];
	

  	constructor() {
		  this.statusList = this.storage.getStatusList();
		  this.studentsList = this.storage.getStudentsList();
	   }
		
  	ngOnInit() {
  	}

	qualificationsList: number[] = [
		0,
		1, 1.5, 
		2, 2.5,
		3, 3.5,
		4, 4.5,
		5, 5.5,
		6, 6.5,
		7, 7.5,
		8, 8.5,
		9, 9.5,
		10
	];
  	

  	selectedStudent: Student = new Student();

  	openEditStudent(i:number){
    	this.selectedStudent = this.studentsList[i];
  	}

	existStudent(student: Student): boolean{
		let exist: boolean = false;

		if (this.existDocket(student) && this.existDNI(student)) {
			exist = true;
		}

		return exist;
	}
	
  	existDocket(student: Student):boolean{
		let exist: boolean = false;

		this.studentsList.forEach(element => {
			if (element.docket == student.docket) {
				exist = true;
			}
		});

		return exist;
	}

	existDNI(student: Student):boolean{
		let exist: boolean = false;

		this.studentsList.forEach(element => {
			if (element.dni == student.dni) {
				exist = true;
			}
		});

		return exist;
	}

	calculateAverage(student: Student): number{
		let average: number = 0;
		if (student.firstExam == 0) {
			average = student.firstExam;
		} else {
			if(student.secondExam == 0){
				average = student.secondExam;
			} else {
				average = (student.firstExam + student.secondExam) / 2;
			}		
		}

		return average;
	}

	addOrEditStudent(){
		if (!this.existStudent(this.selectedStudent)) {
			if(this.existDNI(this.selectedStudent)){
				alert("Codigo ya en uso. Intente otro codigo");
			} else {
				if (this.existDocket(this.selectedStudent)) {
					alert("Nombre de estado ya en uso. Intente otro nombre");
				} else {
					this.selectedStudent.average = this.calculateAverage(this.selectedStudent);
					this.studentsList.push(this.selectedStudent);
				}
			}
		}

		this.selectedStudent = new Student();
	}

	deleteStudent(i:number){
		if (confirm("¿Quiere eliminarlo?")) {
			this.selectedStudent = this.studentsList[i];
			this.studentsList = this.studentsList.filter(x => x!= this.selectedStudent);
			this.selectedStudent = new Student();
		}
	}

	cancelEditStudent(){
		this.selectedStudent = new Student();
	}
}
