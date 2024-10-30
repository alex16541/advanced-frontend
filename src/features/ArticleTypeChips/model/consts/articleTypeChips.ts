import { ArticleType } from '@/entity/Article';

import { ArticleTypeChip } from '../types/articleTypeChips';

export const ArticleTypeChipOptions: ArticleTypeChip[] = [
    { value: ArticleType.ALL, label: ArticleType.ALL },
    { value: ArticleType.IT, label: ArticleType.IT },
    { value: ArticleType.ART, label: ArticleType.ART },
    { value: ArticleType.LIFE, label: ArticleType.LIFE },
];
