import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDTO } from '../users/dto/CreateUserDTO';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const match = await bcrypt.compare(pass, user.password);
    if (match) {
      // remove password before returning
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user as any;
      return rest;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.name, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }

  async signup(dto: CreateUserDTO) {
    const created = await this.usersService.create(dto);
    // remove password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = created as any;
    return {
      token: this.jwtService.sign({ username: rest.name, sub: rest.id }),
      user: rest,
    };
  }
}
