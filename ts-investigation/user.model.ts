export class User {

    public id:number;
    public name?: string;
    public company?: string;
    public email:string;
    public hash?:string


    constructor(id:number, email: string) {
        this.id = id;
        this.email = email;
    }
}

export interface Credentials {
    email: string;
    password: string;
}



export enum Colour {
    red = 1, 
    green = 2, 
    blue = 3
}

//null forgiving operator

export class Record {

    public id: number;
    public userId: number;
    public name: string;
    public colour: Colour; 

    constructor(id:number, userId:number, name: string, colour: Colour) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.colour = colour;
    }
}