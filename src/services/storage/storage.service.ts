import { IStorageHandler } from '../../adapters/storage/storage-handler.interface';
import { IStorageService } from './storage-service.interface';

export class StorageService<T> implements IStorageService<T> {
	constructor(private readonly storageHandler: IStorageHandler) {}

	async save(key: string, data: T | []): Promise<void> {
		await this.storageHandler.save<T>(key, data);
	}

	async fetch(key: string): Promise<T> {
		return await this.storageHandler.fetch<T>(key);
	}
}
