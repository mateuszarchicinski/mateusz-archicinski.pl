import {
    Modal
} from './modal';


const modalInstance = new Modal('.contact-form-success-js');
modalInstance.init();


class contactForm {
    constructor(formSelector) {
        this.formSelector = formSelector || '.contact-form-js';
        this.initStatus = false;
    }
    init() {
        if (this.initStatus) return;

        const formElem = this.formElem = document.querySelector(this.formSelector),
            inputElems = [].slice.call(document.querySelectorAll(`${this.formSelector} input, ${this.formSelector} textarea`));

        if (formElem) {
            formElem.addEventListener('submit', (e) => {
                e.preventDefault();

                if (formElem.checkValidity()) {
                    formElem.classList.add('contact-form-loading');

                    setTimeout(() => {
                        formElem.classList.remove('contact-form-loading');

                        modalInstance.open();
                    }, 2500);

                    if (inputElems.length > 0) {
                        inputElems.forEach((item) => {
                            item.value = '';
                        });
                    }
                }
            });
        }

        this.initStatus = true;
    }
};


export default contactForm;
