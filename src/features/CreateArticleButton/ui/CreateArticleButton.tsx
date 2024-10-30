import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import PencilIcon from '@/shared/assets/svg/awesome_icons/pencil-solid.svg';
import { getRouteArticleCreate } from '@/shared/consts/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/redesigned/Icon';

import cls from './CreateArticleButton.module.scss';

interface CreateArticleButtonProps {
    className?: string;
}

const CreateArticleButton = (props: CreateArticleButtonProps) => {
    const { className } = props;
    const navigate = useNavigate();

    const redirectOnArticleEditor = useCallback(() => {
        navigate(getRouteArticleCreate());
    }, [navigate]);

    return (
        <Icon
            className={classNames(cls.CreateArticleButton, {}, [className])}
            Svg={PencilIcon}
            clickable
            onClick={redirectOnArticleEditor}
        />
    );
};

const Memoized = memo(CreateArticleButton);

export { Memoized as CreateArticleButton };
