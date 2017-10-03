import {
    throttle,
    debounce
} from './functions';


class mainHeader {
    constructor(headerSelector) {
        this.headerSelector = headerSelector || '.main-header-js';
    }
    headerHandling() {
        if (!this.headerElem) return;

        const minHeight = window.innerHeight + 55;

        if (window.pageYOffset >= (minHeight / 2.5)) {
            this.headerElem.classList.add('main-header-fixed');
        } else {
            this.headerElem.classList.remove('main-header-fixed');
            this.headerElem.classList.remove('show');
            this.headerElem.classList.remove('hide');
        }

        if (window.pageYOffset >= minHeight) {
            this.show();
        } else if (window.pageYOffset < minHeight && window.pageYOffset >= (minHeight / 2.5)) {
            this.hide();
        }
    }
    show() {
        this.headerElem.classList.remove('hide');
        this.headerElem.classList.add('show');
    }
    hide() {
        this.headerElem.classList.remove('show');
        this.headerElem.classList.add('hide');
    }
    init() {
        if (this.headerElem) return;

        const headerElem = this.headerElem = document.querySelector(this.headerSelector);

        if (!headerElem) return;

        window.addEventListener('scroll', throttle(() => {
            this.headerHandling();
        }, 400));

        window.addEventListener('scroll', debounce(() => {
            this.headerHandling();
        }, 400));
    }
};


export {
    mainHeader
};