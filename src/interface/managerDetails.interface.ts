import { role } from "src/enum/role.enum";

export interface managerDetails{
    id : string;
    email : string;
    password : string;
    role : role.MANAGER
} 