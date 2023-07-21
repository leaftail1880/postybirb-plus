import { app, clipboard, getCurrentWindow, session, shell } from '@electron/remote';
import { contextBridge } from 'electron';

// Authorizers
const Tumblr = require('./authorizers/tumblr.auth');
const DeviantArt = require('./authorizers/deviant-art.auth');

const _setImmediate = setImmediate;
const _clearImmediate = clearImmediate;
const _Buffer = Buffer;
process.once('loaded', () => {
  global.setImmediate = _setImmediate;
  global.clearImmediate = _clearImmediate;
  global.Buffer = _Buffer;
});

const current = getCurrentWindow() as any;
contextBridge.exposeInMainWorld('PORT', current.PORT);
contextBridge.exposeInMainWorld('AUTH_ID', current.AUTH_ID);
contextBridge.exposeInMainWorld('IS_DARK_THEME', current.IS_DARK_THEME);
contextBridge.exposeInMainWorld('AUTH_SERVER_URL', current.AUTH_SERVER_URL);
contextBridge.exposeInMainWorld('appVersion', app.getVersion());
contextBridge.exposeInMainWorld('process', { env: { NODE_ENV: current.NODE_ENV } });
contextBridge.exposeInMainWorld('electron', {
  clipboard: {
    availableFormats: clipboard.availableFormats,
    read() {
      const ni = clipboard.readImage();
      const arr = new Uint8Array(ni.toPNG());
      const blob = new Blob([arr], { type: 'image/png' });
      return new File([blob], 'Clipboard Image.png', {
        lastModified: Date.now(),
        type: 'image/png',
      });
    },
  },
  session: {
    getCookies(accountId: string) {
      return session.fromPartition(`persist:${accountId}`).cookies.get({});
    },
    clearSessionData(id: string) {
      return session.fromPartition(`persist:${id}`).clearStorageData();
    },
  },
  shell: {
    openInBrowser(url: string) {
      return shell.openExternal(url);
    },
  },
  kill: () => app.quit(),
  auth: {
    Tumblr,
    DeviantArt,
  },
});
