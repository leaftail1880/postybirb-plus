import { DefaultOptions } from '../../submission/default-options.interface';

export interface PatreonNotificationOptions extends DefaultOptions {
  tiers: string[];
  charge: boolean;
  schedule?: string; // as date string
  teaser?: string;
}
