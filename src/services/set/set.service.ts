import { IStorageHandler } from '../../adapters/storage/storage-handler.interface';
import { CardDTO, SetDTO, SetModel } from '../../dto/set.dto';
import { mockSetKey } from '../../mock';
import { IHttp } from '../http/http.interface';
import { StorageService } from '../storage/storage.service';
import { ISetService } from './set.interface';

// TODO: remover  e fazer ficar em splash screen até terminar esse loading inicial
const DEFAULT_SET: SetDTO = {
	// name: mockSetKey,
	id: '',
	name: 'name',
	currentCardIndex: 0,
	cards: [
		{
			term: '',
			meaning: '',
		} as any,
	],
};

export class SetService extends StorageService<SetDTO> implements ISetService {
	public currentSet: SetDTO;
	public localStorageKey: string = mockSetKey;
	public localSet: SetDTO = DEFAULT_SET;

	constructor(
		storageHandler: IStorageHandler,
		private readonly httpService: IHttp
	) {
		super(storageHandler);

		this.getFromStorage().then((set) => {
			this.localSet = set || DEFAULT_SET;
		});
	}

	async getAllSets(): Promise<SetModel[]> {
		const sets = await this.httpService.get<SetModel[]>('/set');

		return sets;
	}

	async getSetInfo(setId: string): Promise<SetDTO> {
		const set = await this.httpService.get<SetDTO>(`/set/${setId}`);
		// this.saveProperty(this.localStorageKey, 'cards', set.cards);

		// const currentSet = await super.getCards(this.localStorageKey);

		// this.currentSet = currentSet;

		// if (
		// 	currentSet &&
		// 	((!currentSet?.currentCardIndex && currentSet?.currentCardIndex !== 0) ||
		// 		currentSet?.currentCardIndex > currentSet.cards.length)
		// ) {
		// 	await this.saveProperty(this.localStorageKey, 'currentCardIndex', 0);
		// }

		return set;
	}

	async getFromStorage(): Promise<SetDTO> {
		return await super.getCards(this.localStorageKey);
	}

	async setNewCardIndex(setId: string,newCurrentCardIndex: number) {

		return await this.httpService.put(`/set/${setId}`, { 
			currentCardIndex: newCurrentCardIndex || 0
		 });

		// await this.saveProperty(
		// 	this.localStorageKey,
		// 	'currentCardIndex',
		// 	newCurrentCardIndex
		// );
	}

	async addNewCard(card: CardDTO): Promise<CardDTO> {
		if (card.id) {
			return await this.httpService.put(`/card/${card.id}`, { data: card });
		} else {
			return await this.httpService.post('/card', { data: card });
		}
	}

	async deleteCard(id: string | number): Promise<void> {
		return await this.httpService.delete(`/card/${id}`);
	}
}
