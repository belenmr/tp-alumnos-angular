import { Status } from '../../models/status.model' 
import { Component, OnInit } from '@angular/core';

@Component({
  	selector: 'app-status',
  	templateUrl: './status.component.html',
  	styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  	statusList: Status[] = [
		  {code: "R", name: "Regular"}
	  ];

  	selectedStatus: Status = new Status();

  	addOrEditStatus(){
		if (!this.existStatus(this.selectedStatus)) {
			if(this.existStatusCode(this.selectedStatus)){
				alert("Codigo ya en uso. Intente otro codigo");
			} else {
				if (this.existStatusName(this.selectedStatus)) {
					alert("Nombre de estado ya en uso. Intente otro nombre");
				} else {
					this.statusList.push(this.selectedStatus);
				}
			}
		}

		this.selectedStatus = new Status();
	}

	openEdition(status: Status){
		this.selectedStatus = status;
	}
	  
	deleteStatus(){
		if (confirm("¿Quiere eliminarlo?")) {
			this.statusList = this.statusList.filter(x => x!= this.selectedStatus);
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
