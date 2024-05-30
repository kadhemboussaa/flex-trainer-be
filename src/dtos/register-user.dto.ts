import { role } from 'src/enum/role.enum';
import { BaseUserDto } from './create-base-user.dto';
import { IsEnum } from 'class-validator';

export class RegisterUserDto extends BaseUserDto {
  @IsEnum(role)
  role: role;
}
