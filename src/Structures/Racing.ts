import t2p from 'text2png';

import quotes from '../quotes.json';

type Quote = {
	body: string;
	author: string;
};

const RandomQuote = () => Math.floor(Math.random() * quotes.length);

export class Racing {
	public quote: Quote;
	public file?: Buffer;
	public modified?: string;
	public constructor() {
		this.quote = quotes[RandomQuote()];
	}
	public splitString() {
		var str = this.quote.body;
		var result = '';
		var current = 0;
		const num = 15;
		while (current < str.length) {
			var value = str.indexOf(' ', current + num);
			result += str.substring(0, value) + '\n';
			str = str.substring(value);
			current += value;
		}
		this.modified = result + str.trim();
		return this;
	}
	public toImage() {
		this.file = t2p(this.modified || this.quote.body, {
			font: '20px arial',
			padding: 5
		});
		return this;
	}
}

export type Result = {
	person: string;
	tag: string;
	avatar: string;
	score: number;
	place: number;
};
