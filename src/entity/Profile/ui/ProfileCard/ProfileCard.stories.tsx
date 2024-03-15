import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Country } from '@/entity/Country';
import { Currency } from '@/entity/Currency';
import AvatarImg from '@/shared/assets/tests/Avatar.jpeg';
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
            photo: AvatarImg,
        },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Light = Template.bind({});

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const WithError = Template.bind({});
WithError.args = {
    error: ProfileErrors.SERVER_ERROR,
};

export const WithLodading = Template.bind({});
WithLodading.args = {
    isLoading: true,
};
