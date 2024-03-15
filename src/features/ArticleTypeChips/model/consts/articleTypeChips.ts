import { ArticleType } from '@/entity/Article';

import { ArticleTypeChip } from '../types/articleTypeChips';

export const ArticleTypeChipOptions: ArticleTypeChip[] = [
    { value: ArticleType.ALL, label: 'Все темы' },
    { value: ArticleType.IT, label: 'IT' },
    { value: ArticleType.ART, label: 'Искуство' },
    { value: ArticleType.LIFE, label: 'Жизнь' },
];
