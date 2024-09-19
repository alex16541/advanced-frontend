import { memo, useCallback } from 'react';

import CopyIcon from '@/shared/assets/svg/copy.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

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
        
                        <div className={cls.CodeWrapper}>
                            <pre className={classNames(cls.Code, {}, [className])}>
                                <code>{codeText}</code>
                            </pre>
                            <Icon className={cls.copy} Svg={CopyIcon} clickable onClick={onCopy} />
                        </div>
                    
    );
});
