export class Status {
    name: string;

    statusList: Status[];

    constructor(nameParam:string){
        this.name = nameParam;

        this.statusList.push(this);
    }
}