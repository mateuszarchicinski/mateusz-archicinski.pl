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
            if (!this.headerElem.classList.contains('main-header-fixed')) this.headerElem.classList.add('main-header-fixed');

            if (window.pageYOffset >= minHeight) {
                this.show();
            } else if (window.pageYOffset < minHeight) {
                this.hide();
            }
        } else {
            if (this.headerElem.classList.contains('main-header-fixed')) this.headerElem.classList.remove('main-header-fixed');
            if (this.headerElem.classList.contains('show')) this.headerElem.classList.remove('show');
            if (this.headerElem.classList.contains('hide')) this.headerElem.classList.remove('hide');
        }
    }
    show() {
        if (this.isVisible) return;

        this.headerElem.classList.remove('hide');
        this.headerElem.classList.add('show');

        this.isVisible = true;
    }
    hide() {
        if (!this.isVisible) return;

        this.headerElem.classList.remove('show');
        this.headerElem.classList.add('hide');

        this.isVisible = false;
    }
    init() {
        if (this.headerElem) return;

        const headerElem = this.headerElem = document.querySelector(this.headerSelector),
            sectionElem = this.sectionElem = document.querySelector(this.sectionSelector);

        if (!headerElem || !sectionElem) return;
    }
};


export default mainHeader;
