function componentTemplate(featureName) {
    // import classNames from 'classnames';

    return `import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './${featureName}.module.scss';

interface ${featureName}Props {
    className?: string;
}

export const ${featureName} = memo((props: ${featureName}Props) => {
    const { className } = props;

    return (
        <div className={classNames(cls.${featureName}, {}, [className])}>
            -
        </div>
    );
});
`;
}

module.exports = componentTemplate;
