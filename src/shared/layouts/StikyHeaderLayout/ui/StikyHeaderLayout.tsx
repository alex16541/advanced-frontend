import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';

import cls from './StikyHeaderLayout.module.scss';

interface StikyHeaderLayoutProps {
    className?: string;
    content?: React.ReactNode;
    header?: React.ReactNode;
    maxWidth?: string;
}

export const StikyHeaderLayout = (props: StikyHeaderLayoutProps) => {
    const { className, content, header, maxWidth } = props;

    return (
        <div className={classNames(cls.StikyHeaderLayout, {}, [className])}>
            <div className={cls.HeaderContainer}>
                <div className={cls.Header}>
                    <Card className={cls.HeaderCard}>{header}</Card>
                </div>
                <div className={cls.HeaderDecor} />
            </div>

            {content}
        </div>
    );
};
