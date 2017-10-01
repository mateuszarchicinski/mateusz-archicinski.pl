class contactForm {
    constructor(formSelector) {
        this.formSelector = formSelector || '.contact-form-js';
    }
    init() {
        this.formElem = document.querySelector(this.formSelector);

        this.formElem.addEventListener('submit', (e) => {
            console.log(e);
            e.preventDefault();
        });
    }
};


export {
    contactForm
};
