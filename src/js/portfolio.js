class portfolio {
    constructor(filters, items, filterActiveCls, itemHideCls, itemShowCls) {
        this.currentFilter = filters[0];
        this.filters = filters;
        this.items = items;
        this.filterActiveClass = filterActiveCls || 'active';
        this.itemHideClass = itemHideCls || 'hide';
        this.itemShowClass = itemShowCls || 'show';
    }
    filterBy(filter) {
        if (!this.filteringStatus && filter && filter !== this.currentFilter) {
            const filterTypeValue = filter.getAttribute('data-filter-type');

            this.currentFilter.classList.remove(this.filterActiveClass);
            filter.classList.add(this.filterActiveClass);
            this.currentFilter = filter;

            this.items.forEach((item) => {
                const typeValue = item.getAttribute('data-type');

                if (filterTypeValue === typeValue || filterTypeValue === "") {
                    item.classList.remove(this.itemHideClass);
                    item.classList.add(this.itemShowClass);
                } else {
                    item.classList.remove(this.itemShowClass);
                    item.classList.add(this.itemHideClass);
                }
            });
        }
    }
    init() {
        this.filters.forEach((filter) => {
            filter.addEventListener('click', () => {
                this.filterBy(filter);
            });
        });
    }
};


export {
    portfolio
};
