export abstract class IHttp {
	get: <T>(path: string) => Promise<T>;
	post: <T>(path: string, data: unknown) => Promise<T>;
	put: <T>(path: string, data: unknown) => Promise<T>;
	delete: <T>(path: string) => Promise<T>;
}
