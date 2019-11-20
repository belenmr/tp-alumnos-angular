import { Status } from './status.model';

export class Student{
    docket: number;
    name: string;
    surname: string;
    dni: number;
    status: Status;
    firstExam: number;
    secondExam: number;
    average: number;
}