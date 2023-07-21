import { DefaultFileOptions } from '../../submission/default-options.interface';

export interface VKontakteNotificationOptions extends DefaultFileOptions {
  silent: boolean;
  walls: string[];
}
