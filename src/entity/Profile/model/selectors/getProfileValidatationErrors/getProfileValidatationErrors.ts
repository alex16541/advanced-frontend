import { StateSchema } from 'app/providers/StoreProvider';

export const getProfileValidatationErrors = (state: StateSchema) => state.profile?.validateErrors || [];
