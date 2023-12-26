import { Card } from '../dto/card.dto';
import { StorageService } from '../services/storage/storage.service';
import { StorageFactory } from './storage.factory';

const key = process.env.SET_STORAGE_KEY || 'SET_STORAGE_KEY';

export const EdtiSetStorageService = new StorageService<Card>(
	StorageFactory,
	key
);
