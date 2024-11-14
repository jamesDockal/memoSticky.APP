import { HttpService } from '../services/http/http.service';
import axios from 'axios';

const { EXPO_PUBLIC_API_URL } = process.env;
console.log('EXPO_PUBLIC_API_URL', EXPO_PUBLIC_API_URL);
const instance = axios.create({
	baseURL: 'https://api-fnu2.onrender.com',
});

export const httpService = new HttpService(instance);
