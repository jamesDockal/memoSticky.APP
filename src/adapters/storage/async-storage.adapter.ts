import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { IStorageHandler } from './storage-handler.interface';

export class AsyncStorageAdapter implements IStorageHandler {
	async save<T>(key: string, data: T): Promise<void> {
		await ReactNativeAsyncStorage.setItem(key, JSON.stringify(data));
	}

	async saveProperty<T>(key: string, data: [keyof T]): Promise<void> {
		const alredySavedData = await this.fetch(key);
		alredySavedData[data];
	}

	async fetch<T>(key: string): Promise<T> {
		const result = await ReactNativeAsyncStorage.getItem(key);
		return JSON.parse(result);
	}
}
