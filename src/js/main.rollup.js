import {
    Portfolio
} from './portfolio';


console.info('JavaScript running...');


const mainHeader = document.querySelector('.main-header');


window.addEventListener('click', () => {
    if (mainHeader.classList.contains('hide')) {
        mainHeader.classList.remove('hide');
        mainHeader.classList.add('show');
        status = true;

        return;
    }

    mainHeader.classList.remove('show');
    mainHeader.classList.add('hide');
    status = false;
});


$(document).ready(() => {
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
    const devPortfolio = new Portfolio();
    devPortfolio.init();
});
