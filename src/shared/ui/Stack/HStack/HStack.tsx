import { memo } from 'react';

import { Flex, FlexProps } from '../Flex/ui/Flex';

type HStackProps = Omit<FlexProps, 'direction'>

export const HStack = memo((props: HStackProps) => (
    <Flex {...props} direction="Row" />
));
