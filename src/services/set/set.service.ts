import { IStorageHandler } from '../../adapters/storage/storage-handler.interface';
import { CardDTO, SetDTO, SetModel } from '../../dto/set.dto';
import { mockSetKey } from '../../mock';
import { IHttp } from '../http/http.interface';
import { StorageService } from '../storage/storage.service';
import { ISetService } from './set.interface';

interface ILocalData {
	allSets: SetModel[];
	currentSet: SetDTO;
	"current-set-id": {
		setId: string
	}
}

export class SetService implements ISetService {
	public currentSet: SetDTO;
	public localStorageKey: string = mockSetKey;

	public localData: ILocalData = {} as ILocalData;

	constructor(
		private readonly storageService: StorageService<ILocalData>,
		private readonly httpService: IHttp
	) {
		this.setStorageData();
	}

	async setStorageData() {
		this.localData.allSets = (await this.storageService.fetch('allSets')) || [];

		const currentSetId = await this.storageService.fetch('current-set-id') 
		if(currentSetId){
				this.localData.currentSet = await this.getSetFromStorage(currentSetId.setId) || {}
		}else{
			let newSet = this.localData.allSets[0]

				await this.storageService.save('current-set-id',{
					setId: newSet?.id
				}) 
	
				const teste = await this.getSetFromStorage(newSet.id)
	
				this.localData.currentSet = teste
			}
	}

	async getAllSets(): Promise<SetModel[]> {
		try {
			const sets = await this.httpService.get<SetModel[]>('/set');
			await this.storageService.save('allSets', sets);
			this.localData.allSets = sets;
			return sets;
		} catch (error) {
			return this.localData.allSets || [];
		}
	}

	async getCurrentSetInfo(setId: string): Promise<SetDTO> {
		try {
			const set = await this.httpService.get<SetDTO>(`/set/${setId}`);

			await this.storageService.save('current-set-id',{
				setId: setId
			}) 
			
			await this.storageService.save(`set-${setId}` as any, set);

			return set;
		} catch (error) {
			const localSet = (await this.storageService.fetch(
				`set-${setId}`
			)) as SetDTO;
			if (localSet) {
				return localSet;
			}

			return {
				currentCardIndex: 0,
				id: setId,
				cards: [],
				name: '',
			} as SetDTO;
		}
	}

	async setNewCardIndex(setId: string, newCurrentCardIndex: number) {
		try {
			await this.storageService.saveProperty(
				`set-${setId}`,
				'currentCardIndex',
				newCurrentCardIndex
			);

			return await this.httpService.put(`/set/${setId}`, {
				currentCardIndex: newCurrentCardIndex || 0,
			});
		} catch (error) {
			
		}
	}

	async addNewCard(card: CardDTO): Promise<CardDTO> {
		if (card.id) {
			const response = await this.httpService.put(`/card/${card.id}`, {
				data: card,
			});

			return response;
		} else {
			return await this.httpService.post('/card', { data: card });
		}
	}

	async deleteCard(id: string | number): Promise<void> {
		return await this.httpService.delete(`/card/${id}`);
	}

	async getSetFromStorage(setdId?: string): Promise<SetDTO> {
		const setId = setdId || this.localData?.currentSet?.id;
		return (await this.storageService.fetch(`set-${setId}`)) as SetDTO;
	}

	async setIsWritingMeaning (setId, value: boolean) {
		return await this.storageService.save(
			`writing-meaning-${setId}`,
			{
				value
			}
		);
	}

	async getIsWritingMeaning (setId) {
		return await this.storageService.fetch(
			`writing-meaning-${setId}`
		)
	}

}
