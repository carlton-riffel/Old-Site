(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("script/initialize", function(exports, require, module) {
var SectionView;

SectionView = require("script/views/section");

$("section").each(function(i, section) {
  return new SectionView({
    el: section
  });
});

$(function() {
  return $("#nav a, #intro-nav a").smoothScroll();
});

});

;require.register("script/views/section", function(exports, require, module) {
var SectionView, SlideContentView, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SlideContentView = require("script/views/slide-content");

module.exports = SectionView = (function(_super) {
  __extends(SectionView, _super);

  function SectionView() {
    this.onClickSectionLink = __bind(this.onClickSectionLink, this);
    this.onSlideChanged = __bind(this.onSlideChanged, this);
    this.navNext = __bind(this.navNext, this);
    this.navPrevious = __bind(this.navPrevious, this);
    this.onResizeWindow = __bind(this.onResizeWindow, this);
    _ref = SectionView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  SectionView.prototype.isInTransition = false;

  SectionView.prototype.events = {
    "click ul.section-nav a": "onClickSectionLink",
    "click a.section-nav-arrow.previous": "navPrevious",
    "click a.section-nav-arrow.next": "navNext"
  };

  SectionView.prototype.initialize = function() {
    if (this.$el.find(".slides").length) {
      this.initSlides();
    }
    return $(window).on("resize", this.onResizeWindow);
  };

  SectionView.prototype.onResizeWindow = function() {
    this.slides = this.$el.find(".slides");
    this.slides.unslider({
      fluid: true,
      dots: false,
      complete: this.onSlideChanged,
      delay: false
    });
    return this.slider = this.slides.data("unslider");
  };

  SectionView.prototype.initSlides = function() {
    var slideNavLinks;
    slideNavLinks = this.$el.find(".slides > ul > li");
    slideNavLinks.each(function(i, slide) {
      return $(slide).attr("data-index", i);
    });
    this.$el.find("ul.section-nav li").each(function(i, navItem) {
      return $(navItem).attr("data-index", i);
    });
    this.slides = this.$el.find(".slides");
    this.slides.unslider({
      fluid: true,
      dots: false,
      complete: this.onSlideChanged,
      delay: false
    });
    this.slider = this.slides.data("unslider");
    this.onSlideSelected();
    return this.slides.each(function(i, s) {
      return new SlideContentView({
        el: s
      });
    });
  };

  SectionView.prototype.navPrevious = function(e) {
    e.preventDefault();
    return this.slider.prev();
  };

  SectionView.prototype.navNext = function(e) {
    e.preventDefault();
    return this.slider.next();
  };

  SectionView.prototype.onSlideChanged = function() {
    this.setSelectedNavItem(this.slider.current);
    return this.onSlideSelected();
  };

  SectionView.prototype.onSlideSelected = function() {
    var $arrows, className, sectionHeight;
    sectionHeight = this.$el.outerHeight();
    $arrows = this.$el.find("a.section-nav-arrow");
    $arrows.css({
      top: (sectionHeight / 2) - ($arrows.height() / 2)
    });
    className = this.getCurrentSlideEl().attr("id");
    return this.$el.attr("class", className);
  };

  SectionView.prototype.getCurrentSlideEl = function() {
    var slide;
    slide = this.slider.items.eq(this.slider.current);
    return $(slide);
  };

  SectionView.prototype.onClickSectionLink = function(e) {
    var slideID;
    e.preventDefault();
    slideID = $(e.currentTarget).attr("href");
    return this.showSlide($(slideID).data("index"));
  };

  SectionView.prototype.showSlide = function(slideIndex) {
    return this.slider.move(slideIndex);
  };

  SectionView.prototype.setSelectedNavItem = function(slideIndex) {
    this.$el.find("ul.section-nav li").removeClass("selected");
    return this.$el.find("ul.section-nav li[data-index='" + slideIndex + "']").addClass("selected");
  };

  return SectionView;

})(Backbone.View);

});

;require.register("script/views/slide-content", function(exports, require, module) {
var SlideContentView, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = SlideContentView = (function(_super) {
  __extends(SlideContentView, _super);

  function SlideContentView() {
    this.closePage = __bind(this.closePage, this);
    this.onClickSlideContentNav = __bind(this.onClickSlideContentNav, this);
    _ref = SlideContentView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  SlideContentView.prototype.events = {
    "click .slide-nav li a": "onClickSlideContentNav",
    "click a.close-slide-content": "closePage"
  };

  SlideContentView.prototype.initialize = function() {
    this.initOverlayPages();
    return this.initGalleries();
  };

  SlideContentView.prototype.initOverlayPages = function() {
    this.overlay = this.$el.find(".slide-content-overlay");
    this.overlay.css({
      top: this.overlay.height()
    });
    return this.pages = this.$el.find("div.slide-content");
  };

  SlideContentView.prototype.initGalleries = function() {
    var _this = this;
    return $("div.gallery").each(function(i, el) {
      return $(el).magnificPopup({
        delegate: "a",
        type: "image",
        titleSrc: "title",
        gallery: {
          enabled: true
        }
      });
    });
  };

  SlideContentView.prototype.onClickSlideContentNav = function(e) {
    var $link, firstImg;
    e.preventDefault();
    $link = $(e.currentTarget);
    if (!$link.hasClass("fresco-gallery")) {
      return this.showPage($link.attr("href"));
    } else {
      firstImg = $($link.attr("href")).find("a").first();
      return firstImg.click();
    }
  };

  SlideContentView.prototype.showPage = function(pageID) {
    this.page = this.$el.find(pageID);
    this.overlay.show();
    this.overlay.css({
      top: 0
    });
    return this.page.show();
  };

  SlideContentView.prototype.closePage = function(e) {
    e.preventDefault();
    this.pages.hide();
    return this.overlay.css({
      top: this.overlay.height()
    });
  };

  return SlideContentView;

})(Backbone.View);

});

;
//# sourceMappingURL=riffel.js.map