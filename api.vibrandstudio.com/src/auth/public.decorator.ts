import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Marks a route/resolver as publicly accessible (skips JWT/auth guards).
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
