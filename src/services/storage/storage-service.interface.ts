export class IStorageService<T> {
	save: (key: string, data: T) => Promise<void>;
	fetch: (key: string, data: T) => Promise<T>;
}
