import { RaceClient } from './Structures/Race/Race';

import { DefaultClientOptions } from './client';
import { EruColors } from './Colors';
import Commands from './Commands/Registry';
import Events from './Events/Registry';

import { token } from './config.json';

export const client = new RaceClient(
	{
		token,
		owners: ['517016133694521374'],
		colors: EruColors,
		commands: Commands,
		events: Events
	},
	DefaultClientOptions
).start();
