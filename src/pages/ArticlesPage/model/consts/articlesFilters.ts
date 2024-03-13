import { ArticleType } from '@/entity/Article';

import { ArticleTypeChip } from '../types/ariclesFilters';

export const typeOptions: ArticleTypeChip[] = [
    { value: ArticleType.ALL, label: 'Все темы' },
    { value: ArticleType.IT, label: 'IT' },
    { value: ArticleType.ART, label: 'Искуство' },
    { value: ArticleType.LIFE, label: 'Жизнь' },
];
