export interface Card {
	term: string;
	meaning: string;
	id: string | number;
}

export interface Set {
	name: string;
	currentCardIndex: number;
	cards: Card[];
}
