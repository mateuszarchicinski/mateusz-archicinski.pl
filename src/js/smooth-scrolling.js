class smoothScrolling {
    constructor(scrollSelector) {
        this.scrollSelector = scrollSelector || 'a[href*="#"]';
    }
    init() {
        if (this.scrollElems) return;

        const scrollElems = this.scrollElems = $(this.scrollSelector).not('[href="#"]');

        scrollElems.click((e) => {
            const scrollTarget = $(e.currentTarget.hash);

            if (scrollTarget.length) {
                e.preventDefault();

                $('html, body').animate({
                    scrollTop: scrollTarget.offset().top
                }, 800);
            }
        });
    }
};


export default smoothScrolling;
