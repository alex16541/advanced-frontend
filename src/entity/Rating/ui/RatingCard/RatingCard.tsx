import { useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Input } from '@/shared/ui/redesigned/Input';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { StarRating } from '@/shared/ui/redesigned/StarRating';
import { Text } from '@/shared/ui/redesigned/Text';

import cls from './RatingCard.module.scss';
import '../../i18n/i18n';

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

export const RatingCard = (props: RatingCardProps) => {
    const { t } = useTranslation('RatingCard');

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

    const cancelHendler = () => {
        onCancel?.(starRating);
        setIsOpen(false);
    };

    const acceptHendler = () => {
        onAccept?.(starRating, feedback);
        if (!editable) {
            setIsEditable(false);
        }
        setIsOpen(false);
    };

    const onChangeStarRating = (rating: number) => {
        setStarRating(rating);

        if (hasFeedback) {
            setIsOpen(true);
        } else {
            acceptHendler();
        }
    };

    const onChangeFeedback = (feedback: string) => {
        setFeedback(feedback);
    };

    const ModalContent = (
        <VStack gap="16">
            <Text size="l" title={feedbackTitle} />
            {/* TODO: Заменить на textarea */}
            <Input
                className={cls.Input}
                data-testid="RatingCard.FeedbackInput"
                placeholder={feedbackPlaceholder}
                onChange={onChangeFeedback}
            />
        </VStack>
    );

    return (
        <Card className={classNames(cls.RatingCard, {}, [className])}>
            <>
                <VStack align="Center" gap="10">
                    <Text
                        className={cls.title}
                        size="l"
                        title={starRating ? ratedTitle : title}
                        weight="bold"
                    />

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
                                <VStack
                                    data-testid="RatingCard.Modal"
                                    gap="32"
                                    justify="SpaceBetween"
                                    maxHeight
                                    maxWidth
                                >
                                    <>
                                        {ModalContent}
                                        <HStack gap="12" justify="End" maxWidth>
                                            <Button color="cancel" onClick={cancelHendler}>
                                                {cancelText}
                                            </Button>
                                            <Button
                                                color="save"
                                                data-testid="RatingCard.Accept"
                                                onClick={acceptHendler}
                                            >
                                                {acceptText}
                                            </Button>
                                        </HStack>
                                    </>
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
                                    <>
                                        {ModalContent}
                                        <Button
                                            data-testid="RatingCard.Accept"
                                            size="l"
                                            onClick={acceptHendler}
                                        >
                                            {acceptText}
                                        </Button>
                                    </>
                                </VStack>
                            </Drawer>
                        </MobileView>
                    </>
                )}
            </>
        </Card>
    );
};
