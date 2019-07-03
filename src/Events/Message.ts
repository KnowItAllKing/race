import { Event } from '../Structures/Race/Bot/Event';
import { RaceClient } from '../Structures/Race/Race';
import { Message as Msg } from 'discord.js';

export class Message extends Event {
	constructor() {
		super('message');
	}
	public async execute(client: RaceClient, message: Msg) {
		client.handlers.message(message);
	}
}
