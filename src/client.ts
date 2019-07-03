import { ClientOptions } from 'discord.js';

export const DefaultClientOptions: ClientOptions = {
	messageCacheMaxSize: -1,
	messageCacheLifetime: 0,
	messageSweepInterval: 7200,
	fetchAllMembers: true,
	restWsBridgeTimeout: 10000,
	restTimeOffset: 700,
	restSweepInterval: 240,
	retryLimit: 10,
	disabledEvents: ['TYPING_START'],
	ws: {
		large_threshold: 1000,
		compress: true
	}
};
