import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/LoginDTO';
import { CreateUserDTO } from '../users/dto/CreateUserDTO';
import { AuthResponse } from './dto/AuthResponse';
import { Public } from './public.decorator';

/**
 * GraphQL Resolver for Authentication operations.
 * Exposes mutations for login and signup.
 */
@Resolver()
@Public()
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
  @Mutation(() => AuthResponse)
  async signup(@Args('input') input: CreateUserDTO) {
    return this.authService.signup(input as any);
  }
}
