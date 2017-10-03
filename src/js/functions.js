// Throttle Fn
const throttle = (fn, time) => {
    let wait = false;

    return () => {
        if (!wait) {
            fn.call();

            wait = true;

            setTimeout(() => {
                wait = false;
            }, time || 250);
        }
    };
};


// Debounce Fn
const debounce = (fn, time) => {
    let timeout;

    return () => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            fn();
        }, time || 250);
    };
};


export {
    throttle,
    debounce
};
