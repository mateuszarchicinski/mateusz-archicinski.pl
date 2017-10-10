import throttle from '../../node_modules/throttle-debounce/throttle';


class mainHeader {
    constructor(headerSelector, sectionSelector, offsetHeight) {
        this.headerSelector = headerSelector || '.main-header-js';
        this.sectionSelector = sectionSelector || '.main-wrapper > .section';
        this.offsetHeight = offsetHeight || -10;
    }
    headerHandling() {
        const minHeight = this.minHeight + this.offsetHeight;

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

        const headerElem = this.headerElem = document.querySelector(this.headerSelector),
            sectionElem = this.sectionElem = document.querySelector(this.sectionSelector);

        if (!headerElem || !sectionElem) return;

        this.minHeight = sectionElem.offsetHeight;

        window.addEventListener('scroll', throttle(250, () => {
            this.headerHandling();
        }));
    }
};


export default mainHeader;
