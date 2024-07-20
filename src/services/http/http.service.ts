import axios, { AxiosInstance } from 'axios';
import { IHttp } from './http.interface';

// export function sleep(ms = 50000): Promise<void> {
// 	console.log('Kindly remember to remove `sleep`');
// 	return new Promise((resolve) => setTimeout(resolve, ms));
// }

export class HttpService implements IHttp {
	constructor(private readonly hanlder: AxiosInstance) {
		// hanlder.interceptors.response.use(async (response) => {
		// 	// add artificial delay for dev env
		// 	await sleep();
		// 	console.log('response', response);
		// 	// return response.data;
		// 	return response;
		// });
	}

	async get<T>(path: string): Promise<T> {
		const response = await this.hanlder.get(path);

		return response.data;
	}
	async post<T>(path: string, data: unknown): Promise<T> {
		const response = await this.hanlder.post(path, data);
		return response.data;
	}

	async put<T>(path: string, data: unknown): Promise<T> {
		const response = await this.hanlder.put(path, data);
		return response.data;
	}

	async delete<T>(path: string): Promise<T> {
		const response = await this.hanlder.delete(path);
		return response.data;
	}
}
