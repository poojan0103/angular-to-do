export class todoObj{
    Id?: number;
    Title?: string;
    Description?: string;
    Startdate?: Date;
    Enddate?: Date;
    Status?: String;
    constructor(){
        this.Status = "Active"
    }
}
