import mainHeader from './main-header';
import sideNav from './side-nav';
import smoothScrolling from './smooth-scrolling';
import Portfolio from './portfolio';
import contactForm from './contact-form';


$(document).ready(() => {
    // MAIN HEADER
    const mainHeaderInstance = new mainHeader();
    mainHeaderInstance.init();


    // SIDE NAV
    const sideNavInstance = new sideNav();
    sideNavInstance.init();
    
    
    // SMOOTH SCROLLING
    const smoothScrollingInstance = new smoothScrolling();
    smoothScrollingInstance.init();


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
