import { create } from 'zustand';
import type { BootstrapSnapshot } from '@hennya/shared';

type BootstrapStatus = 'idle' | 'loading' | 'ready' | 'error';

type AppStore = {
  status: BootstrapStatus;
  snapshot: BootstrapSnapshot | null;
  loadBootstrap: () => Promise<void>;
};

export const useAppStore = create<AppStore>((set) => ({
  status: 'idle',
  snapshot: null,
  loadBootstrap: async () => {
    set({ status: 'loading' });

    try {
      const snapshot = await window.hennyaApi.getBootstrapData();
      set({ snapshot, status: 'ready' });
    } catch (error) {
      console.error('Failed to load bootstrap snapshot', error);
      set({ status: 'error' });
    }
  }
}));