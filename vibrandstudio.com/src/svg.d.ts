/**
 * Type declaration for importing SVG files as React components.
 *
 * This allows using the syntax:
 * ```ts
 * import Logo from './logo.svg?react';
 * <Logo width={50} height={50} />
 * ```
 *
 * - The `?react` suffix is required to tell the bundler to return a React component.
 * - Provides full typing for `SVGSVGElement` props.
 */
declare module '*.svg?react' {
  import * as React from 'react';
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
