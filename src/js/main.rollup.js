import {
    $document,
    throttle,
    debounce,
    isBreakpoint
} from './globals/globals';
import mainHeader from './features/main-header';
import sideNav from './features/side-nav';
import smoothScrolling from './features/smooth-scrolling';
import spyScrolling from './features/spy-scrolling';
import Services from './features/services';
import Portfolio from './features/portfolio';
import contactForm from './features/contact-form';
import githubUserInfo from './features/github-user-info';


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

    // Callback should be added only on devices with min-width >= 992
    if (!isBreakpoint('lg')) {
        smoothScrollingInstance.setCallback(() => {
            sideNavInstance.close();
        });
    }


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


    // GITHUB USER INFO
    const githubUserInfoInstance = new githubUserInfo();
    githubUserInfoInstance.init();


    // GLOBAL EVENTS ~
    // SCROLL
    window.addEventListener('scroll', throttle(150, () => {
        // These functions should be called also on scroll event with time interval set to 150ms
        mainHeaderInstance.headerHandling();
        spyScrollingInstance.refresh();
    }));

    // RESIZE
    window.addEventListener('resize', debounce(600, () => {
        // These functions should be called also on ends resize event with timeout set to 600ms
        spyScrollingInstance.refresh();
        portfolioInstance.currItems.forEach((item, index) => {
            portfolioInstance.addStyles(item, index);
        });
    }));
});
