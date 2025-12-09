import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDTO } from '../users/dto/CreateUserDTO';

/**
 * Handles authentication-related workflows including credential validation and token issuance.
 */
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  /**
   * Validates user credentials against stored password hash.
   * @param email User email.
   * @param pass Plaintext password to verify.
   * @returns Sanitized user object or null when credentials are invalid.
   */
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

  /**
   * Issues a JWT for an authenticated user.
   * @param user Sanitized user payload.
   * @returns Token plus user payload.
   */
  async login(user: any) {
    // Include accessLevel in the JWT payload
    const payload = { 
      username: user.name, 
      sub: user.id,
      accessLevel: user.accessLevel // Add access level to token
    };
    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }

  /**
   * Creates a new user and returns an auth token for the created account.
   * @param dto User creation data.
   * @returns Token plus newly created user (sans password).
   */
  async signup(dto: CreateUserDTO) {
    const created = await this.usersService.create(dto);
    // remove password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = created as any;
    return {
      token: this.jwtService.sign({ 
        username: rest.name, 
        sub: rest.id,
        accessLevel: rest.accessLevel // Add access level to token
      }),
      user: rest,
    };
  }

  /**
   * Changes a user's password after verifying the old password.
   * @param userId Identifier of the user.
   * @param oldPassword Current password to verify.
   * @param newPassword Replacement password.
   * @returns Updated user without password field.
   */
  async changePassword(userId: number, oldPassword: string, newPassword: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new UnauthorizedException('User not found');
    
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) throw new UnauthorizedException('Old password is incorrect');
    
    const updated = await this.usersService.changePassword(userId, newPassword);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = updated as any;
    return rest;
  }
}