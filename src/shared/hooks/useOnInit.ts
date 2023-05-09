import { useEffect } from 'react';

export const useOnInit = (callback: () => void) => useEffect(() => {
    if (__PROJECT__ === 'frontend') {
        callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
