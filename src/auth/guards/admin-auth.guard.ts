import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/user/role.enum';

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user) {
    if (err || !user) throw err || new UnauthorizedException();
    if (user.role != Role.Admin) throw new ForbiddenException();
    return user;
  }
}
