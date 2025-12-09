import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { REQUIRED_ACCESS_LEVEL } from './access.decorator';
import { IS_PUBLIC_KEY } from './public.decorator';

/**
 * Guard enforcing access-level checks after JWT authentication.
 */
@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * Verifies user authentication and required access level metadata.
   * @throws ForbiddenException when user lacks sufficient privileges.
   */
  canActivate(context: ExecutionContext): boolean {
    // Check if route is public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (isPublic) {
      return true;
    }

    // Get required access level from decorator
    const requiredAccessLevel = this.reflector.getAllAndOverride<number>(
      REQUIRED_ACCESS_LEVEL,
      [context.getHandler(), context.getClass()]
    );

    // If no access level specified, allow access (already authenticated via JWT)
    if (requiredAccessLevel === undefined) {
      return true;
    }

    // Get user from GraphQL context
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Check if user has sufficient access level
    if (user.accessLevel < requiredAccessLevel) {
      throw new ForbiddenException(
        `Insufficient access level. Required: ${requiredAccessLevel}, Current: ${user.accessLevel}`
      );
    }

    return true;
  }
}