import {
    $window,
    $document
} from './globals';
import throttle from '../../node_modules/throttle-debounce/throttle';


class spyScrolling {
    constructor(scrollSelector, scrollActiveCls) {
        this.scrollSelector = scrollSelector || 'a[data-spy][href*="#"]';
        this.scrollActiveClass = scrollActiveCls || 'active';
        this.scrollTargets = [];
    }
    refresh() {
        const scrollTop = $document.scrollTop();

        for (let i = 0; i < this.scrollTargets.length; i++) {
            const item = this.scrollTargets[i],
                offsetTop = item.offsetTop - 65,
                offsetBottom = item.offsetHeight + item.offsetTop - 10;

            if (scrollTop >= offsetTop && scrollTop < offsetBottom) {
                this.setActive(i);
                return;
            }
        }
    }
    setActive(index) {
        if ($window.width() < 992) {
            index += (this.scrollElems.length / 2);
        }

        this.currScrollElem.classList.remove(this.scrollActiveClass);
        this.currScrollElem = this.scrollElems[index];
        this.currScrollElem.classList.add(this.scrollActiveClass);
    }
    init() {
        if (this.scrollElems) return;

        const scrollElems = this.scrollElems = [].slice.call(document.querySelectorAll(this.scrollSelector));

        if (!scrollElems) return;

        if ($window.width() < 992) {
            this.currScrollElem = scrollElems[(scrollElems.length / 2)];
        } else {
            this.currScrollElem = scrollElems[0];
        }


        for (let i = 0; i < (scrollElems.length / 2); i++) {
            this.scrollTargets.push(document.querySelector(scrollElems[i].hash));
        }

        window.addEventListener('scroll', throttle(100, () => {
            this.refresh();
        }));
    }
};


export default spyScrolling;
