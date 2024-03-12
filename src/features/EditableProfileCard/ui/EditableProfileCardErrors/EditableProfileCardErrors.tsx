import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TextThemes, Text } from '@/shared/ui/Text';
import { ProfileErrors } from '@/entity/Profile';
import { ProfileValidateErrors } from '../../model/consts/profile';
import cls from './EditableProfileCardErrors.module.scss';

interface EditableProfileCardErrorsProps {
    className?: string;
    validationErrors?: ProfileValidateErrors[];
}

const EditableProfileCardErrors = (props: EditableProfileCardErrorsProps) => {
    const { className, validationErrors = [] } = props;
    const { t } = useTranslation('profile');

    const errors = useMemo(
        () => ({
            [ProfileValidateErrors.NO_DATA]: t('profile no data'),
            [ProfileErrors.SERVER_ERROR]: t('server error'),
            [ProfileValidateErrors.INCORRECT_USER_DATA]: t('incorrect user data'),
            [ProfileValidateErrors.INCORRECT_AGE]: t('incorrect age'),
            [ProfileValidateErrors.INCORRECT_EMAIL]: t('incorrect email'),
        }),
        [t],
    );

    if (!validationErrors.length) return null;

    return (
        <div
            className={classNames(cls.EditableProfileCardErrors, {}, [className])}
            data-testid="EditableProfileCardErrors"
        >
            {validationErrors.map((err) => (
                <Text
                    key={err}
                    theme={TextThemes.ERROR}
                    text={errors[err]}
                    dataTestId="EditableProfileCardErrors.Error"
                />
            ))}
        </div>
    );
};

const Memoized = memo(EditableProfileCardErrors);

export { Memoized as EditableProfileCardErrors };
