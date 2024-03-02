import { SetDTO } from '../dto/set.dto';
import { SetService } from '../services/set/set.service';
import { StorageService } from '../services/storage/storage.service';
import { httpService } from './http.factory';
import { StorageFactory } from './storage.factory';

export const setService = new SetService(StorageFactory, httpService);
