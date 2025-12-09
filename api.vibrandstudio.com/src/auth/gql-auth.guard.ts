import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator'; // 👈 import this

/**
 * GraphQL-aware JWT auth guard that honors the @Public decorator.
 */
@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * Allows public routes to bypass authentication.
   */
  canActivate(context: ExecutionContext) {
    // Checking if route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true; // skip auth check

    return super.canActivate(context);
  }

  /**
   * Extracts the HTTP request from the GraphQL execution context.
   */
  getRequest(context: ExecutionContext) {
    // Ensuring guard extracts the correct request from GraphQL context
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
