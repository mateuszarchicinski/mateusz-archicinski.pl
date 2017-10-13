import Modal from './modal';


class contactForm {
    constructor(formSelector, defaultUrl, defaultMethod, reqTimeout, formSuccessSelector, formErrorSelector) {
        this.formSelector = formSelector || '.contact-form-js';
        this.defaultUrl = defaultUrl || '/endpoints/contact-form';
        this.defaultMethod = defaultMethod || 'POST';
        this.reqTimeout = reqTimeout || 2500;
        this.formSuccessSelector = formSuccessSelector || '.contact-form-success-js';
        this.formErrorSelector = formErrorSelector || '.contact-form-error-js';
    }
    createModal(selector) {
        const newModal = new Modal(selector);
        newModal.init();

        return newModal;
    }
    getFormUrl() {
        const url = this.formElem.getAttribute('action');

        if (url === '#' || !url) {
            return this.defaultUrl;
        }

        return url;
    }
    getFormMethod() {
        const method = this.formElem.getAttribute('method');

        if (!method) {
            return this.defaultMethod;
        }

        return method.toUpperCase();
    }
    getFormData() {
        const data = {};

        this.inputElems.forEach((item) => {
            const property = item.getAttribute('name');

            data[property] = item.value;
        });

        return data;
    }
    cleanForm() {
        this.inputElems.forEach((item) => {
            item.value = '';
        });
    }
    init() {
        if (this.formElem) return;

        const formElem = this.formElem = document.querySelector(this.formSelector),
            inputElems = this.inputElems = [].slice.call(document.querySelectorAll(`${this.formSelector} input, ${this.formSelector} textarea`));

        if (!formElem || !inputElems) return;

        const formSuccess = this.formSuccess = this.createModal(this.formSuccessSelector),
            formError = this.formError = this.createModal(this.formErrorSelector);

        formElem.addEventListener('submit', (e) => {
            e.preventDefault();

            if (formElem.checkValidity()) {
                formElem.classList.add('contact-form-loading');

                setTimeout(() => {
                    $.ajax({
                        url: this.getFormUrl(),
                        method: this.getFormMethod(),
                        data: this.getFormData()
                    }).then(() => {
                        formElem.classList.remove('contact-form-loading');
                        formSuccess.open();
                        this.cleanForm();
                    }, () => {
                        formElem.classList.remove('contact-form-loading');
                        formError.open();
                    });
                }, this.reqTimeout);
            }
        });
    }
};


export default contactForm;
