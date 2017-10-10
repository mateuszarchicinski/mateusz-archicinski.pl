(function () {
'use strict';

var $window = $(window);
var $document = $(document);

/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param  {Number}    delay          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}   noTrailing     Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
 *                                    the internal counter is reset)
 * @param  {Function}  callback       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param  {Boolean}   debounceMode   If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
 *                                    schedule `callback` to execute after `delay` ms.
 *
 * @return {Function}  A new, throttled, function.
 */
var throttle = function throttle(delay, noTrailing, callback, debounceMode) {

	// After wrapper has stopped being called, this timeout ensures that
	// `callback` is executed at the proper times in `throttle` and `end`
	// debounce modes.
	var timeoutID;

	// Keep track of the last time `callback` was executed.
	var lastExec = 0;

	// `noTrailing` defaults to falsy.
	if (typeof noTrailing !== 'boolean') {
		debounceMode = callback;
		callback = noTrailing;
		noTrailing = undefined;
	}

	// The `wrapper` function encapsulates all of the throttling / debouncing
	// functionality and when executed will limit the rate at which `callback`
	// is executed.
	function wrapper() {

		var self = this;
		var elapsed = Number(new Date()) - lastExec;
		var args = arguments;

		// Execute `callback` and update the `lastExec` timestamp.
		function exec() {
			lastExec = Number(new Date());
			callback.apply(self, args);
		}

		// If `debounceMode` is true (at begin) this is used to clear the flag
		// to allow future `callback` executions.
		function clear() {
			timeoutID = undefined;
		}

		if (debounceMode && !timeoutID) {
			// Since `wrapper` is being called for the first time and
			// `debounceMode` is true (at begin), execute `callback`.
			exec();
		}

		// Clear any existing timeout.
		if (timeoutID) {
			clearTimeout(timeoutID);
		}

		if (debounceMode === undefined && elapsed > delay) {
			// In throttle mode, if `delay` time has been exceeded, execute
			// `callback`.
			exec();
		} else if (noTrailing !== true) {
			// In trailing throttle mode, since `delay` time has not been
			// exceeded, schedule `callback` to execute `delay` ms after most
			// recent execution.
			//
			// If `debounceMode` is true (at begin), schedule `clear` to execute
			// after `delay` ms.
			//
			// If `debounceMode` is false (at end), schedule `callback` to
			// execute after `delay` ms.
			timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
		}
	}

	// Return the wrapper function.
	return wrapper;
};

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

var mainHeader = function () {
    function mainHeader(headerSelector, sectionSelector, offsetHeight) {
        classCallCheck(this, mainHeader);

        this.headerSelector = headerSelector || '.main-header-js';
        this.sectionSelector = sectionSelector || '.main-wrapper > .section';
        this.offsetHeight = offsetHeight || -10;
    }

    createClass(mainHeader, [{
        key: 'headerHandling',
        value: function headerHandling() {
            var minHeight = this.minHeight + this.offsetHeight;

            if (window.pageYOffset >= minHeight / 2.5) {
                this.headerElem.classList.add('main-header-fixed');
            } else {
                this.headerElem.classList.remove('main-header-fixed');
                this.headerElem.classList.remove('show');
                this.headerElem.classList.remove('hide');
            }

            if (window.pageYOffset >= minHeight) {
                this.show();
            } else if (window.pageYOffset < minHeight && window.pageYOffset >= minHeight / 2.5) {
                this.hide();
            }
        }
    }, {
        key: 'show',
        value: function show() {
            this.headerElem.classList.remove('hide');
            this.headerElem.classList.add('show');
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.headerElem.classList.remove('show');
            this.headerElem.classList.add('hide');
        }
    }, {
        key: 'init',
        value: function init() {
            var _this = this;

            if (this.headerElem) return;

            var headerElem = this.headerElem = document.querySelector(this.headerSelector),
                sectionElem = this.sectionElem = document.querySelector(this.sectionSelector);

            if (!headerElem || !sectionElem) return;

            this.minHeight = sectionElem.offsetHeight;

            window.addEventListener('scroll', throttle(250, function () {
                _this.headerHandling();
            }));
        }
    }]);
    return mainHeader;
}();

/* eslint-disable no-undefined */

/**
 * Debounce execution of a function. Debouncing, unlike throttling,
 * guarantees that a function is only executed a single time, either at the
 * very beginning of a series of calls, or at the very end.
 *
 * @param  {Number}   delay         A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}  atBegin       Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
 *                                  after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
 *                                  (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
 * @param  {Function} callback      A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                  to `callback` when the debounced-function is executed.
 *
 * @return {Function} A new, debounced function.
 */
var debounce = function debounce(delay, atBegin, callback) {
  return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
};

var sideNav = function () {
    function sideNav(navSelector, navToggleSelector) {
        classCallCheck(this, sideNav);

        this.navSelector = navSelector || '.side-nav-js';
        this.navToggleSelector = navToggleSelector || '*[class$="nav-toggle-js"]';
        this.isOpen = false;
    }

    createClass(sideNav, [{
        key: 'open',
        value: function open() {
            this.navElem.classList.add('open');

            this.isOpen = true;
        }
    }, {
        key: 'close',
        value: function close() {
            this.navElem.classList.remove('open');

            this.isOpen = false;
        }
    }, {
        key: 'init',
        value: function init() {
            var _this = this;

            if (this.navElem) return;

            var navElem = this.navElem = document.querySelector(this.navSelector),
                navToggleElems = this.navToggleElem = [].slice.call(document.querySelectorAll(this.navToggleSelector));

            navToggleElems.forEach(function (elem) {
                elem.addEventListener('click', function (e) {
                    e.stopPropagation();

                    if (!_this.isOpen) {
                        _this.open();
                        return;
                    }

                    _this.close();
                });
            });

            $window.on('click', function (e) {
                if (!$(e.target).parents(_this.navSelector).length && _this.isOpen) {
                    _this.close();
                }
            });
        }
    }]);
    return sideNav;
}();

var smoothScrolling = function () {
    function smoothScrolling(scrollSelector, callback) {
        classCallCheck(this, smoothScrolling);

        this.scrollSelector = scrollSelector || 'a[href*="#"]';
        this.callback = callback || null;
    }

    createClass(smoothScrolling, [{
        key: 'setCallback',
        value: function setCallback(callback) {
            if (typeof callback !== 'function') return;

            this.callback = callback;
        }
    }, {
        key: 'init',
        value: function init() {
            var _this = this;

            if (this.scrollElems) return;

            var scrollElems = this.scrollElems = $(this.scrollSelector).not('[href="#"]');

            scrollElems.click(function (e) {
                var scrollTarget = $(e.currentTarget.hash);

                if (scrollTarget.length) {
                    e.preventDefault();

                    $('html, body').animate({
                        scrollTop: scrollTarget.offset().top
                    }, 800).promise().then(_this.callback);
                }
            });
        }
    }]);
    return smoothScrolling;
}();

var spyScrolling = function () {
    function spyScrolling(scrollSelector, scrollActiveCls) {
        classCallCheck(this, spyScrolling);

        this.scrollSelector = scrollSelector || 'a[data-spy][href*="#"]';
        this.scrollActiveClass = scrollActiveCls || 'active';
        this.scrollTargets = [];
    }

    createClass(spyScrolling, [{
        key: 'refresh',
        value: function refresh() {
            var scrollTop = $document.scrollTop();

            for (var i = 0; i < this.scrollTargets.length; i++) {
                var item = this.scrollTargets[i],
                    offsetTop = item.offsetTop - 65,
                    offsetBottom = item.offsetHeight + item.offsetTop - 10;

                if (scrollTop >= offsetTop && scrollTop < offsetBottom) {
                    this.setActive(i);
                    return;
                }
            }
        }
    }, {
        key: 'setActive',
        value: function setActive(index) {
            if ($window.width() < 992) {
                index += this.scrollElems.length / 2;
            }

            this.currScrollElem.classList.remove(this.scrollActiveClass);
            this.currScrollElem = this.scrollElems[index];
            this.currScrollElem.classList.add(this.scrollActiveClass);
        }
    }, {
        key: 'init',
        value: function init() {
            var _this = this;

            if (this.scrollElems) return;

            var scrollElems = this.scrollElems = [].slice.call(document.querySelectorAll(this.scrollSelector));

            if (!scrollElems) return;

            if ($window.width() < 992) {
                this.currScrollElem = scrollElems[scrollElems.length / 2];
            } else {
                this.currScrollElem = scrollElems[0];
            }

            for (var i = 0; i < scrollElems.length / 2; i++) {
                this.scrollTargets.push(document.querySelector(scrollElems[i].hash));
            }

            window.addEventListener('scroll', throttle(100, function () {
                _this.refresh();
            }));
        }
    }]);
    return spyScrolling;
}();

var Services = function () {
    function Services(owlCaruselSelector) {
        classCallCheck(this, Services);

        this.owlCaruselSelector = owlCaruselSelector || '.owl-carousel-services-js';
    }

    createClass(Services, [{
        key: 'init',
        value: function init() {
            if (this.owlCaruselElem) return;

            var owlCaruselElem = this.owlCaruselElem = $('.owl-carousel-services-js');

            owlCaruselElem.owlCarousel({
                loop: true,
                center: true,
                autoplay: true,
                autoplayHoverPause: true,
                responsive: {
                    992: {
                        items: 3
                    },
                    768: {
                        items: 2
                    },
                    0: {
                        items: 1
                    }
                }
            });

            owlCaruselElem.on('mouseleave', function () {
                owlCaruselElem.trigger('stop.owl.autoplay');
                owlCaruselElem.trigger('play.owl.autoplay');
            }, false);
        }
    }]);
    return Services;
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
        value: function filterBy(filterValue, filterElem, force) {
            var _this = this;

            if (!force) {
                if (!filterValue || !filterElem || this.currFilterElem === filterElem || !this.items) return;
            }

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

            window.addEventListener('resize', debounce(500, function () {
                _this2.filterBy(_this2.currFilterElem.getAttribute('data-filter-type'), _this2.currFilterElem, true);
            }));
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

var modalInstance = new Modal('.contact-form-success-js');
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

$document.ready(function () {
    // MAIN HEADER
    var mainHeaderInstance = new mainHeader();
    mainHeaderInstance.init();

    // SIDE NAV
    var sideNavInstance = new sideNav();
    sideNavInstance.init();

    // SMOOTH SCROLLING
    var smoothScrollingInstance = new smoothScrolling();
    smoothScrollingInstance.init();
    smoothScrollingInstance.setCallback(function () {
        sideNavInstance.close();
    });

    // SPY SCROLLING
    var spyScrollingInstance = new spyScrolling();
    spyScrollingInstance.init();

    // SERVICES
    var servicesInstance = new Services();
    servicesInstance.init();

    // PORTFOLIO
    var portfolioInstance = new Portfolio();
    portfolioInstance.init();

    // CONTACT
    var contactFormInstance = new contactForm();
    contactFormInstance.init();
});

}());
//# sourceMappingURL=main.js.map
