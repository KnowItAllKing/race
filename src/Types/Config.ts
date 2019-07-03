import { Plugin } from './Plugin';

export type Config = {
	id: string;
	enabledPlugins: Plugin[];
	prefix: string;
};
