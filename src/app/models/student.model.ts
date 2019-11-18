import { Status } from './status.model';

export class Student{
    docket: number;
    name: string;
    surname: string;
    dni: number;
    status: Status;
    firstQualification: number;
    secondQualification: number;

    alumnoList: Student[];


    constructor(docketParam:number, nameParam:string, surnameParam:string, dniParam:number, statusParam: Status){
        this.docket = docketParam;
        this.name = nameParam;
        this.surname = surnameParam;
        this.dni = dniParam;
        this.status = statusParam;

        this.alumnoList.push(this);
    }
}