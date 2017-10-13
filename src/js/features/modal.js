class Modal {
    constructor(modalSelector) {
        this.modalSelector = modalSelector || '.modal-js';
    }
    open(time) {
        this.modalElem.classList.add('open');
        setTimeout(() => {
            this.modalElem.focus();
        }, 50);
        setTimeout(() => {
            this.close();
        }, time || 5000);
    }
    close() {
        this.modalElem.classList.remove('open');
    }
    init() {
        if (this.modalElem) return;

        const modalElem = this.modalElem = document.querySelector(this.modalSelector);

        if (!modalElem) return;
    }
};

export default Modal;
