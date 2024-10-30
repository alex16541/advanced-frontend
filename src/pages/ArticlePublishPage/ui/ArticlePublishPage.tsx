import { $getRoot, EditorState } from 'lexical';
import { memo, ReactElement, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import '../i18n/i18n';

import { Article, saveArticle, useArticleData } from '@/entity/Article';
import { DescriptionTextEditor } from '@/entity/TextEditor';
import { ArticleTypeChip, ArticleTypeChipOptions, ArticleTypeChips } from '@/features/ArticleTypeChips';
import { getRouteArticleDetails } from '@/shared/consts/router';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { StikyHeaderLayout } from '@/shared/layouts/StikyHeaderLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';

import cls from './ArticlePublishPage.module.scss';
import { ArticlePublishPageSkeleton } from './ArticlePublishPageSkeleton';

interface ArticlePublishWithDataPageProps {
    className?: string;
    article: Article;
}
const ArticleEditPageWithData = (props: ArticlePublishWithDataPageProps) => {
    const { className, article } = props;
    const { t } = useTranslation('ArticlePublishPage');
    const [editorState, setEditorState] = useState<EditorState | string | null>(article.description ?? null);
    const [isPublishLoading, setIsPublishLoading] = useState(false);
    const [tags, setTags] = useState<ArticleTypeChip[]>(
        article.type.map(
            (type) => ArticleTypeChipOptions.find((option) => option.value === type) as ArticleTypeChip,
        ),
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onChange = (state: EditorState) => {
        setEditorState(state);
    };

    const onGoBack = () => {
        navigate(-1);
    };

    const onPublish = async () => {
        try {
            setIsPublishLoading(true);
            let isDescriptionEmpty = false;

            if (typeof editorState === 'object') {
                isDescriptionEmpty = !editorState?.read(() => $getRoot().getTextContent());
            }

            const changedArticle = {
                ...article,
                type: tags.map((tag) => tag.value),
                description: isDescriptionEmpty ? undefined : JSON.stringify(editorState),
                publishedAt: article.publishedAt ?? new Date().toLocaleString(),
            };

            const result = await dispatch(saveArticle(changedArticle)).unwrap();

            navigate(getRouteArticleDetails(result.id));
        } catch (e) {
            console.log(e);
        } finally {
            setIsPublishLoading(false);
        }
    };

    const onChangeTags = useCallback((options: ArticleTypeChip[]) => {
        setTags(options);
    }, []);

    return (
        <Page className={classNames(cls.ArticlePublishPage, {}, [className])}>
            <StikyHeaderLayout
                content={
                    <div className={cls.content}>
                        <Card className={cls.card}>
                            <Text className={cls.title} title={`${t('Select tags')}:`} />
                            <ArticleTypeChips
                                className={cls.tags}
                                value={tags}
                                multiselect
                                onChange={onChangeTags}
                            />
                        </Card>
                        <Card className={cls.descriptionCard}>
                            <Text className={cls.title} title={`${t('Add description')}:`} />
                            <DescriptionTextEditor
                                content={article.description || undefined}
                                placeholder={`${t('Write article description here')}...`}
                                editable
                                onChange={onChange}
                            />
                        </Card>
                    </div>
                }
                header={
                    <HStack className={cls.header} gap="8" justify="SpaceBetween">
                        <Text className={cls.headerTitle} text={t('Publish article')} weight="bold" />
                        <HStack justify="End">
                            <Button className={cls.button} onClick={onGoBack}>
                                {t('Cancel')}
                            </Button>
                            <Button className={cls.button} isLoading={isPublishLoading} onClick={onPublish}>
                                {t('Publish')}
                            </Button>
                        </HStack>
                    </HStack>
                }
            />
        </Page>
    );
};
interface ArticlePublishPageProps {
    className?: string;
}
const ArticlePublishPage = (props: ArticlePublishPageProps) => {
    const { id } = useParams<{ id: string }>();

    const { articleData, isLoading, errors, reducers } = useArticleData({ articleId: id, ownerOnly: true });

    let content!: ReactElement<any, any>;

    if (isLoading) {
        content = <ArticlePublishPageSkeleton />;
    } else if (errors) {
        content = errors;
    } else {
        content = <ArticleEditPageWithData article={articleData} {...props} />;
    }

    return (
        <DynamicModuleLoader key="articleDetails" reducers={reducers}>
            {content}
        </DynamicModuleLoader>
    );
};

const Memoized = memo(ArticlePublishPage);

export default Memoized;
