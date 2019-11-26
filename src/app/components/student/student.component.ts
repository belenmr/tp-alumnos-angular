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
	private show: boolean = false;
	private positionToModify: number;
	private oldSelectedStudent: Student = new Student();
	private selectedStudent: Student = new Student();

  	constructor() {
		  this.studentsList = this.storage.getStudentsList();
		  this.statusList = this.storage.getStatusList();
	   }
		
  	ngOnInit() {
  	}

	  
	addStudent(){
		if(this.existDNI(this.selectedStudent)){
			alert("El n° de DNI ya pertenece a un alumno");
		} else {
			if (this.existDocket(this.selectedStudent)) {
				alert("El n° de legajo ya pertenece a un  alumno");
			} else {
				this.selectedStudent.name = this.selectedStudent.name.toUpperCase();
				this.selectedStudent.surname = this.selectedStudent.surname.toUpperCase();
				this.selectedStudent.firstExam = "-";
				this.selectedStudent.secondExam = "-";
				this.studentsList.push(this.selectedStudent);
				this.storage.setStudentsList(this.studentsList);
			}
		}

		this.selectedStudent = new Student();
	}


  	openEditStudent(position:number){
		this.selectedStudent = this.studentsList[position];
		this.show = true;
		this.positionToModify = position;
	}
	
	
	editStudent(){
		let oldStudentList = this.storage.getStudentsList();
		this.oldSelectedStudent = oldStudentList[this.positionToModify];


		if (this.existDNIToEdit(this.selectedStudent, this.positionToModify)){
			alert("El n° de DNI ya pertenece a un alumno");	
		} else {
			if (this.existDocketToEdit(this.selectedStudent, this.positionToModify)) {
				alert("El n° de legajo ya pertenece a un alumno");
			} else {
				oldStudentList.forEach(element => {
					if (element.dni == this.oldSelectedStudent.dni && element.docket == this.oldSelectedStudent.docket) {
						element.dni = this.selectedStudent.dni;
						element.docket = this.selectedStudent.docket;
						element.name = this.selectedStudent.name.toUpperCase();
						element.surname = this.selectedStudent.surname.toUpperCase();
						element.status = this.selectedStudent.status;
					}
				});

				this.storage.setStudentsList(oldStudentList);
			}	
		}
		

		this.selectedStudent = new Student();
		this.oldSelectedStudent = new Student();
		this.show = false;
		this.studentsList = this.storage.getStudentsList();
	}


	deleteStudent(position: number){
		if (confirm("¿Quiere eliminarlo?")) {
			if (this.lastStudent()) {
				alert("Es obligatorio que exista al menos un alumno");
			} else {
				this.selectedStudent = this.studentsList[position];
				this.storage.deleteStudent(this.selectedStudent);
				this.studentsList = this.storage.getStudentsList();
				this.selectedStudent = new Student();				
			}
		}
	}


	lastStudent(): boolean{
		let lastStudent: boolean = false;
		let size: number;

		this.studentsList = this.storage.getStudentsList();
		size = this.studentsList.length;

		if (size == 1) {
			lastStudent = true;
		}

		return lastStudent;
	}


	existDocket(student: Student):boolean{
		let exist: boolean = false;
		let studentsList = this.storage.getStudentsList();

		studentsList.forEach(element => {
			if (element.docket == student.docket) {
				exist = true;
			}
		});

		return exist;
	}


	existDocketToEdit(student: Student, position: number):boolean{
		let exist: boolean = false;
		let studentsList = this.storage.getStudentsList();

		for (let i = 0; i < studentsList.length; i++) {
			let element: Student = studentsList[i];
			
			if (i != position) {
				if (element.docket == student.docket) {
					exist = true;
				}
			}
		}

		return exist;
	}

	existDNI(student: Student):boolean{
		let exist: boolean = false;
		let studentsList = this.storage.getStudentsList();

		studentsList.forEach(element => {
			if (element.dni == student.dni) {
				exist = true;
			}
		});

		return exist;
	}


	existDNIToEdit(student: Student, position: number):boolean{
		let exist: boolean = false;
		let studentsList = this.storage.getStudentsList();

		for (let i = 0; i < studentsList.length; i++) {
			let element: Student = studentsList[i];
			
			if (i != position) {
				if (element.dni == student.dni) {
					exist = true;
				}
			}
		}

		return exist;
	}


	cancelEditStudent(){
		this.selectedStudent = new Student();
		this.show = false;
		this.studentsList = this.storage.getStudentsList();
	}


	validateStringField(fieldValue: string):boolean{
		let validationStatus:boolean = true;
    
    	if( fieldValue == null || fieldValue.length == 0 || /^\s+$/.test(fieldValue) ) { 
        	validationStatus = false;
		}
		
		return validationStatus;
	}


	validateNumberField(fieldValue: number):boolean{
		let validationStatus:boolean = true;

		if (fieldValue == null || fieldValue <= 0) {
			validationStatus = false;
		}

		return validationStatus;
	}

	validateForm():boolean{
		let validationStatus:boolean = true;

		if (this.validateNumberField(this.selectedStudent.docket)) {
			validationStatus = false;
		}

		if (this.validateStringField(this.selectedStudent.name)) {
			validationStatus = false;
		}

		if (this.validateStringField(this.selectedStudent.surname)) {
			validationStatus = false;
		}

		if (this.validateNumberField(this.selectedStudent.dni)) {
			validationStatus = false;
		}

		if (this.validateStringField(this.selectedStudent.status)) {
			validationStatus = false;
		}

		return validationStatus;
	}
}
