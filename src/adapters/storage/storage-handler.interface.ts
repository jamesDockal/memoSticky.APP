export class IStorageHandler {
	save: <T>(key: string, data: T | []) => Promise<void>;
	saveProperty: <T>(
		key: string,
		property: keyof T,
		data: T[keyof T]
	) => Promise<void>;
	fetch: <T>(key: string) => Promise<T>;
}
