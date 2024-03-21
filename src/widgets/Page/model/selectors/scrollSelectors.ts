import { StateSchema } from '@/app/providers/StoreProvider';

export const selectScrollPositions = (state: StateSchema) => state.scroll.positions;
export const selectScrollPositionByPath = (state: StateSchema, path: string) =>
    state.scroll.positions[path] ?? 0;
