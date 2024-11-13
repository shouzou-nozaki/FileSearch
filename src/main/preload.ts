// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { Console } from 'console';
import {contextBridge, ipcRenderer, IpcRendererEvent, clipboard  } from 'electron';
import { cli } from 'webpack';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {

    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },

    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },

    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    
  },
  fileSearch:{
    // ファイル検索
    searchFiles: (dir_root:string, searchText: string) => ipcRenderer.invoke('fileservice-searchFiles', dir_root, searchText),
  },
  clipboard: {
    // パスをコピー
    copyPath: (path: string) => ipcRenderer.invoke('clipboard:copy', path),
  },
  getPath:{
    // ローカルパス取得
    getPath:() => ipcRenderer.invoke('getLocalPath'),
  }

};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
