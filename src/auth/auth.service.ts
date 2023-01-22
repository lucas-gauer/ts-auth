import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { JWTPayload } from './jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const passwordHash = await this.userService.findPasswordHash(email);
    if (passwordHash === pass) {
      return this.userService.findOneByEmail(email);
    }
    return null;
  }

  async login(user: User) {
    const payload: JWTPayload = { email: user.email, _id: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
