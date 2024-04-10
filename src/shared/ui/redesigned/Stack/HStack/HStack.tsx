import { memo } from 'react';

import { Flex, FlexProps } from '../Flex/ui/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

export const HStack = memo((props: HStackProps) => {
    const { justify = 'Start', ...otherProps } = props;
    return <Flex {...otherProps} direction="Row" justify={justify} />;
});
