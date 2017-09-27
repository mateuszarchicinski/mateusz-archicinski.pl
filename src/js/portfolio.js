class Portfolio {
    constructor(filtersSelector, itemsSelector, filterActiveCls, itemHideCls, itemShowCls) {
        this.filtersSelector = filtersSelector || '.portfolio-filters-js';
        this.itemsSelector = itemsSelector || '.portfolio-items-js';
        this.filterActiveClass = filterActiveCls || 'active';
        this.itemHideClass = itemHideCls || 'hide';
        this.itemShowClass = itemShowCls || 'show';

        this.currFilterElem = document.querySelector(this.filtersSelector + ' button[data-filter-type].' + this.filterActiveClass);
        this.items = [].slice.call(document.querySelectorAll(this.itemsSelector + ' div[data-type]'));
    }
    filterBy(filterValue, filterElem) {
        if (!filterValue || !filterElem || this.currFilterElem === filterElem || !this.items) return;

        if (this.currFilterElem) {
            this.currFilterElem.classList.remove(this.filterActiveClass);
        }

        filterElem.classList.add(this.filterActiveClass);
        this.currFilterElem = filterElem;

        let itemCounter = 0;;

        this.items.forEach((item, index) => {
            const typeValue = item.getAttribute('data-type');

            if (filterValue === typeValue || filterValue === 'all') {
                item.classList.remove(this.itemHideClass);
                item.classList.add(this.itemShowClass);
                this.addStyles(itemCounter, item);
                itemCounter++;
            } else {
                item.classList.remove(this.itemShowClass);
                item.classList.add(this.itemHideClass);
            }
        });
    }
    addStyles(elemIndex, elem) {
        elem = $(elem);

        const elemWidth = elem.outerWidth(),
            elemHeight = elem.outerHeight(),
            elemParent = elem.parent(),
            itemsInRow = Math.floor(elemParent.outerWidth() / elemWidth),
            itemInColumn = Math.floor(elemIndex / itemsInRow);

        elemParent.css({
            height: elemHeight + (elemHeight * itemInColumn)
        });

        elem.css({
            position: 'absolute',
            left: elemWidth * (elemIndex % itemsInRow),
            top: elemHeight * itemInColumn
        });
    }
    init() {
        const filters = document.querySelector(this.filtersSelector);

        if (!filters || !this.items) return;

        filters.addEventListener('click', (e) => {
            const clickedElem = e.target,
                filterValue = clickedElem.getAttribute('data-filter-type') || clickedElem.parentNode.getAttribute('data-filter-type');

            if (!filterValue) {
                e.stopPropagation();
                return;
            }

            this.filterBy(filterValue, !clickedElem.hasAttribute('data-filter-type') ? clickedElem.parentNode : clickedElem);
        });
    }
};


export {
    Portfolio
};
