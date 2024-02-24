import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Country } from 'entity/Country';
import { Currency } from 'entity/Currency';
import AvatarImg from 'shared/assets/tests/Avatar.jpeg';
import ProfilePage from './ProfilePage';

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

export const Light = Template.bind({});
Light.decorators = [StoreDecorator({
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
            photo: AvatarImg,
        },
    },
})];

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK), ...Light.decorators];
