import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';

import { ProfileValidateError } from '../../model/consts/profile';

import cls from './EditableProfileCardErrors.module.scss';

interface EditableProfileCardErrorsProps {
    className?: string;
    validationErrors?: ProfileValidateError[];
}

const EditableProfileCardErrors = (props: EditableProfileCardErrorsProps) => {
    const { className, validationErrors = [] } = props;
    const { t } = useTranslation('EditableProfileCard');

    if (!validationErrors.length) return null;

    return (
        <div
            className={classNames(cls.EditableProfileCardErrors, {}, [className])}
            data-testid="EditableProfileCardErrors"
        >
            {validationErrors.map((err) => (
                <Text dataTestId="EditableProfileCardErrors.Error" key={err} text={t(err)} theme="error" />
            ))}
        </div>
    );
};

const Memoized = memo(EditableProfileCardErrors);

export { Memoized as EditableProfileCardErrors };
