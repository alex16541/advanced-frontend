import { memo, useCallback, useMemo, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonColor, ButtonSize } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { Input } from '@/shared/ui/Input';
import { Modal } from '@/shared/ui/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { StarRating } from '@/shared/ui/StarRating';
import { Text, TextSize } from '@/shared/ui/Text';

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

    const ModalContent = useMemo(
        () => (
            <VStack gap="8">
                <Text size={TextSize.L} title={feedbackTitle} />
                {/* TODO: Заменить на textarea */}
                <Input
                    data-testid="RatingCard.FeedbackInput"
                    placeholder={feedbackPlaceholder}
                    onChange={onChangeFeedback}
                />
            </VStack>
        ),
        [feedbackPlaceholder, feedbackTitle, onChangeFeedback],
    );

    return (
        <Card className={classNames(cls.RatingCard, {}, [className])}>
            <VStack align="Center" gap="16">
                <Text size={TextSize.L} title={starRating ? ratedTitle : title} />
                <StarRating
                    disabled={disabled}
                    editable={isEditable}
                    rating={starRating}
                    size={40}
                    onChange={onChangeStarRating}
                />
            </VStack>

            {hasFeedback && (
                <>
                    <BrowserView>
                        <Modal classNameContent={cls.Modal} isOpen={isOpen} onClose={cancelHendler}>
                            <VStack data-testid="RatingCard.Modal" gap="32" justify="SpaceBetween" maxWidth>
                                {ModalContent}
                                <HStack justify="End" maxWidth>
                                    <Button color={ButtonColor.RED} onClick={cancelHendler}>
                                        {cancelText}
                                    </Button>
                                    <Button data-testid="RatingCard.Accept" onClick={acceptHendler}>
                                        {acceptText}
                                    </Button>
                                </HStack>
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
                                {ModalContent}
                                <Button
                                    data-testid="RatingCard.Accept"
                                    size={ButtonSize.L}
                                    onClick={acceptHendler}
                                >
                                    {acceptText}
                                </Button>
                            </VStack>
                        </Drawer>
                    </MobileView>
                </>
            )}
        </Card>
    );
};

const Memoized = memo(RatingCard);

export { Memoized as RatingCard };
