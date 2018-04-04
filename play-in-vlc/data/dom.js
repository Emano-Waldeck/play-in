'use strict';

var dom = {};

dom.$ = function(id, value = 'value', method = id => document.getElementById(id)) {
  const e = method(id);

  return Object.assign({
    on: function(name, callback) {
      name.split(/,\s*/).forEach(name => e.addEventListener(name, callback));
      return this;
    },
    get value() {
      console.log(value);
      return e[value];
    },
    set value(val) {
      e[value] = val;
    }
  }, e);
};
dom.$$ = (query, value) => dom.$(query, value, query => document.querySelector(query));

dom.storage = {
  get: prefs => Object.entries(prefs).reduce((p, [key, value]) => {
    p[key] = localStorage.getItem(key) || value;
  }, {}),
  set: prefs => {
    Object.entries(prefs).forEach(([key, value]) => localStorage.setItem(key, value));
  }
};

dom.on = function(name, callback) {
  if (name === 'load') {
    document.addEventListener('DOMContentLoaded', callback);
  }
};
