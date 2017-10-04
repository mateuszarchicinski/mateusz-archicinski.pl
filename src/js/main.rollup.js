import {
    mainHeader
} from './main-header';

import {
    siteNav
} from './site-nav';

import {
    Portfolio
} from './portfolio';

import {
    contactForm
} from './contact-form';


console.info('JavaScript running...');


$(document).ready(() => {
    // MAIN HEADER
    const mainHeaderInstance = new mainHeader();
    mainHeaderInstance.init();


    // SITE NAV
    const siteNavInstance = new siteNav();
    siteNavInstance.init();


    // SERVICES
    const owlCaruselServices = $('.owl-carousel-services-js');

    owlCaruselServices.owlCarousel({
        loop: true,
        center: true,
        autoplay: true,
        autoplayHoverPause: true
    });

    owlCaruselServices.on('mouseleave', () => {
        owlCaruselServices.trigger('stop.owl.autoplay');
        owlCaruselServices.trigger('play.owl.autoplay');
    });


    // PORTFOLIO
    const portfolioInstance = new Portfolio();
    portfolioInstance.init();


    // CONTACT
    const contactFormInstance = new contactForm();
    contactFormInstance.init();
});
