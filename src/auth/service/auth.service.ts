import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../../types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const passwordIsMatch = await argon2.verify(user.password, password);

    if (user && passwordIsMatch) {
      return user;
    }
    throw new UnauthorizedException('Email or password was incorrect!');
  }

  async login(user: IUser) {
    const { id, email } = user;
    return {
      id,
      email,
      token: this.jwtService.sign({ id: user.id, email: user.email }),
    };
  }
}
