import { role } from "src/enum/role.enum";

export interface clientDetails{
    id : string;
    email : string;
    password : string;
    role : role.CLIENT
} 