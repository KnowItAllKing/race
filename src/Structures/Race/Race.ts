import { Client, ClientOptions } from 'discord.js';

// import { EruStorage } from './Storage';
import { EruOptions } from './Misc/Options';
import { EruStates } from './Misc/States';
import { LoggingManager } from '../Logging/Main';
import { EmbedCreator } from './Embed/EmbedCreator';
import { UsageManager } from '../Usage/UsageManager';
import { ClientColors } from '../../Types/Colors';
import { Handlers } from './Bot/Handlers';

export class RaceClient extends Client {
	// public storage: EruStorage;
	public state: EruStates;
	public reference: {
		owners: string[];
		colors: ClientColors;
	};
	public handlers: Handlers;
	public embed: { creator: EmbedCreator };
	public log: LoggingManager;
	public usage: UsageManager;

	constructor(options: EruOptions, cOptions: ClientOptions) {
		super(cOptions);

		this.state = EruStates.NONE;

		// this.storage = new EruStorage(this);

		this.token = options.token;

		this.log = new LoggingManager(this);

		this.handlers = new Handlers(this);

		this.handlers.load(options.commands, options.events);

		this.reference = {
			owners: options.owners,
			colors: options.colors
		};

		this.embed = {
			creator: new EmbedCreator(this)
		};

		this.usage = new UsageManager(this);

		this.init();

		this.on('ready', () => {
			this.state = EruStates.READY;
			this.log.botInfo('Ready!');
			this.usage.cycle();
		});
	}
	private async init() {
		// try {
		// 	await mongoose.connect(this.reference.db, {
		// 		useFindAndModify: false,
		// 		useNewUrlParser: true
		// 	});
		// } catch (e) {
		// 	throw new Error(
		// 		`Error connecting to the specified MongoDB: \n${e}`
		// 	);
		// }
		this.state = EruStates.INIT;
	}
	public start() {
		// this.storage.load();
		this.login(this.token!);
		this.state = EruStates.START;
		return this;
	}
	public get ready() {
		return this.state === EruStates.READY;
	}
}
