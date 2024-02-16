import { memo } from 'react';
import { Flex, FlexProps } from '../Flex/ui/Flex';

type VStackProps = Omit<FlexProps, 'Direction'>;

export const VStack = memo((props: VStackProps) => (
    <Flex {...props} direction="Column" />
));
