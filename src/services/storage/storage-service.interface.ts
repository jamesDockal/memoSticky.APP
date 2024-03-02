export class IStorageService<T> {
	save: (key: string, data: T) => Promise<void>;
	saveProperty: (
		key: string,
		property: keyof T,
		data: T[keyof T]
	) => Promise<void>;
	fetch: (key: string, data: T) => Promise<T>;
}
