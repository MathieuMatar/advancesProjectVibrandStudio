import { SetMetadata } from '@nestjs/common';

export const REQUIRED_ACCESS_LEVEL = 'requiredAccessLevel';

/**
 * Decorator to set the minimum required access level for a resolver/route
 * @param level - The minimum access level required (integer)
 * @example @Access(1) - Only users with accessLevel >= 1 can access
 */
export const Access = (level: number) => SetMetadata(REQUIRED_ACCESS_LEVEL, level);