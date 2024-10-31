import { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';

import { StikyHeaderLayout } from './StikyHeaderLayout';

export default {
    title: 'shared/layouts/StikyHeaderLayout',
    component: StikyHeaderLayout,
    args: {
        header: 'Header content',
        content: (
            <VStack gap="16" style={{ maxWidth: '790px', margin: '0 auto' }}>
                {new Array(30).fill('1').map((v, i) => (
                    <Card
                        key={i}
                        style={{
                            height: '200px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        Random content
                    </Card>
                ))}
            </VStack>
        ),
    },
} as Meta<typeof StikyHeaderLayout>;

type Story = StoryObj<typeof StikyHeaderLayout>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
