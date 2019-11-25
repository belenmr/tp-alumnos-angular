import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
	selector: 'app-average',
	templateUrl: './average.component.html',
	styleUrls: ['./average.component.css']
})
export class AverageComponent implements OnInit {

	private studentsList: Student[];
	private storage: LocalStorageService= new LocalStorageService();

	constructor() {
		this.studentsList = this.storage.getStudentsList();
	}

	ngOnInit() {
	}

}
