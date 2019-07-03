import { Event } from '../Structures/Race/Bot/Event';
import { RaceClient } from '../Structures/Race/Race';

export class Ready extends Event {
	constructor() {
		super('ready');
	}
	public async execute(client: RaceClient) {
		client.log.botInfo(`Logged in as ${client.user!.tag}`);
		// await client.reference.server.start();
	}
}
