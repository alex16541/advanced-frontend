import { memo, useCallback } from 'react';

import CopyIcon from '@/shared/assets/svg/copy.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Button, ButtonThemes } from '../Button';
import { Icon } from '../Icon/Icon';

import cls from './Code.module.scss';

interface CodeProps {
    className?: string;
    codeText: string;
}

export const Code = memo((props: CodeProps) => {
    const { className, codeText } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(codeText);
        // todo: Add toast about successfull copying
        console.log('Code successfull copyed! 🎉');
    }, [codeText]);

    return (
        <div className={cls.Code__wrapper}>
            <pre className={classNames(cls.Code, {}, [className])}>
                <code>{codeText}</code>
            </pre>
            <Button className={cls.copy} theme={ButtonThemes.CLEAR} onClick={onCopy}>
                <Icon className={cls.copy__icon} Svg={CopyIcon} />
            </Button>
        </div>
    );
});
