import { CardDTO, SetDTO } from '../../dto/set.dto';

export class ISetService {
	currentSet?: SetDTO;

	setNewCardIndex: (index: number) => void;

	addNewCard: (card: CardDTO) => Promise<CardDTO>;
}
