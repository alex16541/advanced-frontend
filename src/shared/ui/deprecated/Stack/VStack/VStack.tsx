import { memo } from 'react';

import { Flex, FlexProps } from '../Flex/ui/Flex';

type VStackProps = Omit<FlexProps, 'Direction'>;

/**
 * Используйте соответствующий компонент из папки refactoring
 * @deprecated
 */
export const VStack = memo((props: VStackProps) => {
    const { align = 'Stretch', ...otherProps } = props;

    return <Flex {...otherProps} align={align} direction="Column" />;
});
