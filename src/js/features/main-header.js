import throttle from '../functions/throttle';


class mainHeader {
    constructor(headerSelector, sectionSelector, offsetHeight) {
        this.headerSelector = headerSelector || '.main-header-js';
        this.sectionSelector = sectionSelector || '.main-wrapper > .section';
        this.offsetHeight = offsetHeight || -10;
    }
    headerHandling() {
        const minHeight = this.sectionElem.offsetHeight + this.offsetHeight;

        if (window.pageYOffset >= (minHeight / 2.5)) {
            this.headerElem.classList.add('main-header-fixed');

            if (window.pageYOffset >= minHeight) {
                this.show();
            } else if (window.pageYOffset < minHeight) {
                this.hide();
            }
        } else {
            this.headerElem.classList.remove('main-header-fixed');
            this.headerElem.classList.remove('show');
            this.headerElem.classList.remove('hide');
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

        window.addEventListener('scroll', throttle(150, () => {
            this.headerHandling();
        }));
    }
};


export default mainHeader;
