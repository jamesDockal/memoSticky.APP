import { IStorageHandler } from '../../adapters/storage/storage-handler.interface';
import { IStorageService } from './storage-service.interface';

export class StorageService<T> implements IStorageService<T> {
	constructor(
		private readonly storageHandler: IStorageHandler,
		private readonly key: string
	) {}

	async save(data: T | T[]): Promise<void> {
		await this.storageHandler.save<T>(this.key, data);
	}

	async fetchAll(): Promise<T[]> {
		return await this.storageHandler.fetchAll<T>(this.key);
	}
}
