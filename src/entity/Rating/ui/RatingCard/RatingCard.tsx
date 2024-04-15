import { memo, useCallback, useMemo, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { FeatureToggle } from '@/shared/lib/features/components/FeatureToggle/FeatureToggle';
import {
    Button as ButtonDeprecated,
    ButtonColor as ButtonColorDeprecated,
    ButtonSize as ButtonSizeDeprecated,
} from '@/shared/ui/deprecated/Button';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { StarRating as StarRatingDeprecated } from '@/shared/ui/deprecated/StarRating';
import { Text as TextDeprecated, TextSize as TextSizeDeprecated } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Input } from '@/shared/ui/redesigned/Input';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { StarRating } from '@/shared/ui/redesigned/StarRating';
import { Text } from '@/shared/ui/redesigned/Text';

import cls from './RatingCard.module.scss';

interface RatingCardProps {
    className?: string;
    rating?: number;
    title?: string;
    ratedTitle?: string;
    feedbackTitle?: string;
    feedbackPlaceholder?: string;
    cancelText?: string;
    acceptText?: string;
    hasFeedback?: boolean;
    editable?: boolean;
    disabled?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
}

const RatingCard = (props: RatingCardProps) => {
    const { t } = useTranslation('rating');

    const {
        className,
        rating = 0,
        title = t('Leave a rating'),
        ratedTitle = t('Thank you for rating'),
        feedbackTitle = t('Feedback form'),
        feedbackPlaceholder = t('Review fields'),
        cancelText = t('Cancel'),
        acceptText = t('Send'),
        hasFeedback = true,
        editable = false,
        disabled = false,
        onCancel,
        onAccept,
    } = props;

    const [isEditable, setIsEditable] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [starRating, setStarRating] = useState(rating);
    const [feedback, setFeedback] = useState('');

    const cancelHendler = useCallback(() => {
        onCancel?.(starRating);
        setIsOpen(false);
    }, [onCancel, starRating]);

    const acceptHendler = useCallback(() => {
        onAccept?.(starRating, feedback);
        if (!editable) {
            setIsEditable(false);
        }
        setIsOpen(false);
    }, [feedback, onAccept, starRating, editable]);

    const onChangeStarRating = useCallback(
        (rating: number) => {
            setStarRating(rating);

            if (hasFeedback) {
                setIsOpen(true);
            } else {
                acceptHendler();
            }
        },
        [acceptHendler, hasFeedback],
    );

    const onChangeFeedback = useCallback((feedback: string) => {
        setFeedback(feedback);
    }, []);

    const ModalContentOld = useMemo(
        () => (
            <VStack gap="8">
                <TextDeprecated size={TextSizeDeprecated.L} title={feedbackTitle} />
                <InputDeprecated
                    className={cls.Input}
                    data-testid="RatingCard.FeedbackInput"
                    placeholder={feedbackPlaceholder}
                    onChange={onChangeFeedback}
                />
            </VStack>
        ),
        [feedbackPlaceholder, feedbackTitle, onChangeFeedback],
    );

    const ModalContentNew = useMemo(
        () => (
            <VStack gap="8">
                <Text size="l" title={feedbackTitle} />
                {/* TODO: Заменить на textarea */}
                <Input
                    className={cls.Input}
                    data-testid="RatingCard.FeedbackInput"
                    placeholder={feedbackPlaceholder}
                    onChange={onChangeFeedback}
                />
            </VStack>
        ),
        [feedbackPlaceholder, feedbackTitle, onChangeFeedback],
    );

    const form = useMemo(
        () => (
            <>
                <VStack align="Center" gap="10">
                    <FeatureToggle
                        feature="isRedesignedApp"
                        on={<Text className={cls.title} size="l" title={starRating ? ratedTitle : title} />}
                        off={
                            <TextDeprecated
                                size={TextSizeDeprecated.L}
                                title={starRating ? ratedTitle : title}
                            />
                        }
                    />
                    <FeatureToggle
                        feature="isRedesignedApp"
                        off={
                            <StarRatingDeprecated
                                disabled={disabled}
                                editable={isEditable}
                                rating={starRating}
                                size={40}
                                onChange={onChangeStarRating}
                            />
                        }
                        on={
                            <StarRating
                                disabled={disabled}
                                editable={isEditable}
                                rating={starRating}
                                size={40}
                                onChange={onChangeStarRating}
                            />
                        }
                    />
                </VStack>

                {hasFeedback && (
                    <>
                        <BrowserView>
                            <Modal classNameContent={cls.Modal} isOpen={isOpen} onClose={cancelHendler}>
                                <VStack
                                    data-testid="RatingCard.Modal"
                                    gap="32"
                                    justify="SpaceBetween"
                                    maxWidth
                                >
                                    <FeatureToggle
                                        feature="isRedesignedApp"
                                        off={
                                            <>
                                                {ModalContentOld}
                                                <HStack justify="End" maxWidth>
                                                    <ButtonDeprecated
                                                        color={ButtonColorDeprecated.RED}
                                                        onClick={cancelHendler}
                                                    >
                                                        {cancelText}
                                                    </ButtonDeprecated>
                                                    <ButtonDeprecated
                                                        data-testid="RatingCard.Accept"
                                                        onClick={acceptHendler}
                                                    >
                                                        {acceptText}
                                                    </ButtonDeprecated>
                                                </HStack>
                                            </>
                                        }
                                        on={
                                            <>
                                                {ModalContentNew}
                                                <HStack justify="End" maxWidth>
                                                    <Button color="red" onClick={cancelHendler}>
                                                        {cancelText}
                                                    </Button>
                                                    <Button
                                                        data-testid="RatingCard.Accept"
                                                        onClick={acceptHendler}
                                                    >
                                                        {acceptText}
                                                    </Button>
                                                </HStack>
                                            </>
                                        }
                                    />
                                </VStack>
                            </Modal>
                        </BrowserView>
                        <MobileView>
                            <Drawer isOpen={isOpen} onClose={cancelHendler}>
                                <VStack
                                    data-testid="RatingCard.Modal"
                                    gap="32"
                                    justify="SpaceBetween"
                                    maxHeight
                                    maxWidth
                                >
                                    <FeatureToggle
                                        feature="isRedesignedApp"
                                        off={
                                            <>
                                                {ModalContentOld}
                                                <ButtonDeprecated
                                                    data-testid="RatingCard.Accept"
                                                    size={ButtonSizeDeprecated.L}
                                                    onClick={acceptHendler}
                                                >
                                                    {acceptText}
                                                </ButtonDeprecated>
                                            </>
                                        }
                                        on={
                                            <>
                                                {ModalContentNew}
                                                <Button
                                                    data-testid="RatingCard.Accept"
                                                    size="l"
                                                    onClick={acceptHendler}
                                                >
                                                    {acceptText}
                                                </Button>
                                            </>
                                        }
                                    />
                                </VStack>
                            </Drawer>
                        </MobileView>
                    </>
                )}
            </>
        ),
        [
            ModalContentNew,
            ModalContentOld,
            acceptHendler,
            acceptText,
            cancelHendler,
            cancelText,
            disabled,
            hasFeedback,
            isEditable,
            isOpen,
            onChangeStarRating,
            ratedTitle,
            starRating,
            title,
        ],
    );

    return (
        <FeatureToggle
            feature="isRedesignedApp"
            on={<Card className={classNames(cls.RatingCard, {}, [className])}>{form}</Card>}
            off={
                <CardDeprecated className={classNames(cls.RatingCard, {}, [className])}>
                    {form}
                </CardDeprecated>
            }
        />
    );
};

const Memoized = memo(RatingCard);

export { Memoized as RatingCard };
