import { EditorState } from 'lexical';
import { ChangeEventHandler, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Article, ArticleContent } from '@/entity/Article';
import { ArticleTextEditor } from '@/entity/TextEditor';
import ImageIcon from '@/shared/assets/svg/awesome_icons/image-solid.svg';
import TrashIcon from '@/shared/assets/svg/awesome_icons/trash-can-solid.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Input } from '@/shared/ui/redesigned/Input';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Textarea } from '@/shared/ui/redesigned/Textarea';

import cls from './ArticleEditor.module.scss';
import html from './text.json';
import '../i18n/i18n';

interface ArticleEditorProps {
    className?: string;
    article: Article;
    onChange?: (article: Article | ArticleContent) => void;
    editable?: boolean;
}

const ArticleEditor = (props: ArticleEditorProps) => {
    const { className, article, onChange, editable = false } = props;
    const { t } = useTranslation('ArticleEditor');
    const [title, setTitle] = useState(article?.title ?? t('new title'));
    const [cover, setCover] = useState(article?.img ?? '');
    const [currentCover, setCurrentCover] = useState(article?.img ?? '');
    const [isOpen, setIsOpen] = useState(false);

    const onChangeHandler = useCallback(
        (state: EditorState) => {
            onChange?.({
                ...article,
                title,
                img: cover,
                editorState: state,
            });
        },
        [article, cover, onChange, title],
    );

    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const onChangeTitle = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
        (e) => {
            const title = e.target.value;

            setTitle(title);

            onChange?.({
                ...article,
                title,
            });
        },
        [article, onChange],
    );

    const onChangeCover = useCallback(
        (cover: string) => {
            setCover(cover);
            onChange?.({
                ...article,
                img: cover,
            });
        },
        [article, onChange],
    );

    return (
        <Card className={classNames(cls.ArticleEditor, {}, [className])}>
            <VStack className={cls.header} gap="16">
                {cover && (
                    <div className={cls.coverContainer}>
                        <AppImage
                            className={cls.cover}
                            src={cover}
                            errorFallback={
                                <VStack align="Center" className={cls.coverFallback}>
                                    <Icon Svg={ImageIcon} />
                                    <Text text={t('Image not found')} weight="bold" />
                                </VStack>
                            }
                        />
                    </div>
                )}
                <Textarea
                    className={cls.title}
                    defaultValue={title}
                    disabled={!editable}
                    maxLength={200}
                    placeholder={t('title')}
                    onChange={onChangeTitle}
                />
                {editable && (
                    <div className={cls.coverControls}>
                        <Button className={cls.setCover} theme="clear" onClick={onOpen}>
                            {cover ? t('Change cover') : t('Add cover')}
                        </Button>
                        {cover && (
                            <Icon
                                className={cls.removeCover}
                                Svg={TrashIcon}
                                clickable
                                onClick={() => onChangeCover('')}
                            />
                        )}
                    </div>
                )}
            </VStack>
            <ArticleTextEditor
                className={cls.editor}
                content={article?.editorState ?? JSON.stringify(html)}
                editable={editable}
                onChange={onChangeHandler}
            />
            <Modal classNameContent={cls.modal} isOpen={isOpen} onClose={onClose}>
                <VStack gap="12">
                    <Text title={t('Set cover')} />
                    <HStack className={cls.content}>
                        <Input
                            className={cls.coverInput}
                            placeholder={t('Cover URL')}
                            value={currentCover}
                            fullWidth
                            onChange={setCurrentCover}
                        />
                        <Button
                            className={cls.randomButton}
                            onClick={() => {
                                setCurrentCover(
                                    // eslint-disable-next-line max-len
                                    'https://sun9-54.userapi.com/impf/oL032mi2rCSlX1L5EaGZa4icTJ7VtPolje-Zxw/ctB_Ti9Ne70.jpg?size=1920x768&quality=95&crop=0,183,1280,511&sign=c28f1ba70def49c24f1b445e74b7c4e5&type=cover_group',
                                );
                            }}
                        >
                            {t('Set random cover')}
                        </Button>
                    </HStack>
                    <HStack className={cls.actions}>
                        <Button color="cancel" fullWidth onClick={onClose}>
                            {t('Cancel')}
                        </Button>
                        <Button
                            color="save"
                            disabled={!currentCover}
                            fullWidth
                            onClick={() => {
                                setCover(currentCover);
                                onClose();
                            }}
                        >
                            {t('Confirm')}
                        </Button>
                    </HStack>
                </VStack>
            </Modal>
        </Card>
    );
};

const Memoized = memo(ArticleEditor);

export { Memoized as ArticleEditor };
