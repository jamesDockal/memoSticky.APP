import axios, { AxiosInstance } from 'axios';
import { IHttp } from './http.interface';

export class HttpService implements IHttp {
	constructor(private readonly hanlder: AxiosInstance) {}

	async get<T>(path: string): Promise<T> {
		try {
			const response = await this.hanlder.get(path);

			return response.data;
		} catch (error) {
			console.log('get', error);
		}
	}
	async post<T>(path: string, data: unknown): Promise<T> {
		try {
			const response = await this.hanlder.post(path, data);
			console.log('1', response.data);

			return response.data;
		} catch (error) {
			console.log('post', error);
		}
	}

	async put<T>(path: string, data: unknown): Promise<T> {
		try {
			const response = await this.hanlder.put(path, data);
			console.log('2', response.data);
			return response.data;
		} catch (error) {
			console.log('put', error);
		}
	}
}
