import {
    $window,
    $document
} from './globals';
import debounce from '../../node_modules/throttle-debounce/debounce';


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
            navToggleElems = this.navToggleElem = [].slice.call(document.querySelectorAll(this.navToggleSelector));

        navToggleElems.forEach((elem) => {
            elem.addEventListener('click', (e) => {
                e.stopPropagation();

                if (!this.isOpen) {
                    this.open();
                    return;
                }

                this.close();
            });
        });

        $window.on('click', (e) => {
            if (!$(e.target).parents(this.navSelector).length && this.isOpen) {
                this.close();
            }
        });

        this.setNavHeight();

        window.addEventListener('resize', debounce(500, () => {
            this.setNavHeight();
        }));
    }
};


export default sideNav;
