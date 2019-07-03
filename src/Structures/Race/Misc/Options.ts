// import { Router } from 'express';
import { ClientColors } from '../../../Types/Colors';
import { Event } from '../Bot/Event';
import { Command } from '../Bot/Command';

export interface EruOptions {
	token: string | null;
	owners: string[];
	colors: ClientColors;
	commands: Command[];
	events: Event[];
}
// export interface ServerOptions {
// 	port: number;
// 	routes: Router[];
// }
