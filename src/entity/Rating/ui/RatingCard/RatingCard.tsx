import {
    memo, useCallback, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RatingCard.module.scss';
import { StarRating } from '@/shared/ui/StarRating';
import { Card } from '@/shared/ui/Card/Card';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { Modal } from '@/shared/ui/Modal';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button, ButtonColor, ButtonSize } from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';

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

    const onChangeStarRating = useCallback((rating: number) => {
        setStarRating(rating);

        if (hasFeedback) {
            setIsOpen(true);
        } else {
            acceptHendler();
        }
    }, [acceptHendler, hasFeedback]);

    const onChangeFeedback = useCallback((feedback: string) => {
        setFeedback(feedback);
    }, []);

    const ModalContent = useMemo(() => (
        <VStack gap="8">
            <Text title={feedbackTitle} size={TextSize.L} />
            {/* TODO: Заменить на textarea */}
            <Input placeholder={feedbackPlaceholder} onChange={onChangeFeedback} />
        </VStack>
    ), [feedbackPlaceholder, feedbackTitle, onChangeFeedback]);

    return (
        <Card className={classNames(cls.RatingCard, {}, [className])}>
            <VStack align="Center" gap="16">
                <Text title={starRating ? ratedTitle : title} size={TextSize.L} />
                <StarRating
                    rating={starRating}
                    onChange={onChangeStarRating}
                    editable={isEditable}
                    disabled={disabled}
                    size={40}
                />
            </VStack>

            {hasFeedback && (
                <>
                    <BrowserView>
                        <Modal classNameContent={cls.Modal} isOpen={isOpen} onClose={cancelHendler}>
                            <VStack maxWidth gap="32" justify="SpaceBetween">
                                {ModalContent}
                                <HStack maxWidth justify="End">
                                    <Button
                                        onClick={cancelHendler}
                                        color={ButtonColor.RED}
                                    >
                                        {cancelText}
                                    </Button>
                                    <Button
                                        onClick={acceptHendler}
                                    >
                                        {acceptText}
                                    </Button>
                                </HStack>
                            </VStack>
                        </Modal>
                    </BrowserView>
                    <MobileView>
                        <Drawer isOpen={isOpen} onClose={cancelHendler}>
                            <VStack maxWidth maxHeight gap="32" justify="SpaceBetween">
                                {ModalContent}
                                <Button
                                    onClick={acceptHendler}
                                    size={ButtonSize.L}
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
