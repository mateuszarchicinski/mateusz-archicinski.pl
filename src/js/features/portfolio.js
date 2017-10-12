import throttle from '../functions/throttle';


class Portfolio {
    constructor(filtersSelector, itemsSelector, filterActiveCls, itemShowCls, itemHideCls) {
        this.filtersSelector = filtersSelector || '.portfolio-filters-js';
        this.itemsSelector = itemsSelector || '.portfolio-items-js';
        this.filterActiveClass = filterActiveCls || 'active';
        this.itemShowClass = itemShowCls || 'show';
        this.itemHideClass = itemHideCls || 'hide';

        this.filters = document.querySelector(this.filtersSelector);
        this.currFilter = document.querySelector(this.filtersSelector + ' button[data-filter-type].' + this.filterActiveClass);
        this.items = [].slice.call(document.querySelectorAll(this.itemsSelector + ' div[data-type]'));
    }
    setCurrFilter(filter) {
        if (!filter || this.currFilter === filter) return;

        this.currFilter.classList.remove(this.filterActiveClass);
        this.currFilter = filter;
        this.currFilter.classList.add(this.filterActiveClass);
    }
    filterBy(filterValue) {
        if ((!filterValue && filterValue !== '') || filterValue === this.currFilterValue) return;

        let itemCounter = 0;

        this.currItems = this.items.filter((item) => {
            const condition = filterValue === item.getAttribute('data-type') || filterValue === '';

            if (condition) {
                item.classList.remove(this.itemHideClass);
                item.classList.add(this.itemShowClass);
                this.addStyles(item, itemCounter);
                itemCounter++;
            } else {
                item.classList.remove(this.itemShowClass);
                item.classList.add(this.itemHideClass);
            }

            return condition;
        });

        this.currFilterValue = filterValue;
    }
    addStyles(elem, elemIndex) {
        elem = $(elem);

        const elemWidth = elem.outerWidth(),
            elemHeight = elem.outerHeight(),
            elemParent = elem.parent(),
            maxRowNum = Math.floor(elemParent.outerWidth() / elemWidth),
            rowNum = Math.floor(elemIndex / maxRowNum);

        elemParent.css({
            height: elemHeight + (elemHeight * rowNum)
        });

        elem.css({
            left: elemWidth * (elemIndex % maxRowNum),
            top: elemHeight * rowNum
        });
    }
    init() {
        const filters = this.filters,
            items = this.items,
            currFilter = this.currFilter;

        if (!filters || !items) return;

        const currFilterValue = currFilter ? currFilter.getAttribute('data-filter-type') : '';

        this.filterBy(currFilterValue);

        filters.addEventListener('click', (e) => {
            const clickedElem = e.target;
            let filter = null;

            if (clickedElem.hasAttribute('data-filter-type')) {
                filter = clickedElem;
            }

            if (clickedElem.parentNode.hasAttribute('data-filter-type')) {
                filter = clickedElem.parentNode;
            }

            if (!filter) return;

            this.setCurrFilter(filter);
            this.filterBy(filter.getAttribute('data-filter-type'));
        });

        window.addEventListener('resize', throttle(500, () => {
            this.currItems.forEach((item, index) => {
                this.addStyles(item, index);
            });
        }));
    }
};


export default Portfolio;
