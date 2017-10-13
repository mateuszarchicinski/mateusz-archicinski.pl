import Modal from './modal.js';


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
        }, false);

        const servicesInfo = new Modal('.services-info-js');
        servicesInfo.init();

        owlCaruselElem.on('click', 'button.services-item-button-js', () => {
            servicesInfo.open();
        });
    }
};


export default Services;
