(function ($) {
'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

console.info('JavaScript running...');

var mainHeader = document.querySelector('.main-header');

window.addEventListener('click', function () {
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

$(document).ready(function () {
    var owlCaruselServices = $('.owl-carousel-services-js');

    owlCaruselServices.owlCarousel({
        loop: true,
        center: true,
        autoplay: true,
        autoplayHoverPause: true
    });

    owlCaruselServices.on('mouseleave', function () {
        owlCaruselServices.trigger('stop.owl.autoplay');
        owlCaruselServices.trigger('play.owl.autoplay');
    });
});

}($));
//# sourceMappingURL=main.js.map
