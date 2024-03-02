import { IStorageHandler } from '../../adapters/storage/storage-handler.interface';
import { CardDTO, SetDTO } from '../../dto/set.dto';
import { mockSetKey } from '../../mock';
import { IHttp } from '../http/http.interface';
import { StorageService } from '../storage/storage.service';
import { ISetService } from './set.interface';

export class SetService extends StorageService<SetDTO> implements ISetService {
	public currentSet: SetDTO;

	constructor(
		storageHandler: IStorageHandler,
		private readonly httpService: IHttp
	) {
		super(storageHandler);
	}

	async fetch(key: string): Promise<SetDTO> {
		const cards = await this.httpService.get<CardDTO[]>('/card');
		await this.saveProperty(mockSetKey, 'cards', cards);

		const currentSet = await super.fetch(key);

		this.currentSet = currentSet;

		if (
			currentSet &&
			((!currentSet?.currentCardIndex && currentSet?.currentCardIndex !== 0) ||
				currentSet?.currentCardIndex > currentSet.cards.length)
		) {
			await this.saveProperty(mockSetKey, 'currentCardIndex', 0);
		}

		return { ...currentSet, cards };
	}

	async setNewCardIndex(key: string, newCurrentCardIndex: number) {
		if (newCurrentCardIndex >= this.currentSet.cards.length) {
			await this.saveProperty(key, 'currentCardIndex', 0);

			return 0;
		}

		await this.saveProperty(key, 'currentCardIndex', newCurrentCardIndex);
		return newCurrentCardIndex;
	}

	async addNewCard(card: CardDTO): Promise<CardDTO> {
		if (card.id) {
			return await this.httpService.put(`/card/${card.id}`, { data: card });
		} else {
			return await this.httpService.post('/card', { data: card });
		}
	}
}
