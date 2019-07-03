import { RaceClient } from '../Race';
import { MessageEmbed, Message, User } from 'discord.js';
import { Command } from '../Bot/Command';
import { Racing, Result } from '../../Racing';

export class EmbedCreator {
	public constructor(private client: RaceClient) {
		this.client = client;
	}
	public sendRace({ modified, file, quote }: Racing) {
		return new MessageEmbed()
			.setAuthor('Race!', this.client.user!.displayAvatarURL())
			.attachFiles([{ name: 'quote.png', attachment: file! }])
			.setImage('attachment://quote.png')
			.setFooter(quote.author)
			.setTimestamp()
			.setColor(this.client.reference.colors.success);
	}
	public finishRace(winner: Result, scores: any, text: string) {
		const [n1, n2, n3] = scores
			.first(3)
			.map((x, i) => `${i}. ${x.tag} - ${x.score}/5`);
		return new MessageEmbed()
			.setAuthor(`${winner.tag} wins!`, winner.avatar)
			.setDescription(n1 + n2 ? n2 : '' + n3 ? n3 : '')
			.addField('Original Text', text);
	}
	public permissions(command: Command, client: boolean, avatar: string) {
		const message = client
			? 'I have insufficient permissions to perform this command.'
			: 'You have insufficient permissions to perform this command.';
		return new MessageEmbed()
			.setTitle(`Error ${command.name}`)
			.setAuthor(message, avatar)
			.setColor(this.client.reference.colors.perms);
	}
	public usage(owner: boolean, avatar: string) {
		const { CPU, USED, TOTAL, MEM, PERCENT } = this.client.usage.usage;
		const embed = new MessageEmbed()
			.setAuthor(owner ? 'Usage (Owner Access)' : 'Usage', avatar)
			.addField('CPU', `Model: ${CPU}\nUsage: ${PERCENT}`, true)
			.addField('Memory', `Used: ${USED}\nTotal: ${TOTAL}\nUsage: ${MEM}`)
			.setColor(this.client.reference.colors.default);
		return embed;
	}
	public commands(
		categoryMap: { [key: string]: Command[] },
		owner: boolean,
		avatar?: string
	) {
		const embed = new MessageEmbed()
			.setAuthor(
				owner ? 'Help (Owner Access)' : 'Help',
				owner ? avatar : this.client.user!.displayAvatarURL()
			)
			.setColor(this.client.reference.colors.default);
		for (const category in categoryMap) {
			const commands = categoryMap[category];
			embed.addField(
				category,
				commands
					.filter(c => !c.ownerOnly)
					.map(c => `\`${c.name}\` - ${c.description}`)
					.join('\n'),
				true
			);
		}
		return embed;
	}
	public command(
		command: Command,
		owner: boolean,
		avatar: string,
		prefix: string
	) {
		if (command.ownerOnly && !owner)
			return this.permissions(command, false, avatar);
		const title = owner ? `${command.name} (Owner Access)` : command.name,
			picture = owner ? avatar : this.client.user!.displayAvatarURL();
		const embed = new MessageEmbed()
			.setAuthor(title, picture)
			.addField('Description', command.description, true)
			.addField('Usage', usageParser(command.usage, prefix), true)
			.addField(
				'Permissions to Use',
				`\`${command.sender.join('`, `')}\``,
				true
			)
			.addField(
				'Permissions I Need',
				`\`${command.client.join('`, `')}\``,
				true
			)
			.setColor(this.client.reference.colors.default);
		if (command.ownerOnly && owner)
			embed.addField('Owner Only', command.ownerOnly ? '✅' : '❌');
		return embed;
	}
	public queued(
		title: string,
		thumbnail: string,
		avatar: string,
		tag: string
	) {
		return new MessageEmbed()
			.setFooter(tag, avatar)
			.setDescription(`Added ${title} to the Queue`)
			.setImage(thumbnail);
	}
	public nowPlaying(
		title: string,
		thumbnail: string,
		avatar: string,
		tag: string
	) {
		return new MessageEmbed()
			.setFooter(tag, avatar)
			.setDescription(`Now Playing ${title}`)
			.setImage(thumbnail);
	}
}

const usageParser = (usage: string, prefix: string) =>
	usage.replace('"prefix"', prefix);
