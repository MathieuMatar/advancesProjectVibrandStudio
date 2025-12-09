import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

/**
 * Passport JWT strategy used by both REST and GraphQL guards.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService, private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET') || 'hard!to-guess_secret',
    });
  }

  /**
   * Validates JWT payload and returns the corresponding user sans password.
   */
  async validate(payload: any) {
    const user = await this.usersService.findOne(payload.sub);
    // return user object (without password) to be attached to request.user
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user as any;
    return rest;
  }
}
