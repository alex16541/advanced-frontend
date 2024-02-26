function componentTemplate(featureName) {
    // import classNames from 'classnames';

    return `import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './${featureName}.module.scss';

interface ${featureName}Props {
    className?: string;
}

const ${featureName} = (props: ${featureName}Props) => {
    const { className } = props;

    return (
        <div className={classNames(cls.${featureName}, {}, [className])}>
            -
        </div>
    );
};

const Memoized = memo(${featureName});

export { Memoized as ${featureName} };
`;
}

module.exports = componentTemplate;
