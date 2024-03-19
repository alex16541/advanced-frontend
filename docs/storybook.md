## Storybook

В проекте для каждого компонента описываются стори-кейсы.
Запросы на сервер мокаются с помощью storybook-addon-mock.

Файл со сторикейсами создается с расширением .stories.tsx рядом с компонентом 

Запустить сторибук можно командой:
- `npm run storybook`

Пример:

```typescript jsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { Button, ButtonSize, ButtonTheme } from './Button';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Button>;

type Story = StoryObj<Button>;

export const Primary: Story = {
    args: {
        children: 'Text',
    },
};

export const PrimaryDark: Story = {
    args = {
        children: 'Button',
        theme: ButtonThemes.PRIMARY,
    },
    decorators: [
        ThemeDecorator(Theme.DARK)
    ],
};

export const Clear: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.CLEAR,
    },
};
```

### StoreDecorator

Для использования стора в storybook используется декоратор StoreDecorator.

Пример:

```typescript jsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { Button } from './Button';

export default {
    title: 'shared/Button',
    component: Button,
    decorators: [
        StoreDecorator({
            user:{
                authData:{
                    id: '1',
                    username: 'Vasya_123',
                    firstname: 'Вася'
                }
            },
            //... другие слайсы стора ...
        }),
    ],
} as Meta<typeof Button>;

type Story = StoryObj<Button>;

export const Primary: Story = {};
```
