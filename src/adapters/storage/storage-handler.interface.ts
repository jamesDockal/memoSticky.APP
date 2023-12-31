export class IStorageHandler {
	save: <T>(key: string, data: T | []) => Promise<void>;
	saveProperty: <T>(key: string, data: [keyof T]) => Promise<void>;
	fetch: <T>(key: string) => Promise<T>;
}
