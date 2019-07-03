import { ShardingManager } from 'discord.js';
import { token } from './config.json';

export const manager = new ShardingManager('./Main.js', {
	token,
	totalShards: 'auto'
});

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
