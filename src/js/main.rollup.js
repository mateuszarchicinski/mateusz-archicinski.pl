import $ from 'jQuery';


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
    $('.owl-carousel-js').owlCarousel({
        loop: true
    });
});
