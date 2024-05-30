import { role } from "src/enum/role.enum";

export interface userDetails{
    id : string;
    email : string;
    password : string;
    role : role
} 