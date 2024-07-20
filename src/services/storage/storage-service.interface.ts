export class IStorageService<T> {
	save: <K extends keyof T>(key: K, data: T[K]) => Promise<void>;
	saveProperty: (
		key: string,
		property: keyof T,
		data: T[keyof T]
	) => Promise<void>;
	fetch: <K extends keyof T>(key: string) => Promise<T[K]>
}
