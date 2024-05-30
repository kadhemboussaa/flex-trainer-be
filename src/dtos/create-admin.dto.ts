import { role } from "src/enum/role.enum";

export class createAdminDto {
    readonly email : string;
    readonly password : string;
    readonly role : role
}