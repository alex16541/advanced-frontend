import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfileIsReadonly = (state: StateSchema) => state.editableProfileCard?.readonly ?? true;
