import { CardDTO, SetDTO, SetModel } from '../../dto/set.dto';

export class ISetService {
	currentSet?: SetDTO;
	setNewCardIndex: (setId: string, index: number) => void;
	addNewCard: (card: CardDTO) => Promise<CardDTO>;
	deleteCard: (id: string | number) => Promise<void>;
	getAllSets: () => Promise<SetModel[]>;
	getCurrentSetInfo: (setId: string) => Promise<SetDTO>;
}
