import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { UserRoles } from '../types/userSchema';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

export const getIsUserAdmin = createSelector(getUserRoles, (roles) => roles?.includes(UserRoles.ADMIN));
export const getIsUserManager = createSelector(getUserRoles, (roles) => roles?.includes(UserRoles.MANAGER));
