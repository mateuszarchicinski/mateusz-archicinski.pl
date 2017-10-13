import {
    $document,
    throttle
} from '../globals/globals';


class spyScrolling {
    constructor(scrollSelector, scrollActiveCls, offsetHeight) {
        this.scrollSelector = scrollSelector || 'a[data-spy][href*="#"]';
        this.scrollActiveClass = scrollActiveCls || 'active';
        this.offsetHeight = offsetHeight || -65;
        this.scrollRanges = [];
        this.currRangeIndex = 0;
    }
    refresh() {
        const scrollTop = $document.scrollTop();

        for (let i = 0; i < this.scrollRanges.length; i++) {
            const item = this.scrollRanges[i].rangeElem;

            if (!item) return;

            const offsetTop = item.offsetTop + this.offsetHeight,
                offsetBottom = item.offsetHeight + item.offsetTop - 10;

            if (scrollTop >= offsetTop && scrollTop < offsetBottom) {
                this.setCurrRange(i);
                return;
            }
        }
    }
    setCurrRange(index) {
        this.scrollRanges[this.currRangeIndex].elems.forEach((item) => {
            item.classList.remove(this.scrollActiveClass);
        });

        this.currRangeIndex = index;

        this.scrollRanges[this.currRangeIndex].elems.forEach((item) => {
            item.classList.add(this.scrollActiveClass);
        });
    }
    init() {
        if (this.scrollElems) return;

        const scrollElems = this.scrollElems = [].slice.call(document.querySelectorAll(this.scrollSelector));

        if (!scrollElems) return;

        const ids = [];

        scrollElems.forEach((item) => {
            const id = item.hash,
                indexOf = ids.indexOf(id);

            if (indexOf === -1) {
                ids.push(id);

                this.scrollRanges.push({
                    elems: [
                        item
                    ],
                    rangeElem: document.querySelector(id)
                });
            } else {
                this.scrollRanges[indexOf].elems.push(item);
            }
        });

        this.refresh();

        window.addEventListener('scroll', throttle(150, () => {
            this.refresh();
        }));

        window.addEventListener('resize', throttle(750, () => {
            this.refresh();
        }));
    }
};


export default spyScrolling;
