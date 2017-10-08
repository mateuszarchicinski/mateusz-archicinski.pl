class Services {
    constructor(owlCaruselSelector) {
        this.owlCaruselSelector = owlCaruselSelector || '.owl-carousel-services-js';
    }
    init() {
        if (this.owlCaruselElem) return;

        const owlCaruselElem = this.owlCaruselElem = $('.owl-carousel-services-js');

        owlCaruselElem.owlCarousel({
            loop: true,
            center: true,
            autoplay: true,
            autoplayHoverPause: true,
            responsive: {
                992: {
                    items: 3
                },
                768: {
                    items: 2
                },
                0: {
                    items: 1
                }
            }
        });

        owlCaruselElem.on('mouseleave', () => {
            owlCaruselElem.trigger('stop.owl.autoplay');
            owlCaruselElem.trigger('play.owl.autoplay');
        });
    }
};


export default Services;
