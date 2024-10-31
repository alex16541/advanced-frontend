import { ReactElement, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import {
    Article,
    ArticleContent,
    ArticleErrorBoundary,
    deleteArticle,
    saveArticle,
    useArticleData,
} from '@/entity/Article';
import { getAuthData, User } from '@/entity/User';
import { ArticleEditor } from '@/features/ArticleEditor';
import { getRouteArticlePublish, getRouteArticles } from '@/shared/consts/router';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { StikyHeaderLayout } from '@/shared/layouts/StikyHeaderLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Button } from '@/shared/ui/redesigned/Button';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';

import '../i18n/i18n';

import cls from './ArticleEditPage.module.scss';
import { ArticleEditPageSkeleton } from './ArticleEditPageSkeleton';

interface ArticleEditPageWithDataProps {
    className?: string;
    article: Article;
    userData: User;
}

const ArticleEditPageWithData = (props: ArticleEditPageWithDataProps) => {
    const { className, article, userData } = props;

    const { t } = useTranslation('ArticleEditPage');

    const [editorArticle, setEditorArticle] = useState<Article | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [isDelateLoading, setIsDelateLoading] = useState(false);

    const onClose = useCallback(() => {
        if (!isDelateLoading) {
            setIsOpen(false);
        }
    }, [isDelateLoading]);

    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onChange = useCallback(
        (article: ArticleContent | Article) => {
            if ('id' in article) {
                setEditorArticle(article);
            } else {
                setEditorArticle({
                    ...article,
                    id: Date.now().toString(),
                    user: userData,
                    editorState: JSON.stringify(article.editorState),
                });
            }
        },
        [userData],
    );

    const onSave = useCallback(async () => {
        if (!editorArticle || !userData || !article) return null;

        try {
            setIsSaveLoading(true);

            const articleData = {
                ...article,

                type: editorArticle.type,
                title: editorArticle.title,
                img: editorArticle.img,
                description: editorArticle.description,
                updatedAt: new Date().toLocaleString(),

                editorState:
                    typeof editorArticle.editorState === 'string'
                        ? editorArticle.editorState
                        : JSON.stringify(editorArticle.editorState),
            };

            const saveResult = await dispatch(saveArticle(articleData)).unwrap();

            return saveResult;
        } catch (e) {
            console.log(e);
            return null;
        } finally {
            setIsSaveLoading(false);
        }
    }, [editorArticle, userData, article, dispatch]);

    const onPublish = useCallback(async () => {
        const saveResult = await onSave();

        // navigate only after save
        if (saveResult !== null) navigate(getRouteArticlePublish(saveResult.id));
    }, [navigate, onSave]);

    const onDelete = useCallback(async () => {
        try {
            setIsDelateLoading(true);
            await dispatch(deleteArticle(article.id)).unwrap();
            navigate(getRouteArticles());
        } catch (e) {
            console.log(e);
        } finally {
            setIsDelateLoading(false);
        }
    }, [article.id, dispatch, navigate]);

    return (
        <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
            <StikyHeaderLayout
                content={<ArticleEditor article={article} editable onChange={onChange} />}
                header={
                    <HStack className={cls.header} justify="SpaceBetween">
                        <Text className={cls.HeaderTitle} text={t('Article editor')} weight="bold" />

                        <HStack>
                            <Button className={cls.Button} isLoading={isDelateLoading} onClick={onOpen}>
                                {t('Delete article')}
                            </Button>

                            <Button className={cls.Button} isLoading={isSaveLoading} onClick={onPublish}>
                                {t('Save and publish')}
                            </Button>

                            <Button className={cls.Button} isLoading={isSaveLoading} onClick={onSave}>
                                {t('Save')}
                            </Button>
                        </HStack>
                    </HStack>
                }
            />
            <Modal isOpen={isOpen} onClose={onClose}>
                <VStack>
                    <Text text={t('Delete article confirmation text')} />
                    <HStack justify="SpaceBetween">
                        <Button disabled={isDelateLoading} fullWidth onClick={onClose}>
                            {t('Cancel')}
                        </Button>
                        <Button color="cancel" isLoading={isDelateLoading} fullWidth onClick={onDelete}>
                            {t('Delete')}
                        </Button>
                    </HStack>
                </VStack>
            </Modal>
        </Page>
    );
};
interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = (props: ArticleEditPageProps) => {
    let { id } = useParams();

    if (__PROJECT__ === 'storybook') id = '1';

    const userData = useAppSelector(getAuthData);
    const { articleData, isLoading, errors, reducers } = useArticleData({
        articleId: id,
        ownerOnly: true,
    });

    let content!: ReactElement<any, any>;

    if (isLoading) {
        content = <ArticleEditPageSkeleton />;
    } else if (errors) {
        content = errors;
    } else if (!userData) {
        content = <ArticleErrorBoundary error="FORBIDDEN" />;
    } else {
        content = <ArticleEditPageWithData article={articleData} userData={userData} {...props} />;
    }

    return (
        <DynamicModuleLoader key="articleDetails" reducers={reducers}>
            {content}
        </DynamicModuleLoader>
    );
};

export default ArticleEditPage;
