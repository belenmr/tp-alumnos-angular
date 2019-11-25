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
	private oldSelectedStatus: Status = new Status();
	private show: boolean = false;
	private positionToModify: number;

	constructor(){
		this.statusList = this.storage.getStatusList();
		this.studentsList = this.storage.getStudentsList();
	}	


  	editStatus(position: number){
		let oldStatusList = this.storage.getStatusList();
		this.oldSelectedStatus = oldStatusList[this.positionToModify];	

		if (!this.existStatus(this.selectedStatus)) {
			if(this.existStatusCodeToEdit(this.selectedStatus, this.positionToModify)){
				alert("Codigo ya en uso. Intente otro codigo");
			} else {
				if (this.existStatusNameToEdit(this.selectedStatus, this.positionToModify)) {
					alert("Nombre de estado ya en uso. Intente otro nombre");
				} else {
					oldStatusList.forEach(element =>{
						if (element.code == this.oldSelectedStatus.code && element.name == this.oldSelectedStatus.name) {
							element.code = this.selectedStatus.code;
							element.name = this.selectedStatus.name;
						}
					});

					this.storage.setStatusList(oldStatusList);
					this.updateStudentStatus(this.oldSelectedStatus, this.selectedStatus);
					
				}
			}
		}
	
		this.selectedStatus = new Status();
		this.oldSelectedStatus = new Status();
		this.show = false;
		this.statusList = this.storage.getStatusList();
	}

	addStatus(){
		if (!this.existStatus(this.selectedStatus)) {
			if(this.existStatusCode(this.selectedStatus)){
				alert("Codigo ya en uso. Intente otro codigo");
			} else {
				if (this.existStatusName(this.selectedStatus)) {
					alert("Nombre de estado ya en uso. Intente otro nombre");
				} else {
					this.statusList.push(this.selectedStatus);
					this.storage.setStatusList(this.statusList);
				}
			}
		}

		this.selectedStatus = new Status();
	}


	openEdition(status: Status, position: number){
		this.selectedStatus = status;
		this.show = true;
		this.positionToModify = position;
	}
	  
	deleteStatus(){
		let statusToDelete = this.selectedStatus;
		if (confirm("¿Quiere eliminarlo?")) {
			if (this.lastStatus()) {
				alert("Es obligatorio que exista al menos un estado disponible");
			} else {
				this.storage.deleteStatus(statusToDelete);
				this.statusList = this.storage.getStatusList();				
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

	updateStudentStatus(oldStatus: Status, newStatus: Status){
		this.studentsList.forEach(element => {
			if (element.status.name == oldStatus.name && element.status.code == oldStatus.code) {
				element.status = newStatus;
			}
		});

		this.storage.setStudentsList(this.studentsList);
		
	}


	statusInUse(status: Status): boolean{
		let used : boolean = false;

		this.studentsList.forEach(element => {
			if (element.status.name == status.name) {
				used = true;
			}
		});

		return used;
	}


	existStatus(status: Status):boolean{
		let exist: boolean = false;
		let statusList = this.storage.getStatusList();

		statusList.forEach(element => {
			if (element.name == status.name && element.code == status.code) {
				exist = true;
			}
		});
		
		return exist;
	}

	existStatusName(status: Status):boolean{
		let exist: boolean = false;
		let statusList = this.storage.getStatusList();

		statusList.forEach(element => {
			if (element.name == status.name) {
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
				if (element.name == status.name) {
					exist = true;
				}
			}
	
		}
		return exist;
	}


	existStatusCode(status: Status):boolean{
		let exist: boolean = false;
		let statusList = this.storage.getStatusList();

		statusList.forEach(element => {
			if (element.code == status.code) {
				exist = true;
			}
		});

		return exist;
	}


	existStatusCodeToEdit(status: Status, position: number):boolean{
		let exist: boolean = false;
		let statusList = this.storage.getStatusList();

		for (let i = 0; i < statusList.length; i++){
			let element: Status = statusList[i];

			if (i != position) {
				if (element.code == status.code) {
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
