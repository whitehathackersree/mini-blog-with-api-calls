import { Resource } from '../resource.model';

export class User extends Resource{
    username: string;
    email: string;
    password: string;

    constructor(fields?: Partial<User>){
        super()
        if(fields)Object.assign(this, fields);
    }
}
