import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const [useCounter, getCounter] = buildSelector((state: StateSchema) => state.counter);
