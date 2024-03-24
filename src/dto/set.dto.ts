export interface CardDTO {
	term: string;
	meaning: string;
	meaningTip: string | null;
	termTip: string | null;
	id: string | number;
	imageUrl: string;
}

export interface SetDTO {
	name: string;
	currentCardIndex: number;
	cards: CardDTO[];
}
