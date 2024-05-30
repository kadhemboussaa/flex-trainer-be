import { role } from "src/enum/role.enum";

export class createClientDto {
    readonly email : string;
    readonly password : string;
    readonly role : role
}