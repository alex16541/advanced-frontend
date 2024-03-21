import { Meta, StoryObj } from '@storybook/react';

import { Country } from '@/entity/Country';
import { Currency } from '@/entity/Currency';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

import ProfilePage from './ProfilePage';

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    decorators: [
        StoreDecorator({
            editableProfileCard: {
                form: {
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
        }),
    ],
} as Meta<typeof ProfilePage>;

type Story = StoryObj<typeof ProfilePage>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
