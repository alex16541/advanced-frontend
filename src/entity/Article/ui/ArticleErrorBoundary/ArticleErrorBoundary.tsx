import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '@/shared/ui/redesigned/Card';

import './ArticleErrorBoundary.i18n';
import { ArticleErrorType } from '../../model/types/articleError';

interface ArticleErrorBoundaryProps {
    className?: string;
    error: ArticleErrorType;
}

const ArticleErrorBoundary = (props: ArticleErrorBoundaryProps) => {
    const { className, error } = props;
    const { t } = useTranslation('ArticleErrorBoundary');

    return <Card>{t(error)}</Card>;
};

const Memoized = memo(ArticleErrorBoundary);

export { Memoized as ArticleErrorBoundary };
