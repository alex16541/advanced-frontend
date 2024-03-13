import { useEffect, useState } from 'react';

import { Button, ButtonThemes } from '@/shared/ui/Button';

export const BugButton = () => {
    const [error, setError] = useState(false);

    useEffect(() => {
        if (error) throw new Error();
    }, [error]);

    return (
        <Button theme={ButtonThemes.PRIMARY} onClick={() => setError(true)}>
            test bug button
        </Button>
    );
};
