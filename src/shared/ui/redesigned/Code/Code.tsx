import { memo, useCallback } from 'react';

import CopyIcon from '@/shared/assets/svg/copy.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FeatureToggle } from '@/shared/lib/features/components/FeatureToggle/FeatureToggle';

import { Button as ButtonDeprecated, ButtonThemes as ButtonThemesDeprecated } from '../../deprecated/Button';
import { Icon as IconDeprecated } from '../../deprecated/Icon/Icon';
import { Icon } from '../Icon';

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
        <FeatureToggle
            feature="isRedesignedApp"
            off={
                <div className={cls.CodeWrapperDeprecated}>
                    <pre className={classNames(cls.Code, {}, [className])}>
                        <code>{codeText}</code>
                    </pre>
                    <ButtonDeprecated
                        className={cls.copy}
                        theme={ButtonThemesDeprecated.CLEAR}
                        onClick={onCopy}
                    >
                        <IconDeprecated className={cls.copyIcon} Svg={CopyIcon} />
                    </ButtonDeprecated>
                </div>
            }
            on={
                <div className={cls.CodeWrapper}>
                    <pre className={classNames(cls.Code, {}, [className])}>
                        <code>{codeText}</code>
                    </pre>
                    <Icon className={cls.copy} Svg={CopyIcon} clickable onClick={onCopy} />
                </div>
            }
        />
    );
});
