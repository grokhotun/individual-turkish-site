"use strict";

/*
    Полифилы
*/
// Полифил на forEach
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

;

var inputsFilter = function inputsFilter() {
  document.querySelectorAll('.js-only-digits').forEach(function (item) {
    item.addEventListener('input', function (e) {
      e.target.value = e.target.value.replace(/\D/g, '');
    });
  });
};

var formValidation = function formValidation() {
  var forms = document.querySelectorAll('.form');
  forms.forEach(function (formItem) {
    var pristine = new Pristine(formItem);
    formItem.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = pristine.validate();

      if (valid) {
        formItem.submit();
      } else {
        setTimeout(function () {
          pristine.reset();
        }, 5000);
      }
    });
  });
};

var inputMasking = function inputMasking() {
  document.querySelectorAll('.js-mask-phone').forEach(function (item) {
    item.addEventListener('input', function (e) {
      VMasker(e.target).maskPattern("(999) 999-99-99");
    });
  });
};

var popups = function popups() {
  var popups = document.querySelectorAll('.popup');
  var popupOpenLinks = document.querySelectorAll('.js-popup-open');
  var popupCloseLinks = document.querySelectorAll('.js-popup-close');
  var lockPadding = document.querySelectorAll('.lock-padding');
  var body = document.querySelector('body');
  var lockPaddingOffset = null;
  var burger = null;
  var isTransitioning = false;
  var shouldUnlock = false;

  function _bodyLock() {
    lockPaddingOffset = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
      lockPadding.forEach(function (element) {
        element.style.paddingRight = lockPaddingOffset;
      });
    }

    body.style.paddingRight = lockPaddingOffset;
    body.classList.add('lock');
  }

  function _bodyUnlock() {
    isTransitioning = false;

    if (shouldUnlock) {
      body.style.paddingRight = '0px';
      body.classList.remove('lock');

      if (lockPadding.length > 0) {
        lockPadding.forEach(function (element) {
          element.style.paddingRight = '0px';
        });
      }

      shouldUnlock = false;
    }
  }

  function _popupOpen(openingPopup) {
    if (!isTransitioning) {
      isTransitioning = true;
      var popupActive = document.querySelector('.popup.is-opened');

      if (popupActive) {
        _popupClose(popupActive, false);
      } // openingPopup.scrollTo(0, 0);


      openingPopup.classList.add('is-opened');

      _bodyLock();
    }
  }

  function _popupClose(closingPopup) {
    var unlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (!isTransitioning) {
      isTransitioning = true;
      burger = document.querySelector('.burger.is-active');
      closingPopup.classList.remove('is-opened');

      if (unlock && !burger) {
        shouldUnlock = true;
      }
    }
  }

  function init() {
    if (popupOpenLinks.length > 0) {
      popupOpenLinks.forEach(function (popupLink) {
        popupLink.addEventListener('click', function (e) {
          e.preventDefault();
          var openingPopup = document.querySelector(popupLink.getAttribute('href'));

          if (openingPopup) {
            _popupOpen(openingPopup);
          }
        });
      });
    }

    if (popupCloseLinks.length > 0) {
      popupCloseLinks.forEach(function (popupLink) {
        popupLink.addEventListener('click', function (e) {
          e.preventDefault();

          _popupClose(popupLink.closest('.popup'));
        });
      });
    }

    if (popups.length > 0) {
      popups.forEach(function (element) {
        element.addEventListener('transitionend', function (e) {
          if (e.propertyName === 'transform') {
            _bodyUnlock();
          }
        });
        element.addEventListener('click', function (e) {
          if (!e.target.closest('.popup__body')) {
            _popupClose(e.target.closest('.popup.is-opened'));
          }
        });
      });
      document.addEventListener('keydown', function (e) {
        if (e.which === 27) {
          var openedPopup = document.querySelector('.popup.is-opened');

          if (openedPopup) {
            _popupClose(openedPopup);
          }
        }
      });
    }
  }

  init();
};

var imgToBackground = function imgToBackground() {
  document.querySelectorAll(".ibg").forEach(function (el) {
    if (el.querySelector('img')) {
      el.style.backgroundImage = 'url(' + el.querySelector('img').getAttribute('src') + ')';
      el.querySelector('img').style.display = 'none';
    }
  });
};

var burgerMenu = function burgerMenu(className) {
  var burger = document.querySelector('.burger');
  var burgerMenu = document.querySelector(".".concat(className));

  if (burgerMenu) {
    burger.addEventListener('click', function (e) {
      burger.classList.toggle('is-active');
      burgerMenu.classList.toggle('is-shown');
      document.querySelector('body').classList.toggle('lock');
    });
  }
};

var sliders = function sliders() {
  var sliderBenefits = new Swiper('.slider-for-whom__container', {
    loop: true,
    navigation: {
      nextEl: '.for-whom__slider-btn--next',
      prevEl: '.for-whom__slider-btn--prev'
    },
    spaceBetween: 30,
    slidesPerView: 1,
    breakpoints: {
      1470: {
        slidesPerView: 4
      },
      800: {
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 3
      }
    }
  });
  var sliderTeachers = new Swiper('.slider-teachers__container', {
    loop: true,
    navigation: {
      nextEl: '.slider-teachers__btn--next',
      prevEl: '.slider-teachers__btn--prev'
    },
    spaceBetween: 0,
    slidesPerView: 1
  });
  var sliderLevels = new Swiper('.slider-levels__container', {
    loop: true,
    navigation: {
      nextEl: '.levels__slider-btn--next',
      prevEl: '.levels__slider-btn--prev'
    },
    spaceBetween: 30,
    slidesPerView: 1,
    breakpoints: {
      1470: {
        slidesPerView: 4
      },
      800: {
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 3
      }
    }
  });
  var sliderTestimonials = new Swiper('.slider-testimonials__container', {
    loop: true,
    pagination: {
      el: '.slider-testimonials__pagination',
      type: 'bullets'
    },
    spaceBetween: 60,
    slidesPerView: 1,
    breakpoints: {
      1470: {
        slidesPerView: 4
      },
      800: {
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 3
      }
    }
  });
};

var preloader = function preloader() {
  var preloaderBody = document.querySelector('.preloader__body');
  var preloader = document.querySelector('.preloader');
  var body = document.querySelector('body');

  if (preloader) {
    body.classList.add('lock');
    new Promise(function (resolve) {
      setTimeout(resolve, 800);
    }).then(function () {
      preloaderBody.style.display = 'none';
      preloader.classList.add('is-loaded');
      body.classList.remove('lock');
    });
  }
};

var htmlMover = function htmlMover() {
  var movingElements = document.querySelectorAll('[data-html-mover]');
  var movingElementsPositions = [];
  var mediaQueries = [];

  function _debounce(func, delay) {
    var inDebounce;
    return function () {
      var context = this;
      var args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(function () {
        return func.apply(context, args);
      }, delay);
    };
  }

  ;

  function _getElementByIndex(parent, index) {
    var children = parent.children;

    if (children.length > 0) {
      return children[index];
    } else {
      return null;
    }
  }

  ;

  function _getElementByClass(parent, className) {
    return parent.querySelector(".".concat(className));
  }

  ;

  function _getIndexInParent(element) {
    var children = Array.prototype.slice.call(element.parentNode.children);
    return children.indexOf(element);
  }

  ;

  function _insertBefore(element, sibling) {
    sibling.before(element);
  }

  ;

  function _insertToEnd(element, parent) {
    parent.append(element);
  }

  ;

  function _smartInsert(element, parent, index) {
    var insertingBefore = _getElementByIndex(parent, index);

    if (insertingBefore) {
      _insertBefore(element, insertingBefore);
    } else {
      _insertToEnd(element, parent);
    }
  }

  ;

  function _sort(array) {
    array.sort(function (a, b) {
      if (a.breakpoint > b.breakpoint) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  ;

  function createMediaquery() {
    if (movingElementsPositions.length > 0) {
      movingElementsPositions.forEach(function (element) {
        mediaQueries.push(window.matchMedia("(max-width: ".concat(element.breakpoint, "px")));
      });
    }
  }

  ;

  function move() {
    movingElementsPositions.forEach(function (element, index) {
      var htmlClass = "html-mover-".concat(element.breakpoint);

      if (mediaQueries[index].matches) {
        if (element.originalParent !== element.newParent) {
          if (!element.movingElement.classList.contains(htmlClass) && element.originalParent !== element.newParent) {
            switch (element.newPlace) {
              case 'first':
                _smartInsert(element.movingElement, element.newParent, 0);

                break;

              case 'last':
                _smartInsert(element.movingElement, element.newParent);

                break;

              default:
                {
                  if (parseInt(element.newPlace) >= 0) {
                    _smartInsert(element.movingElement, element.newParent, parseInt(element.newPlace));
                  } else {
                    var insertingBefore = _getElementByClass(element.newParent, element.newPlace);

                    if (insertingBefore) {
                      _insertBefore(element.movingElement, insertingBefore);
                    }
                  }

                  break;
                }
            }

            element.movingElement.classList.add(htmlClass);
          }
        } else {
          console.warn('HTML-mover: элемент', element.movingElement, 'имеет неверный селектор!');
        }
      } else {
        if (element.movingElement.classList.contains(htmlClass)) {
          _smartInsert(element.movingElement, element.originalParent, element.originalPlace);

          element.movingElement.classList.remove(htmlClass);
        }
      }
    });
  }

  ;

  function init() {
    if (movingElements.length > 0) {
      movingElements.forEach(function (element, index) {
        var attributeArray = element.getAttribute('data-html-mover').split(',');
        movingElementsPositions[index] = {
          movingElement: element,
          originalParent: element.parentNode,
          originalPlace: _getIndexInParent(element),
          newParent: document.querySelector(".".concat(attributeArray[0])) || element.parentNode,
          newPlace: attributeArray[1].trim() || 'last',
          breakpoint: parseInt(attributeArray[2].trim()) || 767
        };
      });

      _sort(movingElementsPositions);

      createMediaquery();
      move();
      window.addEventListener('resize', _debounce(move, 50));
    }
  }

  ;
  init();
};

;
document.addEventListener("DOMContentLoaded", function (event) {
  inputsFilter();
  inputMasking();
  imgToBackground();
  sliders();
  burgerMenu('burger-menu');
  popups();
  formValidation();
  preloader();
  svg4everybody();
  htmlMover();
});