(function () {
'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Portfolio = function () {
    function Portfolio(filtersSelector, itemsSelector, filterActiveCls, itemHideCls, itemShowCls) {
        classCallCheck(this, Portfolio);

        this.filtersSelector = filtersSelector || '.portfolio-filters-js';
        this.itemsSelector = itemsSelector || '.portfolio-items-js';
        this.filterActiveClass = filterActiveCls || 'active';
        this.itemHideClass = itemHideCls || 'hide';
        this.itemShowClass = itemShowCls || 'show';

        this.currFilterElem = document.querySelector(this.filtersSelector + ' button[data-filter-type].' + this.filterActiveClass);
        this.items = [].slice.call(document.querySelectorAll(this.itemsSelector + ' div[data-type]'));
    }

    createClass(Portfolio, [{
        key: 'filterBy',
        value: function filterBy(filterValue, filterElem) {
            var _this = this;

            if (!filterValue || !filterElem || this.currFilterElem === filterElem || !this.items) return;

            if (this.currFilterElem) {
                this.currFilterElem.classList.remove(this.filterActiveClass);
            }

            filterElem.classList.add(this.filterActiveClass);
            this.currFilterElem = filterElem;

            var itemCounter = 0;

            this.items.forEach(function (item, index) {
                var typeValue = item.getAttribute('data-type');

                if (filterValue === typeValue || filterValue === 'all') {
                    item.classList.remove(_this.itemHideClass);
                    item.classList.add(_this.itemShowClass);
                    _this.addStyles(itemCounter, item);
                    itemCounter++;
                } else {
                    item.classList.remove(_this.itemShowClass);
                    item.classList.add(_this.itemHideClass);
                }
            });
        }
    }, {
        key: 'addStyles',
        value: function addStyles(elemIndex, elem) {
            elem = $(elem);

            var elemWidth = elem.outerWidth(),
                elemHeight = elem.outerHeight(),
                elemParent = elem.parent(),
                maxRowNum = Math.floor(elemParent.outerWidth() / elemWidth),
                rowNum = Math.floor(elemIndex / maxRowNum);

            elemParent.css({
                height: elemHeight + elemHeight * rowNum
            });

            elem.css({
                position: 'absolute',
                left: elemWidth * (elemIndex % maxRowNum),
                top: elemHeight * rowNum
            });
        }
    }, {
        key: 'init',
        value: function init() {
            var _this2 = this;

            var filters = document.querySelector(this.filtersSelector);

            if (!filters || !this.items) return;

            filters.addEventListener('click', function (e) {
                var clickedElem = e.target,
                    filterValue = clickedElem.getAttribute('data-filter-type') || clickedElem.parentNode.getAttribute('data-filter-type');

                if (!filterValue) {
                    e.stopPropagation();
                    return;
                }

                _this2.filterBy(filterValue, !clickedElem.hasAttribute('data-filter-type') ? clickedElem.parentNode : clickedElem);
            });
        }
    }]);
    return Portfolio;
}();

var Modal = function () {
    function Modal(modalSelector) {
        classCallCheck(this, Modal);

        this.modalSelector = modalSelector || '.modal-js';
        this.initStatus = false;
    }

    createClass(Modal, [{
        key: 'open',
        value: function open(time) {
            var _this = this;

            this.modalElem.classList.add('open');
            setTimeout(function () {
                _this.close();
            }, time || 5000);
        }
    }, {
        key: 'close',
        value: function close() {
            this.modalElem.classList.remove('open');
        }
    }, {
        key: 'init',
        value: function init() {
            if (this.initStatus) return;

            var modalElem = this.modalElem = document.querySelector(this.modalSelector);

            if (!modalElem) return;

            this.initStatus = true;
        }
    }]);
    return Modal;
}();

var modalInstance = new Modal();
modalInstance.init();

var contactForm = function () {
    function contactForm(formSelector) {
        classCallCheck(this, contactForm);

        this.formSelector = formSelector || '.contact-form-js';
        this.initStatus = false;
    }

    createClass(contactForm, [{
        key: 'init',
        value: function init() {
            if (this.initStatus) return;

            var formElem = this.formElem = document.querySelector(this.formSelector),
                inputElems = [].slice.call(document.querySelectorAll(this.formSelector + ' input, ' + this.formSelector + ' textarea'));

            if (formElem) {
                formElem.addEventListener('submit', function (e) {
                    e.preventDefault();

                    if (formElem.checkValidity()) {
                        formElem.classList.add('contact-form-loading');

                        setTimeout(function () {
                            formElem.classList.remove('contact-form-loading');

                            modalInstance.open();
                        }, 2500);

                        if (inputElems.length > 0) {
                            inputElems.forEach(function (item) {
                                item.value = '';
                            });
                        }
                    }
                });
            }

            this.initStatus = true;
        }
    }]);
    return contactForm;
}();

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
    // SERVICES
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

    // PORTFOLIO
    var portfolioInstance = new Portfolio();
    portfolioInstance.init();

    // CONTACT
    var contactFormInstance = new contactForm();
    contactFormInstance.init();
});

}());
//# sourceMappingURL=main.js.map
