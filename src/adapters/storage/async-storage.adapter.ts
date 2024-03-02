import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { IStorageHandler } from './storage-handler.interface';

export class AsyncStorageAdapter implements IStorageHandler {
	async save<T>(key: string, data: T): Promise<void> {
		await ReactNativeAsyncStorage.setItem(key, JSON.stringify(data));
	}

	async saveProperty<T, I extends keyof T>(
		key: string,
		property: I,
		data: T[I]
	): Promise<void> {
		const item = (await this.fetch(key)) || {};
		item[property] = data;

		await this.save(key, item);
	}

	async fetch<T>(key: string): Promise<T> {
		const result = await ReactNativeAsyncStorage.getItem(key);
		return JSON.parse(result);
	}
}
