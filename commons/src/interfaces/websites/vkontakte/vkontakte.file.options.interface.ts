import { DefaultFileOptions } from '../../submission/default-options.interface';

export interface VKontakteFileOptions extends DefaultFileOptions {
  silent: boolean;
  walls: string[];
}
