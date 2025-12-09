declare module 'virtual:pwa-register' {
  export function registerSW(options?: {
    immediate?: boolean;
    onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void;
    onRegisterError?: (error: any) => void;
  }): void;
}
