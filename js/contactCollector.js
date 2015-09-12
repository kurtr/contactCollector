;
(function($, window, document, undefined) {
  var Collector = function Collector(selectors, options, elem) {
    this.name = "Collector";
    this.selectors = selectors;
    this.options = {
      Cookie_Expiry: 365,
      Cookie: 'cCollect',
      Always_Update: true,
      Cookie_Path: '/',
      Obscure_Info: true
    };
    this.elem = elem;
    this.$elem = $(elem);
  };
  Collector.prototype = {
    _init: function(options, elem) {
      this.loadOptions(options);
      if(this.doUpdate()) {
        this.getSelectors(this.selectors);
        this.setSelectors();
      }
    },
    loadOptions: function(options) {
      var settings = Object.keys(this.options);
      for(var i = 0; i < settings.length; i++) {
        if(options.hasOwnProperty(settings[i])) {
          if(options[settings[i]] != this.options[settings[i]]) {
            this.options[settings[i]] = options[settings[i]];
          }
        }
      }
      return true;
    },
    Elements: [],
    boundElements: [],
    getCookie: function(cookie) {
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while(c.charAt(0) == ' ') c = c.substring(1);
        if(c.indexOf((cookie + "=")) == 0) return decodeURI(c.substring((cookie + "=").length, c.length));
      }
      return "";
    },
    validMail: function(mail) {
      patt = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return patt.test(mail);
    },
    setCookie: function(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = " max-age=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires + "; path=" + this.options.Cookie_Path;
      return true;
    },
    obscure: function(val) {
      var nstr = String(val.charCodeAt(0));
      for(var i = 1; i < val.length; i++) {
        nstr = String(nstr) + '.' + String(val.charCodeAt(i));
      }
      return nstr;
    },
    doUpdate: function() {
      if(this.options.Always_Update) {
        return true;
      }
      else {
        return(this.getCookie(this.options.Cookie).split('|').length === 1);
      }
    },
    getSelectors: function(selectors) {
      var belms = [];
      $(selectors).each(function(i) {
        $(selectors[i]).each(function() {
          belms.push(this);
        });
      });
      this.Elements = belms;
    },
    setSelectors: function() {
      for(i = 0; i < this.Elements.length; i++) {
        this.bindSelector(this.Elements[i]);
      }
      return true;
    },
    bindSelector: function(elm) {
      var _this = this;
      $(elm).on("change", this.checkVal.bind(elm, _this));
      this.boundElements.push(elm);
      return true;
    },
    getCookieVal: function(val) {
      var addr = (this.options.Obscure_Info ? String(this.obscure(val)) : val);
      if(this.options.Always_Update) {
        var bits = String(this.getCookie(this.options.Cookie)).split('|');
        return(bits[0] + '|' + addr);
      }
      else {
        return(String(parent.getCookie(parent.options.Cookie)) + '|' + addr);
      }
    }
  };
  Collector.prototype.checkVal = function(parent, e) {
    if(parent.validMail($(this).val()) && parent.doUpdate()) {
      var value = parent.getCookieVal($(this).val());
      return parent.setCookie(parent.options.Cookie, value, parent.options.Cookie_Expiry);
    }
    return false;
  };
  $.fn.collector = function(selectors, options) {
    return this.each(function() {
      new Collector(selectors, options, this)._init(options, this);
    });
  };
  window.collector = Collector;
})(jQuery, window, document);