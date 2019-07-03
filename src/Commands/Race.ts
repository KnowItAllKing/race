import { Command } from '../Structures/Race/Bot/Command';
import { RaceClient } from '../Structures/Race/Race';
import { Message, MessageEmbed, Collection } from 'discord.js';
import { Racing, Result } from '../Structures/Racing';
import { compareTwoStrings } from 'string-similarity';

export class Race extends Command {
	public constructor() {
		super({
			name: 'race',
			description: 'A race command',
			usage: '"prefix" race',
			sender: ['SEND_MESSAGES'],
			client: [
				'SEND_MESSAGES',
				'EMBED_LINKS',
				'ATTACH_FILES',
				'MANAGE_MESSAGES'
			],
			category: 'Racing',
			ownerOnly: false
		});
	}
	public async execute(client: RaceClient, message: Message, args: string[]) {
		const race = new Racing().splitString().toImage();
		const avatar = message.author!.displayAvatarURL();

		// We ask the question
		const collected = await askRace(
			message,
			client.user!.id,
			client.reference.colors.success
		);
		if (!collected.size)
			return message.channel.send(
				'There were not enough people to start the race.'
			);

		// Get read, get set, get go!
		const m = await startRace(
			message,
			collected.size,
			avatar,
			client.reference.colors.success
		);

		// The race begins
		const msg = await message.channel.send(
			client.embed.creator.sendRace(race)
		);
		// The race is over
		const results = await startCollecting(
			msg as Message,
			collected.keyArray()
		);
		// Graded!
		const { winner, scores } = grade(race.quote.body, results);

		// And time to send!
		return message.channel.send(
			client.embed.creator.finishRace(winner, scores, race.quote.body)
		);
	}
}

const askRace = async (
	message: Message,
	id: string,
	color: string
): Promise<Collection<string, Message>> => {
	const embed = new MessageEmbed()
		.setAuthor('Ready to Race?', message.author!.displayAvatarURL())
		.setDescription(
			'To begin, at least one person needs to tag me in a message. The race will start in 30 seconds.'
		)
		.setColor(color);

	const m = await message.channel.send(embed);

	const collected = await message.channel.awaitMessages(
		(msg: Message) => new RegExp(`<@!?${id}>`).test(msg.content),
		{ time: 30e3 }
	);
	return collected;
};

const startRace = async (
	message: Message,
	size: number,
	avatar: string,
	color: string
) => {
	const embed = (time: number) =>
		new MessageEmbed()
			.setAuthor('The Race Begins!', avatar)
			.setDescription(
				`${size} people have signed up for this race. The subsequent messages sent by them will be counted as submissions. The race will start in ${time} seconds.`
			)
			.setColor(color);
	const m = <Message>await message.channel.send(embed(10));
	await sleep(7);
	await m.edit(embed(3));
	await sleep(1);
	await m.edit(embed(2));
	await sleep(1);
	await m.edit(embed(1));
	await sleep(1);
	return m;
};
const startCollecting = async (message: Message, people: string[]) => {
	const collected = await message.channel.awaitMessages(
		(m: Message) => people.includes(m.author!.id),
		{ time: 60e3, max: people.length }
	);
	return collected;
};

const grade = (original: string, people: Collection<string, Message>) => {
	const scores = new Collection<string, Result>();
	const toSort: Result[] = [];
	for (const [, { author, content }] of people) {
		const score = compareTwoStrings(content, original);
		const result = {
			person: author!.id,
			score,
			tag: author!.tag,
			avatar: author!.displayAvatarURL(),
			place: 0
		};
		scores.set(author!.id, result);
		toSort.push(result);
	}
	toSort.sort((a, b) => b.score - a.score);
	for (const rank in toSort) {
		const { score } = toSort[rank];
		toSort[rank].place = +rank + 1;
		toSort[rank].score = getScore(score);
		scores.set(toSort[rank].person, toSort[rank]);
	}
	return {
		winner: toSort[0],
		scores,
		toSort
	};
};

const getScore = number => Math.round(number / 0.2);
const sleep = (time: number) =>
	new Promise(resolve => setTimeout(() => resolve(), time * 1000));
