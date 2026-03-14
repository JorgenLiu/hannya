/// <reference types="vite/client" />

import type { BootstrapSnapshot } from '@hennya/shared';

declare global {
  interface Window {
    hennyaApi: {
      getBootstrapData: () => Promise<BootstrapSnapshot>;
    };
  }
}

export {};