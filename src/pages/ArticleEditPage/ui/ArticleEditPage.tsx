import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { TextEditor } from '@/features/TextEditor';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

import cls from './ArticleEditPage.module.scss';
import { html } from './text';

interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
    const { className } = props;
    const { id } = useParams();
    const isEdit = Boolean(id);

    return (
        <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
            {/* Article test {isEdit ? 'edit' : 'create'} paget test */}
            <TextEditor html={html} />
        </Page>
    );
});

export default ArticleEditPage;
