import { useState } from "react";
import classes from './counter.module.scss';

export const Counter = () => {
    const [count, setCount] = useState(0);

    function inc() {
        setCount(count + 1);
    }

    function dec() {
        if (count > 0) setCount(count - 1);
    }

    return (
        <div className={classes.counter}>
            <p>{count}</p>
            <button className={classes.btn} onClick={inc}>+</button>
            <button className={classes.btn} onClick={dec}>-</button>
        </div>
    );
}