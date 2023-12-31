import { IStorageHandler } from '../../adapters/storage/storage-handler.interface';
import { Set } from '../../dto/set.dto';
import { StorageService } from '../storage/storage.service';
import { ISetService } from './set-interface';

export class SetService extends StorageService<Set> implements ISetService {
	constructor(storageHandler: IStorageHandler) {
		super(storageHandler);
	}

	setNewCardIndex(index: number) {}
}
