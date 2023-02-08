import { useState } from "react";
import classes from './counter.module.scss';

export const Counter = () => {
    const [count, setCount] = useState(0);

    function inc() {
        setCount(count + 1);
    }

    function dec() {
        setCount(count - 1);
    }

    return (
        <div className={classes.counter}>
            <p>{count}</p>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
        </div>
    );
}