import { Meta, StoryObj } from '@storybook/react';

import { Country } from '@/entity/Country';
import { Currency } from '@/entity/Currency';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import { ProfileErrors } from '../../model/consts/profile';

import { ProfileCard } from './ProfileCard';

export default {
    title: 'entity/ProfileCard',
    component: ProfileCard,
    args: {
        data: {
            username: 'MarkLi!993',
            firstname: 'Mark',
            lastname: 'Li',
            age: 30,
            email: 'mark@gamil.com',
            phone: '398759384',
            city: 'Uolden',
            country: Country.USA,
            currency: Currency.USD,
            photo: 'tests/Avatar.jpeg',
        },
    },
} as Meta<typeof ProfileCard>;

type Story = StoryObj<typeof ProfileCard>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const WithError: Story = {
    args: {
        error: ProfileErrors.SERVER_ERROR,
    },
};

export const WithLodading: Story = {
    args: {
        isLoading: true,
    },
};
