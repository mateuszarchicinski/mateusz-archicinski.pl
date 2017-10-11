class smoothScrolling {
    constructor(scrollSelector, callback) {
        this.scrollSelector = scrollSelector || 'a[href*="#"]';
        this.callback = callback || null;
    }
    setCallback(callback) {
        if (typeof callback !== 'function') return;

        this.callback = callback;
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
                }, 800).promise().then(this.callback);
            }
        });
    }
};


export default smoothScrolling;
