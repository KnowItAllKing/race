import { PermissionResolvable, Message } from 'discord.js';
import { RaceClient } from '../Race';

export interface CommandOptions {
	name: string;
	description: string;
	usage: string;
	sender: PermissionResolvable[];
	client: PermissionResolvable[];
	category: string;
	ownerOnly: boolean;
}

export abstract class Command {
	public name: string;
	public description: string;
	public usage: string;
	public sender: PermissionResolvable[];
	public client: PermissionResolvable[];
	public category: string;
	public ownerOnly: boolean;
	public constructor(options: CommandOptions) {
		const {
			name,
			description,
			usage,
			sender,
			client,
			category,
			ownerOnly
		} = options;
		this.name = name;
		this.description = description;
		this.usage = usage;
		this.sender = sender;
		this.client = client;
		this.category = category;
		this.ownerOnly = ownerOnly;
	}
	public run(client: RaceClient, message: Message, args: string[]) {
		if (
			this.ownerOnly &&
			!client.reference.owners.includes(message.author!.id)
		)
			return;

		if (!message.member!.hasPermission(this.sender))
			return client.embed.creator.permissions(
				this,
				false,
				message.author!.displayAvatarURL()
			);

		if (!message.guild!.me!.hasPermission(this.client))
			return client.embed.creator.permissions(
				this,
				true,
				client.user!.displayAvatarURL()
			);

		this.execute(client, message, args);
	}
	public execute(client: RaceClient, message: Message, args: string[]) {}
}
