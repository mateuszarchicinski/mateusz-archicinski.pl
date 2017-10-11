import {
    $document
} from './globals/jquery';
import mainHeader from './features/main-header';
import sideNav from './features/side-nav';
import smoothScrolling from './features/smooth-scrolling';
import spyScrolling from './features/spy-scrolling';
import Services from './features/services';
import Portfolio from './features/portfolio';
import contactForm from './features/contact-form';


$document.ready(() => {
    // MAIN HEADER
    const mainHeaderInstance = new mainHeader();
    mainHeaderInstance.init();


    // SIDE NAV
    const sideNavInstance = new sideNav();
    sideNavInstance.init();


    // SMOOTH SCROLLING
    const smoothScrollingInstance = new smoothScrolling();
    smoothScrollingInstance.init();
    smoothScrollingInstance.setCallback(() => {
        sideNavInstance.close();
    });


    // SPY SCROLLING
    const spyScrollingInstance = new spyScrolling();
    spyScrollingInstance.init();


    // SERVICES
    const servicesInstance = new Services();
    servicesInstance.init();


    // PORTFOLIO
    const portfolioInstance = new Portfolio();
    portfolioInstance.init();


    // CONTACT
    const contactFormInstance = new contactForm();
    contactFormInstance.init();
});
