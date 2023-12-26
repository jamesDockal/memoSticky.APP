export class IStorageHandler {
	save: <T>(key: string, data: T | T[]) => Promise<void>;
	fetchAll: <T>(key: string) => Promise<T[]>;
}
