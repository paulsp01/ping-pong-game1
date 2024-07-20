// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");
var first_rod = document.getElementById("rod-one");
var second_rod = document.getElementById("rod-two");
var ball = document.getElementById("ball");
var current_timeout_is_running = false;
var current_score = {
  first: 0,
  second: 0
};
var action = {
  loosing_side: "",
  lost: false
};
function centeralise_element(element) {
  element.style.left = (document.documentElement.clientWidth / 2 - element.offsetWidth / 2).toString() + "px";
  element.style.left = (document.documentElement.clientWidth / 2 - element.offsetWidth / 2).toString() + "px";
  if (element === ball) {
    if (action.lost) {
      if (action.loosing_side === "first") {
        ball.style.top = (first_rod.clientHeight + 5).toString() + "px";
      } else {
        ball.style.top = (document.documentElement.clientHeight - second_rod.clientHeight - ball.clientHeight - 5).toString() + "px";
      }
    } else element.style.top = (document.documentElement.clientHeight / 2).toString() + "px";
  }
}
function add_event_listener_to_rods() {
  window.addEventListener("keydown", function (event) {
    var code = event.keyCode;
    if (code === 68) {
      var left_numeric = parseInt(first_rod.style.left.substring(0, first_rod.style.left.length - 2));
      left_numeric += 20;
      if (left_numeric + first_rod.offsetWidth > document.documentElement.clientWidth) {
        left_numeric = document.documentElement.clientWidth - first_rod.offsetWidth;
      }
      first_rod.style.left = left_numeric.toString() + "px";
      second_rod.style.left = left_numeric.toString() + "px";
    } else if (code === 65) {
      var _left_numeric = parseInt(first_rod.style.left.substring(0, first_rod.style.left.length - 2));
      _left_numeric -= 20;
      if (_left_numeric < 0) {
        _left_numeric = 0;
      }
      first_rod.style.left = _left_numeric.toString() + "px";
      second_rod.style.left = _left_numeric.toString() + "px";
    }
  });
}
function touched_upper_bar() {
  var ball_top_numerical = ball.getBoundingClientRect().top;
  var ball_left_numerical = ball.getBoundingClientRect().left;
  var bar_left_numerical = parseInt(first_rod.style.left.substring(0, first_rod.style.left.length - 2));
  if (ball_top_numerical <= first_rod.clientHeight && ball_left_numerical + ball.clientWidth / 2 > bar_left_numerical && ball_left_numerical + ball.clientWidth / 2 < bar_left_numerical + first_rod.clientWidth) {
    if (!current_timeout_is_running) {
      current_timeout_is_running = true;
      setTimeout(function () {
        current_score.first++;
        current_timeout_is_running = false;
        console.log("first", current_score.first);
      }, 200);
    }
    return true;
  }
  return false;
}
function touched_lower_bar() {
  var ball_top_numerical = ball.getBoundingClientRect().top;
  var ball_left_numerical = ball.getBoundingClientRect().left;
  var bar_left_numerical = parseInt(second_rod.style.left.substring(0, second_rod.style.left.length - 2));
  if (ball_top_numerical + ball.clientHeight + second_rod.clientHeight >= document.documentElement.clientHeight && ball_left_numerical + ball.clientWidth / 2 > bar_left_numerical && ball_left_numerical + ball.clientWidth / 2 < bar_left_numerical + second_rod.clientWidth) {
    if (!current_timeout_is_running) {
      current_timeout_is_running = true;
      setTimeout(function () {
        current_score.second++;
        current_timeout_is_running = false;
        console.log("second", current_score.second);
      }, 200);
    }
    return true;
  }
  return false;
}
function set_interval_for_ball() {
  var interval_id = setInterval(function () {
    var numeric_left = ball.getBoundingClientRect().left;
    var numeric_top = ball.getBoundingClientRect().top;
    if (numeric_left <= 0) {
      //hit left
      var class_present = ball.classList[0];
      if (class_present === "animate-top-left") {
        ball.classList.remove(class_present);
        ball.classList.add("animate-top-right");
      } else if (class_present === "animate-bottom-left") {
        ball.classList.remove(class_present);
        ball.classList.add("animate-bottom-right");
      }
    } else if (numeric_left + ball.offsetWidth >= document.documentElement.clientWidth) {
      //hit right
      var _class_present = ball.classList[0];
      if (_class_present === "animate-top-right") {
        ball.classList.remove(_class_present);
        ball.classList.add("animate-top-left");
      } else if (_class_present === "animate-bottom-right") {
        ball.classList.remove(_class_present);
        ball.classList.add("animate-bottom-left");
      }
    } else if (numeric_top <= 0 || numeric_top + ball.offsetHeight >= document.documentElement.clientHeight) {
      //game over
      ball.classList.remove(ball.classList[0]);
      if (numeric_top <= 0) {
        action.loosing_side = "first";
        action.lost = true;
      } else if (numeric_top + ball.offsetHeight >= document.documentElement.clientHeight) {
        action.loosing_side = "second";
        action.lost = true;
      }
      centeralise_element(ball);
      centeralise_element(first_rod);
      centeralise_element(second_rod);
      alert("Game Over");
      clearInterval(interval_id);
      if (current_score.first > localStorage.getItem("first")) {
        localStorage.setItem("first", current_score.first);
      }
      if (current_score.second > localStorage.getItem("second")) {
        localStorage.setItem("second", current_score.second);
      }
      current_score.first = 0;
      current_score.second = 0;
      show_score();
    } else if (touched_lower_bar()) {
      //touched lower bar
      var _class_present2 = ball.classList[0];
      if (_class_present2 === "animate-bottom-right") {
        ball.classList.remove(_class_present2);
        ball.classList.add("animate-top-right");
      } else if (_class_present2 === "animate-bottom-left") {
        ball.classList.remove(_class_present2);
        ball.classList.add("animate-top-left");
      }
    } else if (touched_upper_bar()) {
      //touched upper bar
      var _class_present3 = ball.classList[0];
      if (_class_present3 === "animate-top-right") {
        ball.classList.remove(_class_present3);
        ball.classList.add("animate-bottom-right");
      } else if (_class_present3 === "animate-top-left") {
        ball.classList.remove(_class_present3);
        ball.classList.add("animate-bottom-left");
      }
    }
  }, 1);
}
function show_score() {
  if (localStorage.getItem("first") == null) {
    localStorage.setItem("first", 0);
    localStorage.setItem("second", 0);
    window.alert("This is your first time");
  } else {
    window.alert("Rod 1 has a maximum score of " + localStorage.getItem("first").toString() + "\n" + "Rod 2 has a maximum score of " + localStorage.getItem("second"));
  }
}
centeralise_element(first_rod);
centeralise_element(second_rod);
centeralise_element(ball);
show_score();
add_event_listener_to_rods();
set_interval_for_ball();
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    if (action.lost) {
      if (action.loosing_side === "first") {
        ball.classList.add("animate-bottom-right");
      } else {
        ball.classList.add("animate-top-right");
      }
    } else ball.classList.add("animate-bottom-right");
    set_interval_for_ball();
  }
});
},{"./styles.css":"src/styles.css"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63961" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map