import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/LoginDTO';
import { CreateUserDTO } from '../users/dto/CreateUserDTO';
import { ChangePasswordDTO } from './dto/ChangePasswordDTO';
import { AuthResponse } from './dto/AuthResponse';
import { Public } from './public.decorator';
import { UseGuards } from '@nestjs/common';

/**
 * GraphQL Resolver for Authentication operations.
 * Exposes mutations for login and signup.
 */
@Resolver()
export class AuthResolver {
  /**
   * Creates an instance of AuthResolver.
   * @param authService - The service responsible for authentication logic.
   */
  constructor(private authService: AuthService) { }

  /**
   * Performs user login.
   * Validates credentials and returns an authentication response with tokens.
   * @param input - The login credentials (email and password).
   * @returns An AuthResponse containing access token and user info.
   * @throws Error when credentials are invalid.
   */
  @Public()
  @Mutation(() => AuthResponse)
  async login(@Args('input') input: LoginDTO) {
    const validated = await this.authService.validateUser(input.email, input.password);
    if (!validated) throw new Error('Invalid credentials');
    return this.authService.login(validated);
  }

  /**
   * Registers a new user (signup).
   * @param input - The input data for creating a new user.
   * @returns An AuthResponse containing access token and user info.
   */
  @Public()
  @Mutation(() => AuthResponse)
  async signup(@Args('input') input: CreateUserDTO) {
    return this.authService.signup(input as any);
  }

  /**
   * Changes a user's password.
   * Requires authentication (uses JWT token from context).
   * @param input - The input containing old and new passwords.
   * @param context - GraphQL context containing user information from JWT.
   * @returns The updated user without password.
   */
  @Mutation(() => AuthResponse, { description: 'Change user password. Requires authentication.' })
  async changePassword(
    @Args('input') input: ChangePasswordDTO,
    @Context() context: any,
  ) {
    const userId = context.req?.user?.id;
    if (!userId) throw new Error('Unauthorized');
    
    const user = await this.authService.changePassword(
      userId,
      input.oldPassword,
      input.newPassword,
    );
    return {
      token: context.req?.headers?.authorization?.split(' ')[1] || '',
      user,
    };
  }
}
