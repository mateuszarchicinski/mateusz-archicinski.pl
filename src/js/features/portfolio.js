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
        this.currItems = [];
    }
    getEventFilter(elem) {
        if (elem.hasAttribute('data-filter-type')) return elem;
        if (elem.parentNode.hasAttribute('data-filter-type')) return elem.parentNode;

        return null;
    }
    setCurrFilter(filter) {
        if (this.currFilter !== null) this.currFilter.classList.remove(this.filterActiveClass);
        this.currFilter = filter;
        this.currFilter.classList.add(this.filterActiveClass);
    }
    filterBy(filter, force) {
        if ((filter === null || filter === this.currFilter) && !force) return;

        // Default filter values
        let filterValue = '',
            itemCounter = 0;

        if (filter !== undefined) {
            this.setCurrFilter(filter);
            filterValue = filter.getAttribute('data-filter-type');
        }

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

        this.filterBy(currFilter || undefined, true);

        filters.addEventListener('click', (e) => {
            const filter = this.getEventFilter(e.target);

            if (!filter) return;

            this.filterBy(filter);
        });
    }
};


export default Portfolio;
