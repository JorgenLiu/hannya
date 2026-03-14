import { contextBridge, ipcRenderer } from 'electron';
import type { BootstrapSnapshot } from '@hennya/shared';

const api = {
  getBootstrapData: (): Promise<BootstrapSnapshot> =>
    ipcRenderer.invoke('app:get-bootstrap-data')
};

contextBridge.exposeInMainWorld('hennyaApi', api);