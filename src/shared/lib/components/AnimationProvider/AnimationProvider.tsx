import { Spring } from '@react-spring/web';
import {
    ReactNode, createContext, useContext, useEffect, useMemo, useRef, useState,
} from 'react';

type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react');

interface AnimationsContextPayload{
    Spring?: SpringType;
    Gesture?: GestureType;
    isLoaded?: boolean;
}

const AnimationsContext = createContext<AnimationsContextPayload>({});

const getAnimationsModules = async () => Promise.all([
    import('@react-spring/web'),
    import('@use-gesture/react'),
]);

export const useAnimationLibs = () => useContext(AnimationsContext) as Required<AnimationsContextPayload>;

export const AnimationProvider = ({ children }: {children: ReactNode}) => {
    const SpringRef = useRef<SpringType>();
    const GestureRef = useRef<GestureType>();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getAnimationsModules().then(([spring, gesture]) => {
            SpringRef.current = spring;
            GestureRef.current = gesture;
            setIsLoaded(true);
        });
    }, []);

    const value = useMemo(() => ({
        Spring: SpringRef.current,
        Gesture: GestureRef.current,
        isLoaded,
    }), [isLoaded]);

    return (
        <AnimationsContext.Provider value={value}>
            {children}
        </AnimationsContext.Provider>
    );
};
