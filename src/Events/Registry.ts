import { Ready } from './Ready';
import { ShardReady } from './ShardReady';
import { Event } from '../Structures/Race/Bot/Event';
import { Message } from './Message';
import { GuildJoin } from './GuildJoin';

export default ([Ready, ShardReady, Message, GuildJoin] as unknown) as Event[];
