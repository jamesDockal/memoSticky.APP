export interface CardDTO {
	term: string;
	meaning: string;
	id: string | number;
}

export interface SetDTO {
	name: string;
	currentCardIndex: number;
	cards: CardDTO[];
}
