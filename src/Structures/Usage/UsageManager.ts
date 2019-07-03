import { RaceClient } from '../Race/Race';
import * as util from 'node-os-utils';

export interface ClientUsage {
	CPU: string;
	USED: string;
	TOTAL: string;
	MEM: string;
	PERCENT: string;
}

export class UsageManager {
	public current: ClientUsage;
	constructor(public client: RaceClient) {
		this.client = client;
		this.current = {
			CPU: '',
			USED: '',
			TOTAL: '',
			MEM: '',
			PERCENT: ''
		};
	}
	public async cycle() {
		this.stats(this.client);
		setInterval(() => this.stats(this.client), 3e5);
	}
	public async stats(client: RaceClient) {
		const cpu = await util.cpu.usage();
		const {
			totalMemMb,
			usedMemMb
		}: { totalMemMb: number; usedMemMb: number } = await util.mem.used();
		const model = util.cpu.model();
		this.current = {
			CPU: model,
			USED: `${usedMemMb} MB`,
			TOTAL: `${totalMemMb} MB`,
			MEM: `${((usedMemMb / totalMemMb) * 100).toFixed(1)}%`,
			PERCENT: `${cpu}%`
		};
		client.log.botInfo('Updated stats');
	}
	public get usage() {
		return this.current;
	}
}
