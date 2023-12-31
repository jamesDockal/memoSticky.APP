import { Set } from '../dto/set.dto';
import { SetService } from '../services/set/set.service';
import { StorageService } from '../services/storage/storage.service';
import { StorageFactory } from './storage.factory';

export const setService = new SetService();
