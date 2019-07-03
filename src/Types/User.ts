export type User = {
	id: string;
	token: string;
	tag: string;
	avatar: string;
	guilds: [];
	expiration: number;
	refresh: string;
	current: string;
};
