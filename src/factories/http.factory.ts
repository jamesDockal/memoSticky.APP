import { HttpService } from '../services/http/http.service';
import axios from 'axios';

const { EXPO_PUBLIC_API_URL } = process.env;

const instance = axios.create({
	baseURL: EXPO_PUBLIC_API_URL
});

export const httpService = new HttpService(instance);
