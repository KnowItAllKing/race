import { RaceClient } from '../Race';

export abstract class Event {
	constructor(public name: string) {
		this.name = name;
	}
	public async execute(client: RaceClient, ...any) {}
}
