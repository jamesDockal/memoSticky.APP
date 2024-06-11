import { IStorageHandler } from '../../adapters/storage/storage-handler.interface';
import { IStorageService } from './storage-service.interface';

export class StorageService<T> implements IStorageService<T> {
	constructor(private readonly storageHandler: IStorageHandler) {}

	async save(key: string, data: T | []): Promise<void> {
		await this.storageHandler.save<T>(key, data);
	}

	async saveProperty<I extends keyof T>(
		key: string,
		property: I,
		data: T[I]
	): Promise<void> {
		await this.storageHandler.saveProperty<T>(key, property, data);
	}

	async getCards(key: string): Promise<T> {
		return await this.storageHandler.fetch<T>(key);
	}
}
