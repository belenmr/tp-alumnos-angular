import { Status } from '../../models/status.model' 
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Student } from 'src/app/models/student.model';

@Component({
  	selector: 'app-status',
  	templateUrl: './status.component.html',
  	styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

	statusList: Status[] = new Array<Status>();
	selectedStatus: Status = new Status();
	private storage:LocalStorageService = new LocalStorageService();
	private studentsList: Student[];
	private show: boolean = false;
	private positionToModify: number;

	constructor(){
		this.statusList = this.storage.getStatusList();
		this.studentsList = this.storage.getStudentsList();
	}	


  	editStatus(){
		let oldStatus: string;
		let oldStatusList = this.storage.getStatusList();
		oldStatus = oldStatusList[this.positionToModify].name;	
		this.selectedStatus.name = this.selectedStatus.name.toUpperCase();

		if (this.existStatusNameToEdit(this.selectedStatus, this.positionToModify)) {
			alert("Nombre de estado ya en uso. Intente otro nombre");
		} else {
			this.storage.setStatusList(this.statusList);

			this.updateStudentStatus(oldStatus, this.selectedStatus);
			
		}
			
		this.selectedStatus = new Status();
		this.show = false;
		this.statusList = this.storage.getStatusList();
	}

	addStatus(){
		if (this.existStatusName(this.selectedStatus)) {
			alert("Nombre de estado ya en uso. Intente otro nombre");
		} else {
			this.selectedStatus.name = this.selectedStatus.name.toUpperCase();
			this.statusList.push(this.selectedStatus);
			this.storage.setStatusList(this.statusList);
		}
		this.selectedStatus = new Status();
	}


	openEdition(status: Status, position: number){
		this.selectedStatus = status;
		this.show = true;
		this.positionToModify = position;
	}
	  
	deleteStatus(){
		this.selectedStatus;
		if (confirm("¿Quiere eliminarlo?")) {
			if (this.lastStatus()) {
				alert("Es obligatorio que exista al menos un estado disponible");
			} else {
				if (this.statusInUse(this.selectedStatus)) {
					alert("No es posible eliminar un estado en uso");
				} else {
					this.storage.deleteStatus(this.selectedStatus);
					this.statusList = this.storage.getStatusList();	
				}
			}
		}

		this.selectedStatus = new Status();
	}

	lastStatus(): boolean{
		let lastStatus: boolean = false;
		let size: number;

		this.statusList = this.storage.getStatusList();
		size = this.statusList.length;

		if (size == 1) {
			lastStatus = true;
		}

		return lastStatus;
	}

	updateStudentStatus(oldStatus: string, newStatus: Status){
		this.studentsList.forEach(element => {
			if (element.status.toUpperCase() == oldStatus.toUpperCase() ) {
				element.status = newStatus.name;
			}
		});

		this.storage.setStudentsList(this.studentsList);		
	}


	statusInUse(status: Status): boolean{
		let used : boolean = false;

		for (let i = 0; i < this.studentsList.length; i++) {
			let element: Student = this.studentsList[i];

			if (element.status.toUpperCase() == status.name.toUpperCase()) {
				used = true;
				break;
			}
			
		}

		return used;
	}


	existStatusName(status: Status):boolean{
		let exist: boolean = false;
		let statusList = this.storage.getStatusList();

		statusList.forEach(element => {
			if (element.name.toUpperCase() == status.name.toUpperCase()) {
				exist = true;
			}
		});

		return exist;
	}


	existStatusNameToEdit(status:Status, position: number):boolean{
		let exist: boolean = false;
		let statusList = this.storage.getStatusList();

		for (let i = 0; i < statusList.length; i++){
			let element: Status = statusList[i];

			if (i != position) {
				if (element.name.toUpperCase() == status.name.toUpperCase()) {
					exist = true;
				}
			}
	
		}
		return exist;
	}


	cancelEditStatus(){
		this.selectedStatus = new Status();
		this.show = false;
	}
  

  	ngOnInit() {
	}

}
