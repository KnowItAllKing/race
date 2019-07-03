import { Event } from '../Structures/Race/Bot/Event';
import { RaceClient } from '../Structures/Race/Race';
import { Guild } from 'discord.js';

export class GuildJoin extends Event {
	constructor() {
		super('guildCreate');
	}
	public async execute(client: RaceClient, guild: Guild) {
		// client.storage.NewGuild(guild.id);
		client.log.botInfo(`New guild joined: ${guild}`);
	}
}
