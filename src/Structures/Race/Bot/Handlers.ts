import { RaceClient } from '../Race';
import { Command } from './Command';
import { Event } from './Event';
import { Collection, Message } from 'discord.js';

export class Handlers {
	private commands: Collection<string, Command>;
	private events: Collection<string, Event>;
	public constructor(private client: RaceClient) {
		this.client = client;
		this.commands = new Collection();
		this.events = new Collection();
	}
	public isCommand(cmd: string) {
		return this.commands.has(cmd);
	}
	public load(commands: Command[] | any, events: Event[] | any) {
		for (const command of commands)
			this.commands.set(command.name, command);

		this.client.log.botInfo(
			`${this.commands.size}/${commands.length} commands were loaded.`
		);
		for (const ev of events) {
			const event: Event = new ev();
			this.client.on(event.name, (...params: any) =>
				event.execute(this.client, ...params)
			);
			this.events.set(ev.name, event);
		}
		this.client.log.botInfo(
			`${this.events.size}/${events.length} events were loaded.`
		);
	}
	public async message(message: Message) {
		if (!message.guild) return;
		if (message.author!.bot) return;
		// const prefix = await this.client.storage.GetPrefix(message.guild.id);
		const prefix = '-r ';
		if (
			!message.content
				.trim()
				.toLowerCase()
				.startsWith(prefix)
		)
			return;
		const args = message.content
			.trim()
			.slice(prefix.length)
			.split(/\s+/g);
		const command = args.shift()!.toLowerCase();
		if (!this.isCommand(command)) return;
		this.commands
			.get(command)!
			.run(message.client as RaceClient, message, args);
	}
}
