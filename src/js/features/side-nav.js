import {
    $window
} from '../globals/jquery';


class sideNav {
    constructor(navSelector, navToggleSelector) {
        this.navSelector = navSelector || '.side-nav-js';
        this.navToggleSelector = navToggleSelector || '*[class$="nav-toggle-js"]';
        this.isOpen = false;
    }
    open() {
        this.navElem.classList.add('open');

        this.isOpen = true;
    }
    close() {
        this.navElem.classList.remove('open');

        this.isOpen = false;
    }
    toggle() {
        if (!this.isOpen) {
            this.open();
            return;
        }

        this.close();
    }
    init() {
        if (this.navElem) return;

        const navElem = this.navElem = document.querySelector(this.navSelector),
            navToggleElems = this.navToggleElem = [].slice.call(document.querySelectorAll(this.navToggleSelector));

        if (!navElem || !navToggleElems) return;

        navToggleElems.forEach((elem) => {
            elem.addEventListener('click', (e) => {
                e.stopPropagation();

                this.toggle();
            });
        });

        $window.on('click', (e) => {
            if (!$(e.target).parents(this.navSelector).length && this.isOpen) {
                this.close();
            }
        });
    }
};


export default sideNav;
