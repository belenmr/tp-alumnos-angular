import { Status } from '../../models/status.model' 
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  	selector: 'app-status',
  	templateUrl: './status.component.html',
  	styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

	statusList: Status[] = new Array<Status>();
	selectedStatus: Status = new Status();
	private storage:LocalStorageService = new LocalStorageService();

	

	constructor(){
		this.statusList = this.storage.getStatusList();
	}	


  	addOrEditStatus(){
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

	openEdition(status: Status){
		this.selectedStatus = status;
	}
	  
	deleteStatus(){
		let statusToDelete = this.selectedStatus;
		if (confirm("¿Quiere eliminarlo?")) {
			this.storage.deleteStatus(statusToDelete);
			this.statusList = this.storage.getStatusList();
			this.selectedStatus = new Status();
		}
	}

	existStatus(status: Status):boolean{
		let exist: boolean = false;

		this.statusList.forEach(element => {
			if (element.name == status.name && element.code == status.code) {
				exist = true;
			}
		});
		
		return exist;
	}

	existStatusName(status: Status):boolean{
		let exist: boolean = false;

		this.statusList.forEach(element => {
			if (element.name == status.name) {
				exist = true;
			}
		});

		return exist;
	}

	existStatusCode(status: Status):boolean{
		let exist: boolean = false;

		this.statusList.forEach(element => {
			if (element.code == status.code) {
				exist = true;
			}
		});

		return exist;
	}

	cancelEditStatus(){
		this.selectedStatus = new Status();
	}
  
  	ngOnInit() {
	}

}
