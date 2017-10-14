import {
    $window,
    getBreakpoint
} from '../globals/globals';


const isBreakpoint = (name) => {
    return $window.width() >= getBreakpoint(name).min;
};


export default isBreakpoint;
