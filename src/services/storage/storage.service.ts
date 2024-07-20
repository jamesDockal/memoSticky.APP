import { IStorageHandler } from '../../adapters/storage/storage-handler.interface';
import { IStorageService } from './storage-service.interface';

export class StorageService<T> implements IStorageService<T> {
	constructor(private readonly storageHandler: IStorageHandler<T>) {}

	async save<K extends keyof T>(key: K, data: T[K]  ): Promise<void> {
		await this.storageHandler.save(key, data);
	}

	async saveProperty<I extends keyof T>(
		key: string,
		property: I,
		data: T[I]
	): Promise<void> {
		await this.storageHandler.saveProperty(key, property, data);
	}

	async fetch<K extends keyof T>(key: string): Promise<T[K]> {
		return await this.storageHandler.fetch(key);
	}
}
