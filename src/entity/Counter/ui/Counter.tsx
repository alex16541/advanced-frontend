import { Button } from '@/shared/ui/deprecated/Button';

import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slices/counterSlice';

interface CounterProps {}

export const Counter = (props: CounterProps) => {
    const counterValue = useCounterValue();
    const { increment, decrement } = useCounterActions();

    function onInc() {
        increment();
    }

    function onDec() {
        decrement();
    }

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button data-testid="increment-btn" onClick={onInc}>
                +
            </Button>
            <Button data-testid="decrement-btn" onClick={onDec}>
                -
            </Button>
        </div>
    );
};
