import { Event } from '../Structures/Race/Bot/Event';
import { RaceClient } from '../Structures/Race/Race';

export class ShardReady extends Event {
	constructor() {
		super('shardReady');
	}
	public async execute(client: RaceClient, id: number) {
		client.log.botInfo(`Shard ${id} is ready.`);
	}
}
