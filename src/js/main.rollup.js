import mainHeader from './main-header';
import sideNav from './side-nav';
import smoothScrolling from './smooth-scrolling';
import spyScrolling from './spy-scrolling';
import Services from './services';
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
