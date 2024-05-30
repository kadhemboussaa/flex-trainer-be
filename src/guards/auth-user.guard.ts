import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { role } from 'src/enum/role.enum';

@Injectable()
export class AuthUserGuard extends AuthGuard('jwt') {}

export function AuthUserRoleGuard(allowedRoles: role[] | '*') {
  @Injectable()
  class guard extends AuthUserGuard {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      await super.canActivate(context);
      const request = context.switchToHttp().getRequest();
      if (request.user) {
        return allowedRoles === '*' || allowedRoles.includes(request.user.role);
      }

      return false;
    }
  }

  return guard;
}
