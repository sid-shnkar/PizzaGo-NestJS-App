import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from './user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: UserService) {
    super();
  }

  async validate(body) {
    console.log(body);
    const user = await this.authService.validateUser(body);
    console.log(user);
    if (!user) {
      console.log('User not validated');
      throw new UnauthorizedException();
    }
    return user;
  }
}
