import { role } from "src/enum/role.enum";

export interface adminDetails{
    id : string;
    email : string;
    password : string;
    role : role.ADMIN
} 