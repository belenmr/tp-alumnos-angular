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
		

		this.studentsList.forEach(element => {
			if (docket == element.docket) {
				this.selectedStudent = element;
				this.show = true;
			} else {
				alert("Legajo inexistente");
				this.selectedStudent = new Student();
			}
		});
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
