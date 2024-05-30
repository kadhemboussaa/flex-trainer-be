import { role } from "src/enum/role.enum";

export interface coachDetails{
    id : string;
    email : string;
    password : string;
    role : role.COACH
} 