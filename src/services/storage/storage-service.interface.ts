export class IStorageService<T> {
	save: (data: T) => Promise<void>;

	fetchAll: () => Promise<T[]>;
}
