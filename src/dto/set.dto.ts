export interface CardDTO {
	term: string;
	meaning: string;
	meaningTip: string | null;
	termTip: string | null;
	id: string | number;
	imageUrl?: string;
	setId: string;
}

export interface SetModel {
	id: string;
	name: string;
	currentCardIndex: number;
}

export interface SetDTO {
	// currentCardIndex: number;
	id: string;
	name: string;
	currentCardIndex: number;
	cards: CardDTO[];
}
