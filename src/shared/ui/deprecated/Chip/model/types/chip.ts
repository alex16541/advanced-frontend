import { ChipProps } from '../../ui/Chip/Chip';

export type ChipListOption<T> = Omit<ChipProps<T>, 'onClick'>;
