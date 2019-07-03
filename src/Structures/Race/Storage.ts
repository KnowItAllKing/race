// import { ConfigStore } from '../Storage/ConfigStore';
// import { UserStore } from '../Storage/UserStore';
// import { CaseStore } from '../Storage/CaseStore';
// import { QueueStore } from '../Storage/QueueStore';
// import { User as UserModel } from '../../Models/User';
// import { Config } from '../../Types/Config';
// import { Config as ConfigModel } from '../../Models/Config';
// import { User } from '../../Types/User';
// import { EruClient } from './Eru';

// import EventEmitter from 'events';

// export class EruStorage {
// 	public configs: ConfigStore;
// 	public users: UserStore;
// 	public change: EventEmitter;
// 	constructor(private client: EruClient) {
// 		this.client = client;
// 		this.configs = new ConfigStore();
// 		this.users = new UserStore();
// 		this.change = new EventEmitter();
// 		this.change.on('prefix', async (id: string, prefix: string) => {
// 			let old = this.configs.get(id)!;
// 			old.prefix = prefix;
// 			this.configs.set(id, old);
// 		});
// 		this.change.on('reload', () => this.load());
// 	}
// 	public async load() {
// 		const configs = ((await ConfigModel.find()) as any) as Config[];
// 		const users = ((await UserModel.find()) as any) as User[];

// 		for (const config of configs) this.configs.set(config.id, config);

// 		for (const user of users) this.users.set(user.id, user);
// 	}
// 	public async GetPrefix(id: string) {
// 		const { prefix } =
// 			this.configs.get(id)! ||
// 			((await ConfigModel.findOne({ id })) as any);
// 		return prefix;
// 	}
// 	public async NewGuild(id: string) {
// 		const config = new ConfigModel({
// 			id,
// 			enabledPlugins: [],
// 			prefix: 'e.'
// 		});
// 		this.configs.set(id, (config as any) as Config);
// 		return config.save();
// 	}
// 	public async ChangePrefix(id: string, prefix: string) {
// 		try {
// 			var newConfig = await ConfigModel.findOneAndUpdate(
// 				{ id },
// 				{ prefix }
// 			);
// 		} catch (e) {
// 			return e;
// 		}
// 		this.configs.set(id, (newConfig as any) as Config);
// 	}
// }
