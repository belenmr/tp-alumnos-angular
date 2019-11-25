import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  	selector: 'app-qualification',
  	templateUrl: './qualification.component.html',
  	styleUrls: ['./qualification.component.css']
})
export class QualificationComponent implements OnInit {

	private studentsList: Student[];
	private storage: LocalStorageService = new LocalStorageService();
	private show: boolean = false;

	selectedStudent: Student = new Student();

	constructor() { 
		this.studentsList = this.storage.getStudentsList();
	}

  	ngOnInit() {
  	}

  	qualificationsList: any[] = [
		"-",
		"1", "1.5", 
		"2", "2.5",
		"3", "3.5",
		"4", "4.5",
		"5", "5.5",
		"6", "6.5",
		"7", "7.5",
		"8", "8.5",
		"9", "9.5",
		"10"
	];

	searchDocket(docket: number){
		let notExist: number = 0;

		for (let i = 0; i < this.studentsList.length; i++) {
			let element: Student = this.studentsList[i];
			if (element.docket == docket) {
				this.selectedStudent = element;
				this.show = true;
				notExist = 0;
				break;
			} else {
				notExist++;
			}		
		}

		if (notExist > 0) {
			this.selectedStudent = new Student();
				alert("Legajo inexistente");
		}
		
	}

	addQualifications(firstExam: string, secondExam: string){
		let average = this.calculateAverage(firstExam, secondExam);

		this.studentsList.forEach(element => {
			if (element.docket == this.selectedStudent.docket) {
				element.firstExam = firstExam;
				element.secondExam = secondExam;
				element.average = average;
			}
		});

		this.storage.setStudentsList(this.studentsList);

		alert("Notas guardadas exitosamente");
		this.selectedStudent = new Student();
		this.show = false;
	}

	calculateAverage(firstExam: string, secondExam: string): number{
		let average: number = 0;
		if (firstExam == "-") {
			average = parseFloat(firstExam);
		} else {
			if(secondExam == "-"){
				average = parseFloat(secondExam);
			} else {
				average = (parseFloat(firstExam) + parseFloat(secondExam)) / 2;
			}		
		}

		return average;
	}

	cancel(){
		this.selectedStudent = new Student();
		this.show = false;
	}
}
