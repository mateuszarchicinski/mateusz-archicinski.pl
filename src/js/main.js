(function ($) {
'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

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

var portfolio = function () {
    function portfolio(filters, items, filterActiveCls, itemHideCls, itemShowCls) {
        classCallCheck(this, portfolio);

        this.currentFilter = filters[0];
        this.filters = filters;
        this.items = items;
        this.filterActiveClass = filterActiveCls || 'active';
        this.itemHideClass = itemHideCls || 'hide';
        this.itemShowClass = itemShowCls || 'show';
    }

    createClass(portfolio, [{
        key: 'filterBy',
        value: function filterBy(filter) {
            var _this = this;

            if (!this.filteringStatus && filter && filter !== this.currentFilter) {
                var filterTypeValue = filter.getAttribute('data-filter-type');

                this.currentFilter.classList.remove(this.filterActiveClass);
                filter.classList.add(this.filterActiveClass);
                this.currentFilter = filter;

                this.items.forEach(function (item) {
                    var typeValue = item.getAttribute('data-type');

                    if (filterTypeValue === typeValue || filterTypeValue === "") {
                        item.classList.remove(_this.itemHideClass);
                        item.classList.add(_this.itemShowClass);
                    } else {
                        item.classList.remove(_this.itemShowClass);
                        item.classList.add(_this.itemHideClass);
                    }
                });
            }
        }
    }, {
        key: 'init',
        value: function init() {
            var _this2 = this;

            this.filters.forEach(function (filter) {
                filter.addEventListener('click', function () {
                    _this2.filterBy(filter);
                });
            });
        }
    }]);
    return portfolio;
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

    var filters = [].slice.call(document.querySelectorAll('.portfolio-filters-js button[data-filter-type]'));
    var items = [].slice.call(document.querySelectorAll('.portfolio-items-js div[data-type]'));
    var devPortfolio = new portfolio(filters, items);
    devPortfolio.init();
});

}($));
//# sourceMappingURL=main.js.map
