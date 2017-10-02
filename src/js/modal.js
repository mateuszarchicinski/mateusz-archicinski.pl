class Modal {
    constructor(modalSelector) {
        this.modalSelector = modalSelector || '.modal-js';
        this.initStatus = false;
    }
    open(time) {
        this.modalElem.classList.add('open');
        setTimeout(() => {
            this.close();
        }, time || 5000);
    }
    close() {
        this.modalElem.classList.remove('open');
    }
    init() {
        if (this.initStatus) return;

        const modalElem = this.modalElem = document.querySelector(this.modalSelector);

        if (!modalElem) return;

        this.initStatus = true;
    }
};

export {
    Modal
};
