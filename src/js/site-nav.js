import {
    $window,
    $document
} from './globals';
import debounce from '../../node_modules/throttle-debounce/throttle';


class siteNav {
    constructor(navSelector, navToggleSelector) {
        this.navSelector = navSelector || '.site-nav-js';
        this.navToggleSelector = navToggleSelector || '.site-nav-toggle-js';
        this.isOpen = false;
    }
    open() {
        this.navElem.classList.add('open');
        this.navToggleElem.classList.add('active');

        this.isOpen = true;
    }
    close() {
        this.navElem.classList.remove('open');
        this.navToggleElem.classList.remove('active');

        this.isOpen = false;
    }
    setNavHeight() {
        const windowWidth = $window.width(),
            documentHeight = $document.height();

        if (windowWidth < 992) {
            this.navElem.style.height = documentHeight + 'px';
        } else {
            this.navElem.style.height = null;
        }
    }
    init() {
        if (this.navElem) return;

        const navElem = this.navElem = document.querySelector(this.navSelector),
            navToggleElem = this.navToggleElem = document.querySelector(this.navToggleSelector);

        navToggleElem.addEventListener('click', () => {
            if (!this.isOpen) {
                this.open();
                return;
            }

            this.close();
        });

        this.setNavHeight();

        window.addEventListener('resize', debounce(250, () => {
            this.setNavHeight();
        }));
    }
};


export {
    siteNav
};
