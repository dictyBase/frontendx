/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(9);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(29);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(7);

var ReactCurrentOwner = __webpack_require__(8);

var warning = __webpack_require__(1);
var canDefineProperty = __webpack_require__(15);
var hasOwnProperty = Object.prototype.hasOwnProperty;

var REACT_ELEMENT_TYPE = __webpack_require__(18);

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown, specialPropRefWarningShown;

function hasValidRef(config) {
  if (process.env.NODE_ENV !== 'production') {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  if (process.env.NODE_ENV !== 'production') {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  if (process.env.NODE_ENV !== 'production') {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    if (canDefineProperty) {
      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      });
      // self and source are DEV only properties.
      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      });
      // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.
      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });
    } else {
      element._store.validated = false;
      element._self = self;
      element._source = source;
    }
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    if (process.env.NODE_ENV !== 'production') {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
 */
ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
 */
ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
};

module.exports = ReactElement;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */


/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

function reactProdInvariant(code) {
  var argCount = arguments.length - 1;

  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

  for (var argIdx = 0; argIdx < argCount; argIdx++) {
    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
  }

  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

  var error = new Error(message);
  error.name = 'Invariant Violation';
  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

  throw error;
}

module.exports = reactProdInvariant;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "css", function() { return css; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyframes", function() { return keyframes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "injectGlobal", function() { return injectGlobal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeProvider", function() { return ThemeProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withTheme", function() { return withTheme; });


//      
var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/* Some high number, usually 9-digit base-10. Map it to base-😎 */
var generateAlphabeticName = function generateAlphabeticName(code) {
  var lastDigit = chars[code % chars.length];
  return code > chars.length ? '' + generateAlphabeticName(Math.floor(code / chars.length)) + lastDigit : lastDigit;
};

//      


var interleave = (function (strings, interpolations) {
  return interpolations.reduce(function (array, interp, i) {
    return array.concat(interp, strings[i + 1]);
  }, [strings[0]]);
});

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate$1(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

var hyphenate_1 = hyphenate$1;

var hyphenate = hyphenate_1;

var msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

var hyphenateStyleName_1 = hyphenateStyleName;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var index$2 = function isObject(val) {
  return val != null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && !Array.isArray(val);
};

var isObject$1 = index$2;

function isObjectObject(o) {
  return isObject$1(o) === true && Object.prototype.toString.call(o) === '[object Object]';
}

var index$1 = function isPlainObject(o) {
  var ctor, prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};

//      
var objToCss = function objToCss(obj, prevKey) {
  var css = Object.keys(obj).map(function (key) {
    if (index$1(obj[key])) return objToCss(obj[key], key);
    return hyphenateStyleName_1(key) + ': ' + obj[key] + ';';
  }).join(' ');
  return prevKey ? prevKey + ' {\n  ' + css + '\n}' : css;
};

var flatten = function flatten(chunks, executionContext) {
  return chunks.reduce(function (ruleSet, chunk) {
    /* Remove falsey values */
    if (chunk === undefined || chunk === null || chunk === false || chunk === '') return ruleSet;
    /* Flatten ruleSet */
    if (Array.isArray(chunk)) return [].concat(toConsumableArray(ruleSet), toConsumableArray(flatten(chunk, executionContext)));
    /* Either execute or defer the function */
    if (typeof chunk === 'function') {
      return executionContext ? ruleSet.concat.apply(ruleSet, toConsumableArray(flatten([chunk(executionContext)], executionContext))) : ruleSet.concat(chunk);
    }

    /* Handle objects */
    // $FlowFixMe have to add %checks somehow to isPlainObject
    return ruleSet.concat(index$1(chunk) ? objToCss(chunk) : chunk.toString());
  }, []);
};

//      
var css = (function (strings) {
  for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key];
  }

  return flatten(interleave(strings, interpolations));
});

var printed = {};

function warnOnce(message) {
    if (printed[message]) return;
    printed[message] = true;

    if (typeof console !== 'undefined' && console.warn) console.warn(message);
}

var process$1 = { argv: [], env: {} };

var index$5 = function index$5(flag, argv) {
	argv = argv || process$1.argv;

	var terminatorPos = argv.indexOf('--');
	var prefix = /^--/.test(flag) ? '' : '--';
	var pos = argv.indexOf(prefix + flag);

	return pos !== -1 && (terminatorPos !== -1 ? pos < terminatorPos : true);
};

var hasFlag = index$5;

var support = function support(level) {
	if (level === 0) {
		return false;
	}

	return {
		level: level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
};

var supportLevel = function () {
	if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false')) {
		return 0;
	}

	if (hasFlag('color=16m') || hasFlag('color=full') || hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true') || hasFlag('color=always')) {
		return 1;
	}

	if (process$1.stdout && !process$1.stdout.isTTY) {
		return 0;
	}

	if (process$1.platform === 'win32') {
		return 1;
	}

	if ('CI' in process$1.env) {
		if ('TRAVIS' in process$1.env || process$1.env.CI === 'Travis') {
			return 1;
		}

		return 0;
	}

	if ('TEAMCITY_VERSION' in process$1.env) {
		return process$1.env.TEAMCITY_VERSION.match(/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/) === null ? 0 : 1;
	}

	if (/^(screen|xterm)-256(?:color)?/.test(process$1.env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process$1.env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in process$1.env) {
		return 1;
	}

	if (process$1.env.TERM === 'dumb') {
		return 0;
	}

	return 0;
}();

if (supportLevel === 0 && 'FORCE_COLOR' in process$1.env) {
	supportLevel = 1;
}

var index$4 = process$1 && support(supportLevel);

var SINGLE_QUOTE = '\''.charCodeAt(0);
var DOUBLE_QUOTE = '"'.charCodeAt(0);
var BACKSLASH = '\\'.charCodeAt(0);
var SLASH = '/'.charCodeAt(0);
var NEWLINE = '\n'.charCodeAt(0);
var SPACE = ' '.charCodeAt(0);
var FEED = '\f'.charCodeAt(0);
var TAB = '\t'.charCodeAt(0);
var CR = '\r'.charCodeAt(0);
var OPEN_SQUARE = '['.charCodeAt(0);
var CLOSE_SQUARE = ']'.charCodeAt(0);
var OPEN_PARENTHESES = '('.charCodeAt(0);
var CLOSE_PARENTHESES = ')'.charCodeAt(0);
var OPEN_CURLY = '{'.charCodeAt(0);
var CLOSE_CURLY = '}'.charCodeAt(0);
var SEMICOLON = ';'.charCodeAt(0);
var ASTERISK = '*'.charCodeAt(0);
var COLON = ':'.charCodeAt(0);
var AT = '@'.charCodeAt(0);

var RE_AT_END = /[ \n\t\r\f\{\(\)'"\\;/\[\]#]/g;
var RE_WORD_END = /[ \n\t\r\f\(\)\{\}:;@!'"\\\]\[#]|\/(?=\*)/g;
var RE_BAD_BRACKET = /.[\\\/\("'\n]/;

function tokenize$1(input) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var tokens = [];
    var css = input.css.valueOf();

    var ignore = options.ignoreErrors;

    var code = void 0,
        next = void 0,
        quote = void 0,
        lines = void 0,
        last = void 0,
        content = void 0,
        escape = void 0,
        nextLine = void 0,
        nextOffset = void 0,
        escaped = void 0,
        escapePos = void 0,
        prev = void 0,
        n = void 0;

    var length = css.length;
    var offset = -1;
    var line = 1;
    var pos = 0;

    function unclosed(what) {
        throw input.error('Unclosed ' + what, line, pos - offset);
    }

    while (pos < length) {
        code = css.charCodeAt(pos);

        if (code === NEWLINE || code === FEED || code === CR && css.charCodeAt(pos + 1) !== NEWLINE) {
            offset = pos;
            line += 1;
        }

        switch (code) {
            case NEWLINE:
            case SPACE:
            case TAB:
            case CR:
            case FEED:
                next = pos;
                do {
                    next += 1;
                    code = css.charCodeAt(next);
                    if (code === NEWLINE) {
                        offset = next;
                        line += 1;
                    }
                } while (code === SPACE || code === NEWLINE || code === TAB || code === CR || code === FEED);

                tokens.push(['space', css.slice(pos, next)]);
                pos = next - 1;
                break;

            case OPEN_SQUARE:
                tokens.push(['[', '[', line, pos - offset]);
                break;

            case CLOSE_SQUARE:
                tokens.push([']', ']', line, pos - offset]);
                break;

            case OPEN_CURLY:
                tokens.push(['{', '{', line, pos - offset]);
                break;

            case CLOSE_CURLY:
                tokens.push(['}', '}', line, pos - offset]);
                break;

            case COLON:
                tokens.push([':', ':', line, pos - offset]);
                break;

            case SEMICOLON:
                tokens.push([';', ';', line, pos - offset]);
                break;

            case OPEN_PARENTHESES:
                prev = tokens.length ? tokens[tokens.length - 1][1] : '';
                n = css.charCodeAt(pos + 1);
                if (prev === 'url' && n !== SINGLE_QUOTE && n !== DOUBLE_QUOTE && n !== SPACE && n !== NEWLINE && n !== TAB && n !== FEED && n !== CR) {
                    next = pos;
                    do {
                        escaped = false;
                        next = css.indexOf(')', next + 1);
                        if (next === -1) {
                            if (ignore) {
                                next = pos;
                                break;
                            } else {
                                unclosed('bracket');
                            }
                        }
                        escapePos = next;
                        while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                            escapePos -= 1;
                            escaped = !escaped;
                        }
                    } while (escaped);

                    tokens.push(['brackets', css.slice(pos, next + 1), line, pos - offset, line, next - offset]);
                    pos = next;
                } else {
                    next = css.indexOf(')', pos + 1);
                    content = css.slice(pos, next + 1);

                    if (next === -1 || RE_BAD_BRACKET.test(content)) {
                        tokens.push(['(', '(', line, pos - offset]);
                    } else {
                        tokens.push(['brackets', content, line, pos - offset, line, next - offset]);
                        pos = next;
                    }
                }

                break;

            case CLOSE_PARENTHESES:
                tokens.push([')', ')', line, pos - offset]);
                break;

            case SINGLE_QUOTE:
            case DOUBLE_QUOTE:
                quote = code === SINGLE_QUOTE ? '\'' : '"';
                next = pos;
                do {
                    escaped = false;
                    next = css.indexOf(quote, next + 1);
                    if (next === -1) {
                        if (ignore) {
                            next = pos + 1;
                            break;
                        } else {
                            unclosed('quote');
                        }
                    }
                    escapePos = next;
                    while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                        escapePos -= 1;
                        escaped = !escaped;
                    }
                } while (escaped);

                content = css.slice(pos, next + 1);
                lines = content.split('\n');
                last = lines.length - 1;

                if (last > 0) {
                    nextLine = line + last;
                    nextOffset = next - lines[last].length;
                } else {
                    nextLine = line;
                    nextOffset = offset;
                }

                tokens.push(['string', css.slice(pos, next + 1), line, pos - offset, nextLine, next - nextOffset]);

                offset = nextOffset;
                line = nextLine;
                pos = next;
                break;

            case AT:
                RE_AT_END.lastIndex = pos + 1;
                RE_AT_END.test(css);
                if (RE_AT_END.lastIndex === 0) {
                    next = css.length - 1;
                } else {
                    next = RE_AT_END.lastIndex - 2;
                }
                tokens.push(['at-word', css.slice(pos, next + 1), line, pos - offset, line, next - offset]);
                pos = next;
                break;

            case BACKSLASH:
                next = pos;
                escape = true;
                while (css.charCodeAt(next + 1) === BACKSLASH) {
                    next += 1;
                    escape = !escape;
                }
                code = css.charCodeAt(next + 1);
                if (escape && code !== SLASH && code !== SPACE && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED) {
                    next += 1;
                }
                tokens.push(['word', css.slice(pos, next + 1), line, pos - offset, line, next - offset]);
                pos = next;
                break;

            default:
                if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
                    next = css.indexOf('*/', pos + 2) + 1;
                    if (next === 0) {
                        if (ignore) {
                            next = css.length;
                        } else {
                            unclosed('comment');
                        }
                    }

                    content = css.slice(pos, next + 1);
                    lines = content.split('\n');
                    last = lines.length - 1;

                    if (last > 0) {
                        nextLine = line + last;
                        nextOffset = next - lines[last].length;
                    } else {
                        nextLine = line;
                        nextOffset = offset;
                    }

                    tokens.push(['comment', content, line, pos - offset, nextLine, next - nextOffset]);

                    offset = nextOffset;
                    line = nextLine;
                    pos = next;
                } else {
                    RE_WORD_END.lastIndex = pos + 1;
                    RE_WORD_END.test(css);
                    if (RE_WORD_END.lastIndex === 0) {
                        next = css.length - 1;
                    } else {
                        next = RE_WORD_END.lastIndex - 2;
                    }

                    tokens.push(['word', css.slice(pos, next + 1), line, pos - offset, line, next - offset]);
                    pos = next;
                }

                break;
        }

        pos++;
    }

    return tokens;
}

var HIGHLIGHT_THEME = {
    'brackets': [36, 39], // cyan
    'string': [31, 39], // red
    'at-word': [31, 39], // red
    'comment': [90, 39], // gray
    '{': [32, 39], // green
    '}': [32, 39], // green
    ':': [1, 22], // bold
    ';': [1, 22], // bold
    '(': [1, 22], // bold
    ')': [1, 22] // bold
};

function code(color) {
    return '\x1B[' + color + 'm';
}

function terminalHighlight(css) {
    var tokens = tokenize$1(new Input(css), { ignoreErrors: true });
    var result = [];
    tokens.forEach(function (token) {
        var color = HIGHLIGHT_THEME[token[0]];
        if (color) {
            result.push(token[1].split(/\r?\n/).map(function (i) {
                return code(color[0]) + i + code(color[1]);
            }).join('\n'));
        } else {
            result.push(token[1]);
        }
    });
    return result.join('');
}

/**
 * The CSS parser throws this error for broken CSS.
 *
 * Custom parsers can throw this error for broken custom syntax using
 * the {@link Node#error} method.
 *
 * PostCSS will use the input source map to detect the original error location.
 * If you wrote a Sass file, compiled it to CSS and then parsed it with PostCSS,
 * PostCSS will show the original position in the Sass file.
 *
 * If you need the position in the PostCSS input
 * (e.g., to debug the previous compiler), use `error.input.file`.
 *
 * @example
 * // Catching and checking syntax error
 * try {
 *   postcss.parse('a{')
 * } catch (error) {
 *   if ( error.name === 'CssSyntaxError' ) {
 *     error //=> CssSyntaxError
 *   }
 * }
 *
 * @example
 * // Raising error from plugin
 * throw node.error('Unknown variable', { plugin: 'postcss-vars' });
 */

var CssSyntaxError = function () {

    /**
     * @param {string} message  - error message
     * @param {number} [line]   - source line of the error
     * @param {number} [column] - source column of the error
     * @param {string} [source] - source code of the broken file
     * @param {string} [file]   - absolute path to the broken file
     * @param {string} [plugin] - PostCSS plugin name, if error came from plugin
     */
    function CssSyntaxError(message, line, column, source, file, plugin) {
        classCallCheck(this, CssSyntaxError);

        /**
         * @member {string} - Always equal to `'CssSyntaxError'`. You should
         *                    always check error type
         *                    by `error.name === 'CssSyntaxError'` instead of
         *                    `error instanceof CssSyntaxError`, because
         *                    npm could have several PostCSS versions.
         *
         * @example
         * if ( error.name === 'CssSyntaxError' ) {
         *   error //=> CssSyntaxError
         * }
         */
        this.name = 'CssSyntaxError';
        /**
         * @member {string} - Error message.
         *
         * @example
         * error.message //=> 'Unclosed block'
         */
        this.reason = message;

        if (file) {
            /**
             * @member {string} - Absolute path to the broken file.
             *
             * @example
             * error.file       //=> 'a.sass'
             * error.input.file //=> 'a.css'
             */
            this.file = file;
        }
        if (source) {
            /**
             * @member {string} - Source code of the broken file.
             *
             * @example
             * error.source       //=> 'a { b {} }'
             * error.input.column //=> 'a b { }'
             */
            this.source = source;
        }
        if (plugin) {
            /**
             * @member {string} - Plugin name, if error came from plugin.
             *
             * @example
             * error.plugin //=> 'postcss-vars'
             */
            this.plugin = plugin;
        }
        if (typeof line !== 'undefined' && typeof column !== 'undefined') {
            /**
             * @member {number} - Source line of the error.
             *
             * @example
             * error.line       //=> 2
             * error.input.line //=> 4
             */
            this.line = line;
            /**
             * @member {number} - Source column of the error.
             *
             * @example
             * error.column       //=> 1
             * error.input.column //=> 4
             */
            this.column = column;
        }

        this.setMessage();

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CssSyntaxError);
        }
    }

    createClass(CssSyntaxError, [{
        key: 'setMessage',
        value: function setMessage() {
            /**
             * @member {string} - Full error text in the GNU error format
             *                    with plugin, file, line and column.
             *
             * @example
             * error.message //=> 'a.css:1:1: Unclosed block'
             */
            this.message = this.plugin ? this.plugin + ': ' : '';
            this.message += this.file ? this.file : '<css input>';
            if (typeof this.line !== 'undefined') {
                this.message += ':' + this.line + ':' + this.column;
            }
            this.message += ': ' + this.reason;
        }

        /**
         * Returns a few lines of CSS source that caused the error.
         *
         * If the CSS has an input source map without `sourceContent`,
         * this method will return an empty string.
         *
         * @param {boolean} [color] whether arrow will be colored red by terminal
         *                          color codes. By default, PostCSS will detect
         *                          color support by `process.stdout.isTTY`
         *                          and `process.env.NODE_DISABLE_COLORS`.
         *
         * @example
         * error.showSourceCode() //=> "  4 | }
         *                        //      5 | a {
         *                        //    > 6 |   bad
         *                        //        |   ^
         *                        //      7 | }
         *                        //      8 | b {"
         *
         * @return {string} few lines of CSS source that caused the error
         */

    }, {
        key: 'showSourceCode',
        value: function showSourceCode(color) {
            var _this = this;

            if (!this.source) return '';

            var css = this.source;
            if (typeof color === 'undefined') color = index$4;
            if (color) css = terminalHighlight(css);

            var lines = css.split(/\r?\n/);
            var start = Math.max(this.line - 3, 0);
            var end = Math.min(this.line + 2, lines.length);

            var maxWidth = String(end).length;

            return lines.slice(start, end).map(function (line, index) {
                var number = start + 1 + index;
                var padded = (' ' + number).slice(-maxWidth);
                var gutter = ' ' + padded + ' | ';
                if (number === _this.line) {
                    var spacing = gutter.replace(/\d/g, ' ') + line.slice(0, _this.column - 1).replace(/[^\t]/g, ' ');
                    return '>' + gutter + line + '\n ' + spacing + '^';
                } else {
                    return ' ' + gutter + line;
                }
            }).join('\n');
        }

        /**
         * Returns error position, message and source code of the broken part.
         *
         * @example
         * error.toString() //=> "CssSyntaxError: app.css:1:1: Unclosed block
         *                  //    > 1 | a {
         *                  //        | ^"
         *
         * @return {string} error position, message and source code
         */

    }, {
        key: 'toString',
        value: function toString() {
            var code = this.showSourceCode();
            if (code) {
                code = '\n\n' + code + '\n';
            }
            return this.name + ': ' + this.message + code;
        }
    }, {
        key: 'generated',
        get: function get() {
            warnOnce('CssSyntaxError#generated is depreacted. Use input instead.');
            return this.input;
        }

        /**
         * @memberof CssSyntaxError#
         * @member {Input} input - Input object with PostCSS internal information
         *                         about input file. If input has source map
         *                         from previous tool, PostCSS will use origin
         *                         (for example, Sass) source. You can use this
         *                         object to get PostCSS input source.
         *
         * @example
         * error.input.file //=> 'a.css'
         * error.file       //=> 'a.sass'
         */

    }]);
    return CssSyntaxError;
}();

/* eslint-disable valid-jsdoc */

var defaultRaw = {
    colon: ': ',
    indent: '    ',
    beforeDecl: '\n',
    beforeRule: '\n',
    beforeOpen: ' ',
    beforeClose: '\n',
    beforeComment: '\n',
    after: '\n',
    emptyBody: '',
    commentLeft: ' ',
    commentRight: ' '
};

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

var Stringifier = function () {
    function Stringifier(builder) {
        classCallCheck(this, Stringifier);

        this.builder = builder;
    }

    createClass(Stringifier, [{
        key: 'stringify',
        value: function stringify(node, semicolon) {
            this[node.type](node, semicolon);
        }
    }, {
        key: 'root',
        value: function root(node) {
            this.body(node);
            if (node.raws.after) this.builder(node.raws.after);
        }
    }, {
        key: 'comment',
        value: function comment(node) {
            var left = this.raw(node, 'left', 'commentLeft');
            var right = this.raw(node, 'right', 'commentRight');
            this.builder('/*' + left + node.text + right + '*/', node);
        }
    }, {
        key: 'decl',
        value: function decl(node, semicolon) {
            var between = this.raw(node, 'between', 'colon');
            var string = node.prop + between + this.rawValue(node, 'value');

            if (node.important) {
                string += node.raws.important || ' !important';
            }

            if (semicolon) string += ';';
            this.builder(string, node);
        }
    }, {
        key: 'rule',
        value: function rule(node) {
            this.block(node, this.rawValue(node, 'selector'));
        }
    }, {
        key: 'atrule',
        value: function atrule(node, semicolon) {
            var name = '@' + node.name;
            var params = node.params ? this.rawValue(node, 'params') : '';

            if (typeof node.raws.afterName !== 'undefined') {
                name += node.raws.afterName;
            } else if (params) {
                name += ' ';
            }

            if (node.nodes) {
                this.block(node, name + params);
            } else {
                var end = (node.raws.between || '') + (semicolon ? ';' : '');
                this.builder(name + params + end, node);
            }
        }
    }, {
        key: 'body',
        value: function body(node) {
            var last = node.nodes.length - 1;
            while (last > 0) {
                if (node.nodes[last].type !== 'comment') break;
                last -= 1;
            }

            var semicolon = this.raw(node, 'semicolon');
            for (var i = 0; i < node.nodes.length; i++) {
                var child = node.nodes[i];
                var before = this.raw(child, 'before');
                if (before) this.builder(before);
                this.stringify(child, last !== i || semicolon);
            }
        }
    }, {
        key: 'block',
        value: function block(node, start) {
            var between = this.raw(node, 'between', 'beforeOpen');
            this.builder(start + between + '{', node, 'start');

            var after = void 0;
            if (node.nodes && node.nodes.length) {
                this.body(node);
                after = this.raw(node, 'after');
            } else {
                after = this.raw(node, 'after', 'emptyBody');
            }

            if (after) this.builder(after);
            this.builder('}', node, 'end');
        }
    }, {
        key: 'raw',
        value: function raw(node, own, detect) {
            var value = void 0;
            if (!detect) detect = own;

            // Already had
            if (own) {
                value = node.raws[own];
                if (typeof value !== 'undefined') return value;
            }

            var parent = node.parent;

            // Hack for first rule in CSS
            if (detect === 'before') {
                if (!parent || parent.type === 'root' && parent.first === node) {
                    return '';
                }
            }

            // Floating child without parent
            if (!parent) return defaultRaw[detect];

            // Detect style by other nodes
            var root = node.root();
            if (!root.rawCache) root.rawCache = {};
            if (typeof root.rawCache[detect] !== 'undefined') {
                return root.rawCache[detect];
            }

            if (detect === 'before' || detect === 'after') {
                return this.beforeAfter(node, detect);
            } else {
                var method = 'raw' + capitalize(detect);
                if (this[method]) {
                    value = this[method](root, node);
                } else {
                    root.walk(function (i) {
                        value = i.raws[own];
                        if (typeof value !== 'undefined') return false;
                    });
                }
            }

            if (typeof value === 'undefined') value = defaultRaw[detect];

            root.rawCache[detect] = value;
            return value;
        }
    }, {
        key: 'rawSemicolon',
        value: function rawSemicolon(root) {
            var value = void 0;
            root.walk(function (i) {
                if (i.nodes && i.nodes.length && i.last.type === 'decl') {
                    value = i.raws.semicolon;
                    if (typeof value !== 'undefined') return false;
                }
            });
            return value;
        }
    }, {
        key: 'rawEmptyBody',
        value: function rawEmptyBody(root) {
            var value = void 0;
            root.walk(function (i) {
                if (i.nodes && i.nodes.length === 0) {
                    value = i.raws.after;
                    if (typeof value !== 'undefined') return false;
                }
            });
            return value;
        }
    }, {
        key: 'rawIndent',
        value: function rawIndent(root) {
            if (root.raws.indent) return root.raws.indent;
            var value = void 0;
            root.walk(function (i) {
                var p = i.parent;
                if (p && p !== root && p.parent && p.parent === root) {
                    if (typeof i.raws.before !== 'undefined') {
                        var parts = i.raws.before.split('\n');
                        value = parts[parts.length - 1];
                        value = value.replace(/[^\s]/g, '');
                        return false;
                    }
                }
            });
            return value;
        }
    }, {
        key: 'rawBeforeComment',
        value: function rawBeforeComment(root, node) {
            var value = void 0;
            root.walkComments(function (i) {
                if (typeof i.raws.before !== 'undefined') {
                    value = i.raws.before;
                    if (value.indexOf('\n') !== -1) {
                        value = value.replace(/[^\n]+$/, '');
                    }
                    return false;
                }
            });
            if (typeof value === 'undefined') {
                value = this.raw(node, null, 'beforeDecl');
            }
            return value;
        }
    }, {
        key: 'rawBeforeDecl',
        value: function rawBeforeDecl(root, node) {
            var value = void 0;
            root.walkDecls(function (i) {
                if (typeof i.raws.before !== 'undefined') {
                    value = i.raws.before;
                    if (value.indexOf('\n') !== -1) {
                        value = value.replace(/[^\n]+$/, '');
                    }
                    return false;
                }
            });
            if (typeof value === 'undefined') {
                value = this.raw(node, null, 'beforeRule');
            }
            return value;
        }
    }, {
        key: 'rawBeforeRule',
        value: function rawBeforeRule(root) {
            var value = void 0;
            root.walk(function (i) {
                if (i.nodes && (i.parent !== root || root.first !== i)) {
                    if (typeof i.raws.before !== 'undefined') {
                        value = i.raws.before;
                        if (value.indexOf('\n') !== -1) {
                            value = value.replace(/[^\n]+$/, '');
                        }
                        return false;
                    }
                }
            });
            return value;
        }
    }, {
        key: 'rawBeforeClose',
        value: function rawBeforeClose(root) {
            var value = void 0;
            root.walk(function (i) {
                if (i.nodes && i.nodes.length > 0) {
                    if (typeof i.raws.after !== 'undefined') {
                        value = i.raws.after;
                        if (value.indexOf('\n') !== -1) {
                            value = value.replace(/[^\n]+$/, '');
                        }
                        return false;
                    }
                }
            });
            return value;
        }
    }, {
        key: 'rawBeforeOpen',
        value: function rawBeforeOpen(root) {
            var value = void 0;
            root.walk(function (i) {
                if (i.type !== 'decl') {
                    value = i.raws.between;
                    if (typeof value !== 'undefined') return false;
                }
            });
            return value;
        }
    }, {
        key: 'rawColon',
        value: function rawColon(root) {
            var value = void 0;
            root.walkDecls(function (i) {
                if (typeof i.raws.between !== 'undefined') {
                    value = i.raws.between.replace(/[^\s:]/g, '');
                    return false;
                }
            });
            return value;
        }
    }, {
        key: 'beforeAfter',
        value: function beforeAfter(node, detect) {
            var value = void 0;
            if (node.type === 'decl') {
                value = this.raw(node, null, 'beforeDecl');
            } else if (node.type === 'comment') {
                value = this.raw(node, null, 'beforeComment');
            } else if (detect === 'before') {
                value = this.raw(node, null, 'beforeRule');
            } else {
                value = this.raw(node, null, 'beforeClose');
            }

            var buf = node.parent;
            var depth = 0;
            while (buf && buf.type !== 'root') {
                depth += 1;
                buf = buf.parent;
            }

            if (value.indexOf('\n') !== -1) {
                var indent = this.raw(node, null, 'indent');
                if (indent.length) {
                    for (var step = 0; step < depth; step++) {
                        value += indent;
                    }
                }
            }

            return value;
        }
    }, {
        key: 'rawValue',
        value: function rawValue(node, prop) {
            var value = node[prop];
            var raw = node.raws[prop];
            if (raw && raw.value === value) {
                return raw.raw;
            } else {
                return value;
            }
        }
    }]);
    return Stringifier;
}();

function stringify$1(node, builder) {
    var str = new Stringifier(builder);
    str.stringify(node);
}

/**
 * @typedef {object} position
 * @property {number} line   - source line in file
 * @property {number} column - source column in file
 */

/**
 * @typedef {object} source
 * @property {Input} input    - {@link Input} with input file
 * @property {position} start - The starting position of the node’s source
 * @property {position} end   - The ending position of the node’s source
 */

var cloneNode = function cloneNode(obj, parent) {
    var cloned = new obj.constructor();

    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        var value = obj[i];
        var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

        if (i === 'parent' && type === 'object') {
            if (parent) cloned[i] = parent;
        } else if (i === 'source') {
            cloned[i] = value;
        } else if (value instanceof Array) {
            cloned[i] = value.map(function (j) {
                return cloneNode(j, cloned);
            });
        } else if (i !== 'before' && i !== 'after' && i !== 'between' && i !== 'semicolon') {
            if (type === 'object' && value !== null) value = cloneNode(value);
            cloned[i] = value;
        }
    }

    return cloned;
};

/**
 * All node classes inherit the following common methods.
 *
 * @abstract
 */

var Node = function () {

    /**
     * @param {object} [defaults] - value for node properties
     */
    function Node() {
        var defaults$$1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        classCallCheck(this, Node);

        this.raws = {};
        for (var name in defaults$$1) {
            this[name] = defaults$$1[name];
        }
    }

    /**
     * Returns a CssSyntaxError instance containing the original position
     * of the node in the source, showing line and column numbers and also
     * a small excerpt to facilitate debugging.
     *
     * If present, an input source map will be used to get the original position
     * of the source, even from a previous compilation step
     * (e.g., from Sass compilation).
     *
     * This method produces very useful error messages.
     *
     * @param {string} message     - error description
     * @param {object} [opts]      - options
     * @param {string} opts.plugin - plugin name that created this error.
     *                               PostCSS will set it automatically.
     * @param {string} opts.word   - a word inside a node’s string that should
     *                               be highlighted as the source of the error
     * @param {number} opts.index  - an index inside a node’s string that should
     *                               be highlighted as the source of the error
     *
     * @return {CssSyntaxError} error object to throw it
     *
     * @example
     * if ( !variables[name] ) {
     *   throw decl.error('Unknown variable ' + name, { word: name });
     *   // CssSyntaxError: postcss-vars:a.sass:4:3: Unknown variable $black
     *   //   color: $black
     *   // a
     *   //          ^
     *   //   background: white
     * }
     */


    createClass(Node, [{
        key: 'error',
        value: function error(message) {
            var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (this.source) {
                var pos = this.positionBy(opts);
                return this.source.input.error(message, pos.line, pos.column, opts);
            } else {
                return new CssSyntaxError(message);
            }
        }

        /**
         * This method is provided as a convenience wrapper for {@link Result#warn}.
         *
         * @param {Result} result      - the {@link Result} instance
         *                               that will receive the warning
         * @param {string} text        - warning message
         * @param {object} [opts]      - options
         * @param {string} opts.plugin - plugin name that created this warning.
         *                               PostCSS will set it automatically.
         * @param {string} opts.word   - a word inside a node’s string that should
         *                               be highlighted as the source of the warning
         * @param {number} opts.index  - an index inside a node’s string that should
         *                               be highlighted as the source of the warning
         *
         * @return {Warning} created warning object
         *
         * @example
         * const plugin = postcss.plugin('postcss-deprecated', () => {
         *   return (root, result) => {
         *     root.walkDecls('bad', decl => {
         *       decl.warn(result, 'Deprecated property bad');
         *     });
         *   };
         * });
         */

    }, {
        key: 'warn',
        value: function warn(result, text, opts) {
            var data = { node: this };
            for (var i in opts) {
                data[i] = opts[i];
            }return result.warn(text, data);
        }

        /**
         * Removes the node from its parent and cleans the parent properties
         * from the node and its children.
         *
         * @example
         * if ( decl.prop.match(/^-webkit-/) ) {
         *   decl.remove();
         * }
         *
         * @return {Node} node to make calls chain
         */

    }, {
        key: 'remove',
        value: function remove() {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this.parent = undefined;
            return this;
        }

        /**
         * Returns a CSS string representing the node.
         *
         * @param {stringifier|syntax} [stringifier] - a syntax to use
         *                                             in string generation
         *
         * @return {string} CSS string of this node
         *
         * @example
         * postcss.rule({ selector: 'a' }).toString() //=> "a {}"
         */

    }, {
        key: 'toString',
        value: function toString() {
            var stringifier = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : stringify$1;

            if (stringifier.stringify) stringifier = stringifier.stringify;
            var result = '';
            stringifier(this, function (i) {
                result += i;
            });
            return result;
        }

        /**
         * Returns a clone of the node.
         *
         * The resulting cloned node and its (cloned) children will have
         * a clean parent and code style properties.
         *
         * @param {object} [overrides] - new properties to override in the clone.
         *
         * @example
         * const cloned = decl.clone({ prop: '-moz-' + decl.prop });
         * cloned.raws.before  //=> undefined
         * cloned.parent       //=> undefined
         * cloned.toString()   //=> -moz-transform: scale(0)
         *
         * @return {Node} clone of the node
         */

    }, {
        key: 'clone',
        value: function clone() {
            var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var cloned = cloneNode(this);
            for (var name in overrides) {
                cloned[name] = overrides[name];
            }
            return cloned;
        }

        /**
         * Shortcut to clone the node and insert the resulting cloned node
         * before the current node.
         *
         * @param {object} [overrides] - new properties to override in the clone.
         *
         * @example
         * decl.cloneBefore({ prop: '-moz-' + decl.prop });
         *
         * @return {Node} - new node
         */

    }, {
        key: 'cloneBefore',
        value: function cloneBefore() {
            var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var cloned = this.clone(overrides);
            this.parent.insertBefore(this, cloned);
            return cloned;
        }

        /**
         * Shortcut to clone the node and insert the resulting cloned node
         * after the current node.
         *
         * @param {object} [overrides] - new properties to override in the clone.
         *
         * @return {Node} - new node
         */

    }, {
        key: 'cloneAfter',
        value: function cloneAfter() {
            var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var cloned = this.clone(overrides);
            this.parent.insertAfter(this, cloned);
            return cloned;
        }

        /**
         * Inserts node(s) before the current node and removes the current node.
         *
         * @param {...Node} nodes - node(s) to replace current one
         *
         * @example
         * if ( atrule.name == 'mixin' ) {
         *   atrule.replaceWith(mixinRules[atrule.params]);
         * }
         *
         * @return {Node} current node to methods chain
         */

    }, {
        key: 'replaceWith',
        value: function replaceWith() {
            var _this = this;

            if (this.parent) {
                for (var _len = arguments.length, nodes = Array(_len), _key = 0; _key < _len; _key++) {
                    nodes[_key] = arguments[_key];
                }

                nodes.forEach(function (node) {
                    _this.parent.insertBefore(_this, node);
                });

                this.remove();
            }

            return this;
        }

        /**
         * Removes the node from its current parent and inserts it
         * at the end of `newParent`.
         *
         * This will clean the `before` and `after` code {@link Node#raws} data
         * from the node and replace them with the indentation style of `newParent`.
         * It will also clean the `between` property
         * if `newParent` is in another {@link Root}.
         *
         * @param {Container} newParent - container node where the current node
         *                                will be moved
         *
         * @example
         * atrule.moveTo(atrule.root());
         *
         * @return {Node} current node to methods chain
         */

    }, {
        key: 'moveTo',
        value: function moveTo(newParent) {
            this.cleanRaws(this.root() === newParent.root());
            this.remove();
            newParent.append(this);
            return this;
        }

        /**
         * Removes the node from its current parent and inserts it into
         * a new parent before `otherNode`.
         *
         * This will also clean the node’s code style properties just as it would
         * in {@link Node#moveTo}.
         *
         * @param {Node} otherNode - node that will be before current node
         *
         * @return {Node} current node to methods chain
         */

    }, {
        key: 'moveBefore',
        value: function moveBefore(otherNode) {
            this.cleanRaws(this.root() === otherNode.root());
            this.remove();
            otherNode.parent.insertBefore(otherNode, this);
            return this;
        }

        /**
         * Removes the node from its current parent and inserts it into
         * a new parent after `otherNode`.
         *
         * This will also clean the node’s code style properties just as it would
         * in {@link Node#moveTo}.
         *
         * @param {Node} otherNode - node that will be after current node
         *
         * @return {Node} current node to methods chain
         */

    }, {
        key: 'moveAfter',
        value: function moveAfter(otherNode) {
            this.cleanRaws(this.root() === otherNode.root());
            this.remove();
            otherNode.parent.insertAfter(otherNode, this);
            return this;
        }

        /**
         * Returns the next child of the node’s parent.
         * Returns `undefined` if the current node is the last child.
         *
         * @return {Node|undefined} next node
         *
         * @example
         * if ( comment.text === 'delete next' ) {
         *   const next = comment.next();
         *   if ( next ) {
         *     next.remove();
         *   }
         * }
         */

    }, {
        key: 'next',
        value: function next() {
            var index = this.parent.index(this);
            return this.parent.nodes[index + 1];
        }

        /**
         * Returns the previous child of the node’s parent.
         * Returns `undefined` if the current node is the first child.
         *
         * @return {Node|undefined} previous node
         *
         * @example
         * const annotation = decl.prev();
         * if ( annotation.type == 'comment' ) {
         *  readAnnotation(annotation.text);
         * }
         */

    }, {
        key: 'prev',
        value: function prev() {
            var index = this.parent.index(this);
            return this.parent.nodes[index - 1];
        }
    }, {
        key: 'toJSON',
        value: function toJSON() {
            var fixed = {};

            for (var name in this) {
                if (!this.hasOwnProperty(name)) continue;
                if (name === 'parent') continue;
                var value = this[name];

                if (value instanceof Array) {
                    fixed[name] = value.map(function (i) {
                        if ((typeof i === 'undefined' ? 'undefined' : _typeof(i)) === 'object' && i.toJSON) {
                            return i.toJSON();
                        } else {
                            return i;
                        }
                    });
                } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.toJSON) {
                    fixed[name] = value.toJSON();
                } else {
                    fixed[name] = value;
                }
            }

            return fixed;
        }

        /**
         * Returns a {@link Node#raws} value. If the node is missing
         * the code style property (because the node was manually built or cloned),
         * PostCSS will try to autodetect the code style property by looking
         * at other nodes in the tree.
         *
         * @param {string} prop          - name of code style property
         * @param {string} [defaultType] - name of default value, it can be missed
         *                                 if the value is the same as prop
         *
         * @example
         * const root = postcss.parse('a { background: white }');
         * root.nodes[0].append({ prop: 'color', value: 'black' });
         * root.nodes[0].nodes[1].raws.before   //=> undefined
         * root.nodes[0].nodes[1].raw('before') //=> ' '
         *
         * @return {string} code style value
         */

    }, {
        key: 'raw',
        value: function raw(prop, defaultType) {
            var str = new Stringifier();
            return str.raw(this, prop, defaultType);
        }

        /**
         * Finds the Root instance of the node’s tree.
         *
         * @example
         * root.nodes[0].nodes[0].root() === root
         *
         * @return {Root} root parent
         */

    }, {
        key: 'root',
        value: function root() {
            var result = this;
            while (result.parent) {
                result = result.parent;
            }return result;
        }
    }, {
        key: 'cleanRaws',
        value: function cleanRaws(keepBetween) {
            delete this.raws.before;
            delete this.raws.after;
            if (!keepBetween) delete this.raws.between;
        }
    }, {
        key: 'positionInside',
        value: function positionInside(index) {
            var string = this.toString();
            var column = this.source.start.column;
            var line = this.source.start.line;

            for (var i = 0; i < index; i++) {
                if (string[i] === '\n') {
                    column = 1;
                    line += 1;
                } else {
                    column += 1;
                }
            }

            return { line: line, column: column };
        }
    }, {
        key: 'positionBy',
        value: function positionBy(opts) {
            var pos = this.source.start;
            if (opts.index) {
                pos = this.positionInside(opts.index);
            } else if (opts.word) {
                var index = this.toString().indexOf(opts.word);
                if (index !== -1) pos = this.positionInside(index);
            }
            return pos;
        }
    }, {
        key: 'removeSelf',
        value: function removeSelf() {
            warnOnce('Node#removeSelf is deprecated. Use Node#remove.');
            return this.remove();
        }
    }, {
        key: 'replace',
        value: function replace(nodes) {
            warnOnce('Node#replace is deprecated. Use Node#replaceWith');
            return this.replaceWith(nodes);
        }
    }, {
        key: 'style',
        value: function style(own, detect) {
            warnOnce('Node#style() is deprecated. Use Node#raw()');
            return this.raw(own, detect);
        }
    }, {
        key: 'cleanStyles',
        value: function cleanStyles(keepBetween) {
            warnOnce('Node#cleanStyles() is deprecated. Use Node#cleanRaws()');
            return this.cleanRaws(keepBetween);
        }
    }, {
        key: 'before',
        get: function get() {
            warnOnce('Node#before is deprecated. Use Node#raws.before');
            return this.raws.before;
        },
        set: function set(val) {
            warnOnce('Node#before is deprecated. Use Node#raws.before');
            this.raws.before = val;
        }
    }, {
        key: 'between',
        get: function get() {
            warnOnce('Node#between is deprecated. Use Node#raws.between');
            return this.raws.between;
        },
        set: function set(val) {
            warnOnce('Node#between is deprecated. Use Node#raws.between');
            this.raws.between = val;
        }

        /**
         * @memberof Node#
         * @member {string} type - String representing the node’s type.
         *                         Possible values are `root`, `atrule`, `rule`,
         *                         `decl`, or `comment`.
         *
         * @example
         * postcss.decl({ prop: 'color', value: 'black' }).type //=> 'decl'
         */

        /**
         * @memberof Node#
         * @member {Container} parent - the node’s parent node.
         *
         * @example
         * root.nodes[0].parent == root;
         */

        /**
         * @memberof Node#
         * @member {source} source - the input source of the node
         *
         * The property is used in source map generation.
         *
         * If you create a node manually (e.g., with `postcss.decl()`),
         * that node will not have a `source` property and will be absent
         * from the source map. For this reason, the plugin developer should
         * consider cloning nodes to create new ones (in which case the new node’s
         * source will reference the original, cloned node) or setting
         * the `source` property manually.
         *
         * ```js
         * // Bad
         * const prefixed = postcss.decl({
         *   prop: '-moz-' + decl.prop,
         *   value: decl.value
         * });
         *
         * // Good
         * const prefixed = decl.clone({ prop: '-moz-' + decl.prop });
         * ```
         *
         * ```js
         * if ( atrule.name == 'add-link' ) {
         *   const rule = postcss.rule({ selector: 'a', source: atrule.source });
         *   atrule.parent.insertBefore(atrule, rule);
         * }
         * ```
         *
         * @example
         * decl.source.input.from //=> '/home/ai/a.sass'
         * decl.source.start      //=> { line: 10, column: 2 }
         * decl.source.end        //=> { line: 10, column: 12 }
         */

        /**
         * @memberof Node#
         * @member {object} raws - Information to generate byte-to-byte equal
         *                         node string as it was in the origin input.
         *
         * Every parser saves its own properties,
         * but the default CSS parser uses:
         *
         * * `before`: the space symbols before the node. It also stores `*`
         *   and `_` symbols before the declaration (IE hack).
         * * `after`: the space symbols after the last child of the node
         *   to the end of the node.
         * * `between`: the symbols between the property and value
         *   for declarations, selector and `{` for rules, or last parameter
         *   and `{` for at-rules.
         * * `semicolon`: contains true if the last child has
         *   an (optional) semicolon.
         * * `afterName`: the space between the at-rule name and its parameters.
         * * `left`: the space symbols between `/*` and the comment’s text.
         * * `right`: the space symbols between the comment’s text
         *   and <code>*&#47;</code>.
         * * `important`: the content of the important statement,
         *   if it is not just `!important`.
         *
         * PostCSS cleans selectors, declaration values and at-rule parameters
         * from comments and extra spaces, but it stores origin content in raws
         * properties. As such, if you don’t change a declaration’s value,
         * PostCSS will use the raw value with comments.
         *
         * @example
         * const root = postcss.parse('a {\n  color:black\n}')
         * root.first.first.raws //=> { before: '\n  ', between: ':' }
         */

    }]);
    return Node;
}();

/**
 * Represents a CSS declaration.
 *
 * @extends Node
 *
 * @example
 * const root = postcss.parse('a { color: black }');
 * const decl = root.first.first;
 * decl.type       //=> 'decl'
 * decl.toString() //=> ' color: black'
 */

var Declaration = function (_Node) {
    inherits(Declaration, _Node);

    function Declaration(defaults$$1) {
        classCallCheck(this, Declaration);

        var _this = possibleConstructorReturn(this, (Declaration.__proto__ || Object.getPrototypeOf(Declaration)).call(this, defaults$$1));

        _this.type = 'decl';
        return _this;
    }

    createClass(Declaration, [{
        key: '_value',
        get: function get() {
            warnOnce('Node#_value was deprecated. Use Node#raws.value');
            return this.raws.value;
        },
        set: function set(val) {
            warnOnce('Node#_value was deprecated. Use Node#raws.value');
            this.raws.value = val;
        }
    }, {
        key: '_important',
        get: function get() {
            warnOnce('Node#_important was deprecated. Use Node#raws.important');
            return this.raws.important;
        },
        set: function set(val) {
            warnOnce('Node#_important was deprecated. Use Node#raws.important');
            this.raws.important = val;
        }

        /**
         * @memberof Declaration#
         * @member {string} prop - the declaration’s property name
         *
         * @example
         * const root = postcss.parse('a { color: black }');
         * const decl = root.first.first;
         * decl.prop //=> 'color'
         */

        /**
         * @memberof Declaration#
         * @member {string} value - the declaration’s value
         *
         * @example
         * const root = postcss.parse('a { color: black }');
         * const decl = root.first.first;
         * decl.value //=> 'black'
         */

        /**
         * @memberof Declaration#
         * @member {boolean} important - `true` if the declaration
         *                               has an !important annotation.
         *
         * @example
         * const root = postcss.parse('a { color: black !important; color: red }');
         * root.first.first.important //=> true
         * root.first.last.important  //=> undefined
         */

        /**
         * @memberof Declaration#
         * @member {object} raws - Information to generate byte-to-byte equal
         *                         node string as it was in the origin input.
         *
         * Every parser saves its own properties,
         * but the default CSS parser uses:
         *
         * * `before`: the space symbols before the node. It also stores `*`
         *   and `_` symbols before the declaration (IE hack).
         * * `between`: the symbols between the property and value
         *   for declarations, selector and `{` for rules, or last parameter
         *   and `{` for at-rules.
         * * `important`: the content of the important statement,
         *   if it is not just `!important`.
         *
         * PostCSS cleans declaration from comments and extra spaces,
         * but it stores origin content in raws properties.
         * As such, if you don’t change a declaration’s value,
         * PostCSS will use the raw value with comments.
         *
         * @example
         * const root = postcss.parse('a {\n  color:black\n}')
         * root.first.first.raws //=> { before: '\n  ', between: ':' }
         */

    }]);
    return Declaration;
}(Node);

/**
 * Represents a comment between declarations or statements (rule and at-rules).
 *
 * Comments inside selectors, at-rule parameters, or declaration values
 * will be stored in the `raws` properties explained above.
 *
 * @extends Node
 */

var Comment = function (_Node) {
    inherits(Comment, _Node);

    function Comment(defaults$$1) {
        classCallCheck(this, Comment);

        var _this = possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).call(this, defaults$$1));

        _this.type = 'comment';
        return _this;
    }

    createClass(Comment, [{
        key: 'left',
        get: function get() {
            warnOnce('Comment#left was deprecated. Use Comment#raws.left');
            return this.raws.left;
        },
        set: function set(val) {
            warnOnce('Comment#left was deprecated. Use Comment#raws.left');
            this.raws.left = val;
        }
    }, {
        key: 'right',
        get: function get() {
            warnOnce('Comment#right was deprecated. Use Comment#raws.right');
            return this.raws.right;
        },
        set: function set(val) {
            warnOnce('Comment#right was deprecated. Use Comment#raws.right');
            this.raws.right = val;
        }

        /**
         * @memberof Comment#
         * @member {string} text - the comment’s text
         */

        /**
         * @memberof Comment#
         * @member {object} raws - Information to generate byte-to-byte equal
         *                         node string as it was in the origin input.
         *
         * Every parser saves its own properties,
         * but the default CSS parser uses:
         *
         * * `before`: the space symbols before the node.
         * * `left`: the space symbols between `/*` and the comment’s text.
         * * `right`: the space symbols between the comment’s text.
         */

    }]);
    return Comment;
}(Node);

var Parser = function () {
    function Parser(input) {
        classCallCheck(this, Parser);

        this.input = input;

        this.pos = 0;
        this.root = new Root();
        this.current = this.root;
        this.spaces = '';
        this.semicolon = false;

        this.root.source = { input: input, start: { line: 1, column: 1 } };
    }

    createClass(Parser, [{
        key: 'tokenize',
        value: function tokenize() {
            this.tokens = tokenize$1(this.input);
        }
    }, {
        key: 'loop',
        value: function loop() {
            var token = void 0;
            while (this.pos < this.tokens.length) {
                token = this.tokens[this.pos];

                switch (token[0]) {

                    case 'space':
                    case ';':
                        this.spaces += token[1];
                        break;

                    case '}':
                        this.end(token);
                        break;

                    case 'comment':
                        this.comment(token);
                        break;

                    case 'at-word':
                        this.atrule(token);
                        break;

                    case '{':
                        this.emptyRule(token);
                        break;

                    default:
                        this.other();
                        break;
                }

                this.pos += 1;
            }
            this.endFile();
        }
    }, {
        key: 'comment',
        value: function comment(token) {
            var node = new Comment();
            this.init(node, token[2], token[3]);
            node.source.end = { line: token[4], column: token[5] };

            var text = token[1].slice(2, -2);
            if (/^\s*$/.test(text)) {
                node.text = '';
                node.raws.left = text;
                node.raws.right = '';
            } else {
                var match = text.match(/^(\s*)([^]*[^\s])(\s*)$/);
                node.text = match[2];
                node.raws.left = match[1];
                node.raws.right = match[3];
            }
        }
    }, {
        key: 'emptyRule',
        value: function emptyRule(token) {
            var node = new Rule();
            this.init(node, token[2], token[3]);
            node.selector = '';
            node.raws.between = '';
            this.current = node;
        }
    }, {
        key: 'other',
        value: function other() {
            var token = void 0;
            var end = false;
            var type = null;
            var colon = false;
            var bracket = null;
            var brackets = [];

            var start = this.pos;
            while (this.pos < this.tokens.length) {
                token = this.tokens[this.pos];
                type = token[0];

                if (type === '(' || type === '[') {
                    if (!bracket) bracket = token;
                    brackets.push(type === '(' ? ')' : ']');
                } else if (brackets.length === 0) {
                    if (type === ';') {
                        if (colon) {
                            this.decl(this.tokens.slice(start, this.pos + 1));
                            return;
                        } else {
                            break;
                        }
                    } else if (type === '{') {
                        this.rule(this.tokens.slice(start, this.pos + 1));
                        return;
                    } else if (type === '}') {
                        this.pos -= 1;
                        end = true;
                        break;
                    } else if (type === ':') {
                        colon = true;
                    }
                } else if (type === brackets[brackets.length - 1]) {
                    brackets.pop();
                    if (brackets.length === 0) bracket = null;
                }

                this.pos += 1;
            }
            if (this.pos === this.tokens.length) {
                this.pos -= 1;
                end = true;
            }

            if (brackets.length > 0) this.unclosedBracket(bracket);

            if (end && colon) {
                while (this.pos > start) {
                    token = this.tokens[this.pos][0];
                    if (token !== 'space' && token !== 'comment') break;
                    this.pos -= 1;
                }
                this.decl(this.tokens.slice(start, this.pos + 1));
                return;
            }

            this.unknownWord(start);
        }
    }, {
        key: 'rule',
        value: function rule(tokens) {
            tokens.pop();

            var node = new Rule();
            this.init(node, tokens[0][2], tokens[0][3]);

            node.raws.between = this.spacesFromEnd(tokens);
            this.raw(node, 'selector', tokens);
            this.current = node;
        }
    }, {
        key: 'decl',
        value: function decl(tokens) {
            var node = new Declaration();
            this.init(node);

            var last = tokens[tokens.length - 1];
            if (last[0] === ';') {
                this.semicolon = true;
                tokens.pop();
            }
            if (last[4]) {
                node.source.end = { line: last[4], column: last[5] };
            } else {
                node.source.end = { line: last[2], column: last[3] };
            }

            while (tokens[0][0] !== 'word') {
                node.raws.before += tokens.shift()[1];
            }
            node.source.start = { line: tokens[0][2], column: tokens[0][3] };

            node.prop = '';
            while (tokens.length) {
                var type = tokens[0][0];
                if (type === ':' || type === 'space' || type === 'comment') {
                    break;
                }
                node.prop += tokens.shift()[1];
            }

            node.raws.between = '';

            var token = void 0;
            while (tokens.length) {
                token = tokens.shift();

                if (token[0] === ':') {
                    node.raws.between += token[1];
                    break;
                } else {
                    node.raws.between += token[1];
                }
            }

            if (node.prop[0] === '_' || node.prop[0] === '*') {
                node.raws.before += node.prop[0];
                node.prop = node.prop.slice(1);
            }
            node.raws.between += this.spacesFromStart(tokens);
            this.precheckMissedSemicolon(tokens);

            for (var i = tokens.length - 1; i > 0; i--) {
                token = tokens[i];
                if (token[1] === '!important') {
                    node.important = true;
                    var string = this.stringFrom(tokens, i);
                    string = this.spacesFromEnd(tokens) + string;
                    if (string !== ' !important') node.raws.important = string;
                    break;
                } else if (token[1] === 'important') {
                    var cache = tokens.slice(0);
                    var str = '';
                    for (var j = i; j > 0; j--) {
                        var _type = cache[j][0];
                        if (str.trim().indexOf('!') === 0 && _type !== 'space') {
                            break;
                        }
                        str = cache.pop()[1] + str;
                    }
                    if (str.trim().indexOf('!') === 0) {
                        node.important = true;
                        node.raws.important = str;
                        tokens = cache;
                    }
                }

                if (token[0] !== 'space' && token[0] !== 'comment') {
                    break;
                }
            }

            this.raw(node, 'value', tokens);

            if (node.value.indexOf(':') !== -1) this.checkMissedSemicolon(tokens);
        }
    }, {
        key: 'atrule',
        value: function atrule(token) {
            var node = new AtRule();
            node.name = token[1].slice(1);
            if (node.name === '') {
                this.unnamedAtrule(node, token);
            }
            this.init(node, token[2], token[3]);

            var last = false;
            var open = false;
            var params = [];

            this.pos += 1;
            while (this.pos < this.tokens.length) {
                token = this.tokens[this.pos];

                if (token[0] === ';') {
                    node.source.end = { line: token[2], column: token[3] };
                    this.semicolon = true;
                    break;
                } else if (token[0] === '{') {
                    open = true;
                    break;
                } else if (token[0] === '}') {
                    this.end(token);
                    break;
                } else {
                    params.push(token);
                }

                this.pos += 1;
            }
            if (this.pos === this.tokens.length) {
                last = true;
            }

            node.raws.between = this.spacesFromEnd(params);
            if (params.length) {
                node.raws.afterName = this.spacesFromStart(params);
                this.raw(node, 'params', params);
                if (last) {
                    token = params[params.length - 1];
                    node.source.end = { line: token[4], column: token[5] };
                    this.spaces = node.raws.between;
                    node.raws.between = '';
                }
            } else {
                node.raws.afterName = '';
                node.params = '';
            }

            if (open) {
                node.nodes = [];
                this.current = node;
            }
        }
    }, {
        key: 'end',
        value: function end(token) {
            if (this.current.nodes && this.current.nodes.length) {
                this.current.raws.semicolon = this.semicolon;
            }
            this.semicolon = false;

            this.current.raws.after = (this.current.raws.after || '') + this.spaces;
            this.spaces = '';

            if (this.current.parent) {
                this.current.source.end = { line: token[2], column: token[3] };
                this.current = this.current.parent;
            } else {
                this.unexpectedClose(token);
            }
        }
    }, {
        key: 'endFile',
        value: function endFile() {
            if (this.current.parent) this.unclosedBlock();
            if (this.current.nodes && this.current.nodes.length) {
                this.current.raws.semicolon = this.semicolon;
            }
            this.current.raws.after = (this.current.raws.after || '') + this.spaces;
        }

        // Helpers

    }, {
        key: 'init',
        value: function init(node, line, column) {
            this.current.push(node);

            node.source = { start: { line: line, column: column }, input: this.input };
            node.raws.before = this.spaces;
            this.spaces = '';
            if (node.type !== 'comment') this.semicolon = false;
        }
    }, {
        key: 'raw',
        value: function raw(node, prop, tokens) {
            var token = void 0,
                type = void 0;
            var length = tokens.length;
            var value = '';
            var clean = true;
            for (var i = 0; i < length; i += 1) {
                token = tokens[i];
                type = token[0];
                if (type === 'comment' || type === 'space' && i === length - 1) {
                    clean = false;
                } else {
                    value += token[1];
                }
            }
            if (!clean) {
                var raw = tokens.reduce(function (all, i) {
                    return all + i[1];
                }, '');
                node.raws[prop] = { value: value, raw: raw };
            }
            node[prop] = value;
        }
    }, {
        key: 'spacesFromEnd',
        value: function spacesFromEnd(tokens) {
            var lastTokenType = void 0;
            var spaces = '';
            while (tokens.length) {
                lastTokenType = tokens[tokens.length - 1][0];
                if (lastTokenType !== 'space' && lastTokenType !== 'comment') break;
                spaces = tokens.pop()[1] + spaces;
            }
            return spaces;
        }
    }, {
        key: 'spacesFromStart',
        value: function spacesFromStart(tokens) {
            var next = void 0;
            var spaces = '';
            while (tokens.length) {
                next = tokens[0][0];
                if (next !== 'space' && next !== 'comment') break;
                spaces += tokens.shift()[1];
            }
            return spaces;
        }
    }, {
        key: 'stringFrom',
        value: function stringFrom(tokens, from) {
            var result = '';
            for (var i = from; i < tokens.length; i++) {
                result += tokens[i][1];
            }
            tokens.splice(from, tokens.length - from);
            return result;
        }
    }, {
        key: 'colon',
        value: function colon(tokens) {
            var brackets = 0;
            var token = void 0,
                type = void 0,
                prev = void 0;
            for (var i = 0; i < tokens.length; i++) {
                token = tokens[i];
                type = token[0];

                if (type === '(') {
                    brackets += 1;
                } else if (type === ')') {
                    brackets -= 1;
                } else if (brackets === 0 && type === ':') {
                    if (!prev) {
                        this.doubleColon(token);
                    } else if (prev[0] === 'word' && prev[1] === 'progid') {
                        continue;
                    } else {
                        return i;
                    }
                }

                prev = token;
            }
            return false;
        }

        // Errors

    }, {
        key: 'unclosedBracket',
        value: function unclosedBracket(bracket) {
            throw this.input.error('Unclosed bracket', bracket[2], bracket[3]);
        }
    }, {
        key: 'unknownWord',
        value: function unknownWord(start) {
            var token = this.tokens[start];
            throw this.input.error('Unknown word', token[2], token[3]);
        }
    }, {
        key: 'unexpectedClose',
        value: function unexpectedClose(token) {
            throw this.input.error('Unexpected }', token[2], token[3]);
        }
    }, {
        key: 'unclosedBlock',
        value: function unclosedBlock() {
            var pos = this.current.source.start;
            throw this.input.error('Unclosed block', pos.line, pos.column);
        }
    }, {
        key: 'doubleColon',
        value: function doubleColon(token) {
            throw this.input.error('Double colon', token[2], token[3]);
        }
    }, {
        key: 'unnamedAtrule',
        value: function unnamedAtrule(node, token) {
            throw this.input.error('At-rule without name', token[2], token[3]);
        }
    }, {
        key: 'precheckMissedSemicolon',
        value: function precheckMissedSemicolon(tokens) {
            // Hook for Safe Parser
            tokens;
        }
    }, {
        key: 'checkMissedSemicolon',
        value: function checkMissedSemicolon(tokens) {
            var colon = this.colon(tokens);
            if (colon === false) return;

            var founded = 0;
            var token = void 0;
            for (var j = colon - 1; j >= 0; j--) {
                token = tokens[j];
                if (token[0] !== 'space') {
                    founded += 1;
                    if (founded === 2) break;
                }
            }
            throw this.input.error('Missed semicolon', token[2], token[3]);
        }
    }]);
    return Parser;
}();

function parse(css, opts) {
    if (opts && opts.safe) {
        throw new Error('Option safe was removed. ' + 'Use parser: require("postcss-safe-parser")');
    }

    var input = new Input(css, opts);

    var parser = new Parser(input);
    try {
        parser.tokenize();
        parser.loop();
    } catch (e) {
        if (e.name === 'CssSyntaxError' && opts && opts.from) {
            if (/\.scss$/i.test(opts.from)) {
                e.message += '\nYou tried to parse SCSS with ' + 'the standard CSS parser; ' + 'try again with the postcss-scss parser';
            } else if (/\.less$/i.test(opts.from)) {
                e.message += '\nYou tried to parse Less with ' + 'the standard CSS parser; ' + 'try again with the postcss-less parser';
            }
        }
        throw e;
    }

    return parser.root;
}

function cleanSource(nodes) {
    return nodes.map(function (i) {
        if (i.nodes) i.nodes = cleanSource(i.nodes);
        delete i.source;
        return i;
    });
}

/**
 * @callback childCondition
 * @param {Node} node    - container child
 * @param {number} index - child index
 * @param {Node[]} nodes - all container children
 * @return {boolean}
 */

/**
 * @callback childIterator
 * @param {Node} node    - container child
 * @param {number} index - child index
 * @return {false|undefined} returning `false` will break iteration
 */

/**
 * The {@link Root}, {@link AtRule}, and {@link Rule} container nodes
 * inherit some common methods to help work with their children.
 *
 * Note that all containers can store any content. If you write a rule inside
 * a rule, PostCSS will parse it.
 *
 * @extends Node
 * @abstract
 */

var Container = function (_Node) {
    inherits(Container, _Node);

    function Container() {
        classCallCheck(this, Container);
        return possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).apply(this, arguments));
    }

    createClass(Container, [{
        key: 'push',
        value: function push(child) {
            child.parent = this;
            this.nodes.push(child);
            return this;
        }

        /**
         * Iterates through the container’s immediate children,
         * calling `callback` for each child.
         *
         * Returning `false` in the callback will break iteration.
         *
         * This method only iterates through the container’s immediate children.
         * If you need to recursively iterate through all the container’s descendant
         * nodes, use {@link Container#walk}.
         *
         * Unlike the for `{}`-cycle or `Array#forEach` this iterator is safe
         * if you are mutating the array of child nodes during iteration.
         * PostCSS will adjust the current index to match the mutations.
         *
         * @param {childIterator} callback - iterator receives each node and index
         *
         * @return {false|undefined} returns `false` if iteration was broke
         *
         * @example
         * const root = postcss.parse('a { color: black; z-index: 1 }');
         * const rule = root.first;
         *
         * for ( let decl of rule.nodes ) {
         *     decl.cloneBefore({ prop: '-webkit-' + decl.prop });
         *     // Cycle will be infinite, because cloneBefore moves the current node
         *     // to the next index
         * }
         *
         * rule.each(decl => {
         *     decl.cloneBefore({ prop: '-webkit-' + decl.prop });
         *     // Will be executed only for color and z-index
         * });
         */

    }, {
        key: 'each',
        value: function each(callback) {
            if (!this.lastEach) this.lastEach = 0;
            if (!this.indexes) this.indexes = {};

            this.lastEach += 1;
            var id = this.lastEach;
            this.indexes[id] = 0;

            if (!this.nodes) return undefined;

            var index = void 0,
                result = void 0;
            while (this.indexes[id] < this.nodes.length) {
                index = this.indexes[id];
                result = callback(this.nodes[index], index);
                if (result === false) break;

                this.indexes[id] += 1;
            }

            delete this.indexes[id];

            return result;
        }

        /**
         * Traverses the container’s descendant nodes, calling callback
         * for each node.
         *
         * Like container.each(), this method is safe to use
         * if you are mutating arrays during iteration.
         *
         * If you only need to iterate through the container’s immediate children,
         * use {@link Container#each}.
         *
         * @param {childIterator} callback - iterator receives each node and index
         *
         * @return {false|undefined} returns `false` if iteration was broke
         *
         * @example
         * root.walk(node => {
         *   // Traverses all descendant nodes.
         * });
         */

    }, {
        key: 'walk',
        value: function walk(callback) {
            return this.each(function (child, i) {
                var result = callback(child, i);
                if (result !== false && child.walk) {
                    result = child.walk(callback);
                }
                return result;
            });
        }

        /**
         * Traverses the container’s descendant nodes, calling callback
         * for each declaration node.
         *
         * If you pass a filter, iteration will only happen over declarations
         * with matching properties.
         *
         * Like {@link Container#each}, this method is safe
         * to use if you are mutating arrays during iteration.
         *
         * @param {string|RegExp} [prop]   - string or regular expression
         *                                   to filter declarations by property name
         * @param {childIterator} callback - iterator receives each node and index
         *
         * @return {false|undefined} returns `false` if iteration was broke
         *
         * @example
         * root.walkDecls(decl => {
         *   checkPropertySupport(decl.prop);
         * });
         *
         * root.walkDecls('border-radius', decl => {
         *   decl.remove();
         * });
         *
         * root.walkDecls(/^background/, decl => {
         *   decl.value = takeFirstColorFromGradient(decl.value);
         * });
         */

    }, {
        key: 'walkDecls',
        value: function walkDecls(prop, callback) {
            if (!callback) {
                callback = prop;
                return this.walk(function (child, i) {
                    if (child.type === 'decl') {
                        return callback(child, i);
                    }
                });
            } else if (prop instanceof RegExp) {
                return this.walk(function (child, i) {
                    if (child.type === 'decl' && prop.test(child.prop)) {
                        return callback(child, i);
                    }
                });
            } else {
                return this.walk(function (child, i) {
                    if (child.type === 'decl' && child.prop === prop) {
                        return callback(child, i);
                    }
                });
            }
        }

        /**
         * Traverses the container’s descendant nodes, calling callback
         * for each rule node.
         *
         * If you pass a filter, iteration will only happen over rules
         * with matching selectors.
         *
         * Like {@link Container#each}, this method is safe
         * to use if you are mutating arrays during iteration.
         *
         * @param {string|RegExp} [selector] - string or regular expression
         *                                     to filter rules by selector
         * @param {childIterator} callback   - iterator receives each node and index
         *
         * @return {false|undefined} returns `false` if iteration was broke
         *
         * @example
         * const selectors = [];
         * root.walkRules(rule => {
         *   selectors.push(rule.selector);
         * });
         * console.log(`Your CSS uses ${selectors.length} selectors`);
         */

    }, {
        key: 'walkRules',
        value: function walkRules(selector, callback) {
            if (!callback) {
                callback = selector;

                return this.walk(function (child, i) {
                    if (child.type === 'rule') {
                        return callback(child, i);
                    }
                });
            } else if (selector instanceof RegExp) {
                return this.walk(function (child, i) {
                    if (child.type === 'rule' && selector.test(child.selector)) {
                        return callback(child, i);
                    }
                });
            } else {
                return this.walk(function (child, i) {
                    if (child.type === 'rule' && child.selector === selector) {
                        return callback(child, i);
                    }
                });
            }
        }

        /**
         * Traverses the container’s descendant nodes, calling callback
         * for each at-rule node.
         *
         * If you pass a filter, iteration will only happen over at-rules
         * that have matching names.
         *
         * Like {@link Container#each}, this method is safe
         * to use if you are mutating arrays during iteration.
         *
         * @param {string|RegExp} [name]   - string or regular expression
         *                                   to filter at-rules by name
         * @param {childIterator} callback - iterator receives each node and index
         *
         * @return {false|undefined} returns `false` if iteration was broke
         *
         * @example
         * root.walkAtRules(rule => {
         *   if ( isOld(rule.name) ) rule.remove();
         * });
         *
         * let first = false;
         * root.walkAtRules('charset', rule => {
         *   if ( !first ) {
         *     first = true;
         *   } else {
         *     rule.remove();
         *   }
         * });
         */

    }, {
        key: 'walkAtRules',
        value: function walkAtRules(name, callback) {
            if (!callback) {
                callback = name;
                return this.walk(function (child, i) {
                    if (child.type === 'atrule') {
                        return callback(child, i);
                    }
                });
            } else if (name instanceof RegExp) {
                return this.walk(function (child, i) {
                    if (child.type === 'atrule' && name.test(child.name)) {
                        return callback(child, i);
                    }
                });
            } else {
                return this.walk(function (child, i) {
                    if (child.type === 'atrule' && child.name === name) {
                        return callback(child, i);
                    }
                });
            }
        }

        /**
         * Traverses the container’s descendant nodes, calling callback
         * for each comment node.
         *
         * Like {@link Container#each}, this method is safe
         * to use if you are mutating arrays during iteration.
         *
         * @param {childIterator} callback - iterator receives each node and index
         *
         * @return {false|undefined} returns `false` if iteration was broke
         *
         * @example
         * root.walkComments(comment => {
         *   comment.remove();
         * });
         */

    }, {
        key: 'walkComments',
        value: function walkComments(callback) {
            return this.walk(function (child, i) {
                if (child.type === 'comment') {
                    return callback(child, i);
                }
            });
        }

        /**
         * Inserts new nodes to the start of the container.
         *
         * @param {...(Node|object|string|Node[])} children - new nodes
         *
         * @return {Node} this node for methods chain
         *
         * @example
         * const decl1 = postcss.decl({ prop: 'color', value: 'black' });
         * const decl2 = postcss.decl({ prop: 'background-color', value: 'white' });
         * rule.append(decl1, decl2);
         *
         * root.append({ name: 'charset', params: '"UTF-8"' });  // at-rule
         * root.append({ selector: 'a' });                       // rule
         * rule.append({ prop: 'color', value: 'black' });       // declaration
         * rule.append({ text: 'Comment' })                      // comment
         *
         * root.append('a {}');
         * root.first.append('color: black; z-index: 1');
         */

    }, {
        key: 'append',
        value: function append() {
            var _this2 = this;

            for (var _len = arguments.length, children = Array(_len), _key = 0; _key < _len; _key++) {
                children[_key] = arguments[_key];
            }

            children.forEach(function (child) {
                var nodes = _this2.normalize(child, _this2.last);
                nodes.forEach(function (node) {
                    return _this2.nodes.push(node);
                });
            });
            return this;
        }

        /**
         * Inserts new nodes to the end of the container.
         *
         * @param {...(Node|object|string|Node[])} children - new nodes
         *
         * @return {Node} this node for methods chain
         *
         * @example
         * const decl1 = postcss.decl({ prop: 'color', value: 'black' });
         * const decl2 = postcss.decl({ prop: 'background-color', value: 'white' });
         * rule.prepend(decl1, decl2);
         *
         * root.append({ name: 'charset', params: '"UTF-8"' });  // at-rule
         * root.append({ selector: 'a' });                       // rule
         * rule.append({ prop: 'color', value: 'black' });       // declaration
         * rule.append({ text: 'Comment' })                      // comment
         *
         * root.append('a {}');
         * root.first.append('color: black; z-index: 1');
         */

    }, {
        key: 'prepend',
        value: function prepend() {
            var _this3 = this;

            for (var _len2 = arguments.length, children = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                children[_key2] = arguments[_key2];
            }

            children = children.reverse();
            children.forEach(function (child) {
                var nodes = _this3.normalize(child, _this3.first, 'prepend').reverse();
                nodes.forEach(function (node) {
                    return _this3.nodes.unshift(node);
                });
                for (var id in _this3.indexes) {
                    _this3.indexes[id] = _this3.indexes[id] + nodes.length;
                }
            });
            return this;
        }
    }, {
        key: 'cleanRaws',
        value: function cleanRaws(keepBetween) {
            get$1(Container.prototype.__proto__ || Object.getPrototypeOf(Container.prototype), 'cleanRaws', this).call(this, keepBetween);
            if (this.nodes) {
                this.nodes.forEach(function (node) {
                    return node.cleanRaws(keepBetween);
                });
            }
        }

        /**
         * Insert new node before old node within the container.
         *
         * @param {Node|number} exist             - child or child’s index.
         * @param {Node|object|string|Node[]} add - new node
         *
         * @return {Node} this node for methods chain
         *
         * @example
         * rule.insertBefore(decl, decl.clone({ prop: '-webkit-' + decl.prop }));
         */

    }, {
        key: 'insertBefore',
        value: function insertBefore(exist, add) {
            var _this4 = this;

            exist = this.index(exist);

            var type = exist === 0 ? 'prepend' : false;
            var nodes = this.normalize(add, this.nodes[exist], type).reverse();
            nodes.forEach(function (node) {
                return _this4.nodes.splice(exist, 0, node);
            });

            var index = void 0;
            for (var id in this.indexes) {
                index = this.indexes[id];
                if (exist <= index) {
                    this.indexes[id] = index + nodes.length;
                }
            }

            return this;
        }

        /**
         * Insert new node after old node within the container.
         *
         * @param {Node|number} exist             - child or child’s index
         * @param {Node|object|string|Node[]} add - new node
         *
         * @return {Node} this node for methods chain
         */

    }, {
        key: 'insertAfter',
        value: function insertAfter(exist, add) {
            var _this5 = this;

            exist = this.index(exist);

            var nodes = this.normalize(add, this.nodes[exist]).reverse();
            nodes.forEach(function (node) {
                return _this5.nodes.splice(exist + 1, 0, node);
            });

            var index = void 0;
            for (var id in this.indexes) {
                index = this.indexes[id];
                if (exist < index) {
                    this.indexes[id] = index + nodes.length;
                }
            }

            return this;
        }
    }, {
        key: 'remove',
        value: function remove(child) {
            if (typeof child !== 'undefined') {
                warnOnce('Container#remove is deprecated. ' + 'Use Container#removeChild');
                this.removeChild(child);
            } else {
                get$1(Container.prototype.__proto__ || Object.getPrototypeOf(Container.prototype), 'remove', this).call(this);
            }
            return this;
        }

        /**
         * Removes node from the container and cleans the parent properties
         * from the node and its children.
         *
         * @param {Node|number} child - child or child’s index
         *
         * @return {Node} this node for methods chain
         *
         * @example
         * rule.nodes.length  //=> 5
         * rule.removeChild(decl);
         * rule.nodes.length  //=> 4
         * decl.parent        //=> undefined
         */

    }, {
        key: 'removeChild',
        value: function removeChild(child) {
            child = this.index(child);
            this.nodes[child].parent = undefined;
            this.nodes.splice(child, 1);

            var index = void 0;
            for (var id in this.indexes) {
                index = this.indexes[id];
                if (index >= child) {
                    this.indexes[id] = index - 1;
                }
            }

            return this;
        }

        /**
         * Removes all children from the container
         * and cleans their parent properties.
         *
         * @return {Node} this node for methods chain
         *
         * @example
         * rule.removeAll();
         * rule.nodes.length //=> 0
         */

    }, {
        key: 'removeAll',
        value: function removeAll() {
            this.nodes.forEach(function (node) {
                return node.parent = undefined;
            });
            this.nodes = [];
            return this;
        }

        /**
         * Passes all declaration values within the container that match pattern
         * through callback, replacing those values with the returned result
         * of callback.
         *
         * This method is useful if you are using a custom unit or function
         * and need to iterate through all values.
         *
         * @param {string|RegExp} pattern      - replace pattern
         * @param {object} opts                - options to speed up the search
         * @param {string|string[]} opts.props - an array of property names
         * @param {string} opts.fast           - string that’s used
         *                                       to narrow down values and speed up
                                                 the regexp search
         * @param {function|string} callback   - string to replace pattern
         *                                       or callback that returns a new
         *                                       value.
         *                                       The callback will receive
         *                                       the same arguments as those
         *                                       passed to a function parameter
         *                                       of `String#replace`.
         *
         * @return {Node} this node for methods chain
         *
         * @example
         * root.replaceValues(/\d+rem/, { fast: 'rem' }, string => {
         *   return 15 * parseInt(string) + 'px';
         * });
         */

    }, {
        key: 'replaceValues',
        value: function replaceValues(pattern, opts, callback) {
            if (!callback) {
                callback = opts;
                opts = {};
            }

            this.walkDecls(function (decl) {
                if (opts.props && opts.props.indexOf(decl.prop) === -1) return;
                if (opts.fast && decl.value.indexOf(opts.fast) === -1) return;

                decl.value = decl.value.replace(pattern, callback);
            });

            return this;
        }

        /**
         * Returns `true` if callback returns `true`
         * for all of the container’s children.
         *
         * @param {childCondition} condition - iterator returns true or false.
         *
         * @return {boolean} is every child pass condition
         *
         * @example
         * const noPrefixes = rule.every(i => i.prop[0] !== '-');
         */

    }, {
        key: 'every',
        value: function every(condition) {
            return this.nodes.every(condition);
        }

        /**
         * Returns `true` if callback returns `true` for (at least) one
         * of the container’s children.
         *
         * @param {childCondition} condition - iterator returns true or false.
         *
         * @return {boolean} is some child pass condition
         *
         * @example
         * const hasPrefix = rule.some(i => i.prop[0] === '-');
         */

    }, {
        key: 'some',
        value: function some(condition) {
            return this.nodes.some(condition);
        }

        /**
         * Returns a `child`’s index within the {@link Container#nodes} array.
         *
         * @param {Node} child - child of the current container.
         *
         * @return {number} child index
         *
         * @example
         * rule.index( rule.nodes[2] ) //=> 2
         */

    }, {
        key: 'index',
        value: function index(child) {
            if (typeof child === 'number') {
                return child;
            } else {
                return this.nodes.indexOf(child);
            }
        }

        /**
         * The container’s first child.
         *
         * @type {Node}
         *
         * @example
         * rule.first == rules.nodes[0];
         */

    }, {
        key: 'normalize',
        value: function normalize(nodes, sample) {
            var _this6 = this;

            if (typeof nodes === 'string') {
                nodes = cleanSource(parse(nodes).nodes);
            } else if (!Array.isArray(nodes)) {
                if (nodes.type === 'root') {
                    nodes = nodes.nodes;
                } else if (nodes.type) {
                    nodes = [nodes];
                } else if (nodes.prop) {
                    if (typeof nodes.value === 'undefined') {
                        throw new Error('Value field is missed in node creation');
                    } else if (typeof nodes.value !== 'string') {
                        nodes.value = String(nodes.value);
                    }
                    nodes = [new Declaration(nodes)];
                } else if (nodes.selector) {
                    nodes = [new Rule(nodes)];
                } else if (nodes.name) {
                    nodes = [new AtRule(nodes)];
                } else if (nodes.text) {
                    nodes = [new Comment(nodes)];
                } else {
                    throw new Error('Unknown node type in node creation');
                }
            }

            var processed = nodes.map(function (i) {
                if (typeof i.raws === 'undefined') i = _this6.rebuild(i);

                if (i.parent) i = i.clone();
                if (typeof i.raws.before === 'undefined') {
                    if (sample && typeof sample.raws.before !== 'undefined') {
                        i.raws.before = sample.raws.before.replace(/[^\s]/g, '');
                    }
                }
                i.parent = _this6;
                return i;
            });

            return processed;
        }
    }, {
        key: 'rebuild',
        value: function rebuild(node, parent) {
            var _this7 = this;

            var fix = void 0;
            if (node.type === 'root') {
                fix = new Root();
            } else if (node.type === 'atrule') {
                fix = new AtRule();
            } else if (node.type === 'rule') {
                fix = new Rule();
            } else if (node.type === 'decl') {
                fix = new Declaration();
            } else if (node.type === 'comment') {
                fix = new Comment();
            }

            for (var i in node) {
                if (i === 'nodes') {
                    fix.nodes = node.nodes.map(function (j) {
                        return _this7.rebuild(j, fix);
                    });
                } else if (i === 'parent' && parent) {
                    fix.parent = parent;
                } else if (node.hasOwnProperty(i)) {
                    fix[i] = node[i];
                }
            }

            return fix;
        }
    }, {
        key: 'eachInside',
        value: function eachInside(callback) {
            warnOnce('Container#eachInside is deprecated. ' + 'Use Container#walk instead.');
            return this.walk(callback);
        }
    }, {
        key: 'eachDecl',
        value: function eachDecl(prop, callback) {
            warnOnce('Container#eachDecl is deprecated. ' + 'Use Container#walkDecls instead.');
            return this.walkDecls(prop, callback);
        }
    }, {
        key: 'eachRule',
        value: function eachRule(selector, callback) {
            warnOnce('Container#eachRule is deprecated. ' + 'Use Container#walkRules instead.');
            return this.walkRules(selector, callback);
        }
    }, {
        key: 'eachAtRule',
        value: function eachAtRule(name, callback) {
            warnOnce('Container#eachAtRule is deprecated. ' + 'Use Container#walkAtRules instead.');
            return this.walkAtRules(name, callback);
        }
    }, {
        key: 'eachComment',
        value: function eachComment(callback) {
            warnOnce('Container#eachComment is deprecated. ' + 'Use Container#walkComments instead.');
            return this.walkComments(callback);
        }
    }, {
        key: 'first',
        get: function get() {
            if (!this.nodes) return undefined;
            return this.nodes[0];
        }

        /**
         * The container’s last child.
         *
         * @type {Node}
         *
         * @example
         * rule.last == rule.nodes[rule.nodes.length - 1];
         */

    }, {
        key: 'last',
        get: function get() {
            if (!this.nodes) return undefined;
            return this.nodes[this.nodes.length - 1];
        }
    }, {
        key: 'semicolon',
        get: function get() {
            warnOnce('Node#semicolon is deprecated. Use Node#raws.semicolon');
            return this.raws.semicolon;
        },
        set: function set(val) {
            warnOnce('Node#semicolon is deprecated. Use Node#raws.semicolon');
            this.raws.semicolon = val;
        }
    }, {
        key: 'after',
        get: function get() {
            warnOnce('Node#after is deprecated. Use Node#raws.after');
            return this.raws.after;
        },
        set: function set(val) {
            warnOnce('Node#after is deprecated. Use Node#raws.after');
            this.raws.after = val;
        }

        /**
         * @memberof Container#
         * @member {Node[]} nodes - an array containing the container’s children
         *
         * @example
         * const root = postcss.parse('a { color: black }');
         * root.nodes.length           //=> 1
         * root.nodes[0].selector      //=> 'a'
         * root.nodes[0].nodes[0].prop //=> 'color'
         */

    }]);
    return Container;
}(Node);

/**
 * Represents an at-rule.
 *
 * If it’s followed in the CSS by a {} block, this node will have
 * a nodes property representing its children.
 *
 * @extends Container
 *
 * @example
 * const root = postcss.parse('@charset "UTF-8"; @media print {}');
 *
 * const charset = root.first;
 * charset.type  //=> 'atrule'
 * charset.nodes //=> undefined
 *
 * const media = root.last;
 * media.nodes   //=> []
 */

var AtRule = function (_Container) {
    inherits(AtRule, _Container);

    function AtRule(defaults$$1) {
        classCallCheck(this, AtRule);

        var _this = possibleConstructorReturn(this, (AtRule.__proto__ || Object.getPrototypeOf(AtRule)).call(this, defaults$$1));

        _this.type = 'atrule';
        return _this;
    }

    createClass(AtRule, [{
        key: 'append',
        value: function append() {
            var _babelHelpers$get;

            if (!this.nodes) this.nodes = [];

            for (var _len = arguments.length, children = Array(_len), _key = 0; _key < _len; _key++) {
                children[_key] = arguments[_key];
            }

            return (_babelHelpers$get = get$1(AtRule.prototype.__proto__ || Object.getPrototypeOf(AtRule.prototype), 'append', this)).call.apply(_babelHelpers$get, [this].concat(children));
        }
    }, {
        key: 'prepend',
        value: function prepend() {
            var _babelHelpers$get2;

            if (!this.nodes) this.nodes = [];

            for (var _len2 = arguments.length, children = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                children[_key2] = arguments[_key2];
            }

            return (_babelHelpers$get2 = get$1(AtRule.prototype.__proto__ || Object.getPrototypeOf(AtRule.prototype), 'prepend', this)).call.apply(_babelHelpers$get2, [this].concat(children));
        }
    }, {
        key: 'afterName',
        get: function get() {
            warnOnce('AtRule#afterName was deprecated. Use AtRule#raws.afterName');
            return this.raws.afterName;
        },
        set: function set(val) {
            warnOnce('AtRule#afterName was deprecated. Use AtRule#raws.afterName');
            this.raws.afterName = val;
        }
    }, {
        key: '_params',
        get: function get() {
            warnOnce('AtRule#_params was deprecated. Use AtRule#raws.params');
            return this.raws.params;
        },
        set: function set(val) {
            warnOnce('AtRule#_params was deprecated. Use AtRule#raws.params');
            this.raws.params = val;
        }

        /**
         * @memberof AtRule#
         * @member {string} name - the at-rule’s name immediately follows the `@`
         *
         * @example
         * const root  = postcss.parse('@media print {}');
         * media.name //=> 'media'
         * const media = root.first;
         */

        /**
         * @memberof AtRule#
         * @member {string} params - the at-rule’s parameters, the values
         *                           that follow the at-rule’s name but precede
         *                           any {} block
         *
         * @example
         * const root  = postcss.parse('@media print, screen {}');
         * const media = root.first;
         * media.params //=> 'print, screen'
         */

        /**
         * @memberof AtRule#
         * @member {object} raws - Information to generate byte-to-byte equal
         *                         node string as it was in the origin input.
         *
         * Every parser saves its own properties,
         * but the default CSS parser uses:
         *
         * * `before`: the space symbols before the node. It also stores `*`
         *   and `_` symbols before the declaration (IE hack).
         * * `after`: the space symbols after the last child of the node
         *   to the end of the node.
         * * `between`: the symbols between the property and value
         *   for declarations, selector and `{` for rules, or last parameter
         *   and `{` for at-rules.
         * * `semicolon`: contains true if the last child has
         *   an (optional) semicolon.
         * * `afterName`: the space between the at-rule name and its parameters.
         *
         * PostCSS cleans at-rule parameters from comments and extra spaces,
         * but it stores origin content in raws properties.
         * As such, if you don’t change a declaration’s value,
         * PostCSS will use the raw value with comments.
         *
         * @example
         * const root = postcss.parse('  @media\nprint {\n}')
         * root.first.first.raws //=> { before: '  ',
         *                       //     between: ' ',
         *                       //     afterName: '\n',
         *                       //     after: '\n' }
         */

    }]);
    return AtRule;
}(Container);

/**
 * Contains helpers for safely splitting lists of CSS values,
 * preserving parentheses and quotes.
 *
 * @example
 * const list = postcss.list;
 *
 * @namespace list
 */
var list = {
    split: function split(string, separators, last) {
        var array = [];
        var current = '';
        var split = false;

        var func = 0;
        var quote = false;
        var escape = false;

        for (var i = 0; i < string.length; i++) {
            var letter = string[i];

            if (quote) {
                if (escape) {
                    escape = false;
                } else if (letter === '\\') {
                    escape = true;
                } else if (letter === quote) {
                    quote = false;
                }
            } else if (letter === '"' || letter === '\'') {
                quote = letter;
            } else if (letter === '(') {
                func += 1;
            } else if (letter === ')') {
                if (func > 0) func -= 1;
            } else if (func === 0) {
                if (separators.indexOf(letter) !== -1) split = true;
            }

            if (split) {
                if (current !== '') array.push(current.trim());
                current = '';
                split = false;
            } else {
                current += letter;
            }
        }

        if (last || current !== '') array.push(current.trim());
        return array;
    },


    /**
     * Safely splits space-separated values (such as those for `background`,
     * `border-radius`, and other shorthand properties).
     *
     * @param {string} string - space-separated values
     *
     * @return {string[]} splitted values
     *
     * @example
     * postcss.list.space('1px calc(10% + 1px)') //=> ['1px', 'calc(10% + 1px)']
     */
    space: function space(string) {
        var spaces = [' ', '\n', '\t'];
        return list.split(string, spaces);
    },


    /**
     * Safely splits comma-separated values (such as those for `transition-*`
     * and `background` properties).
     *
     * @param {string} string - comma-separated values
     *
     * @return {string[]} splitted values
     *
     * @example
     * postcss.list.comma('black, linear-gradient(white, black)')
     * //=> ['black', 'linear-gradient(white, black)']
     */
    comma: function comma(string) {
        var comma = ',';
        return list.split(string, [comma], true);
    }
};

/**
 * Represents a CSS rule: a selector followed by a declaration block.
 *
 * @extends Container
 *
 * @example
 * const root = postcss.parse('a{}');
 * const rule = root.first;
 * rule.type       //=> 'rule'
 * rule.toString() //=> 'a{}'
 */

var Rule = function (_Container) {
    inherits(Rule, _Container);

    function Rule(defaults$$1) {
        classCallCheck(this, Rule);

        var _this = possibleConstructorReturn(this, (Rule.__proto__ || Object.getPrototypeOf(Rule)).call(this, defaults$$1));

        _this.type = 'rule';
        if (!_this.nodes) _this.nodes = [];
        return _this;
    }

    /**
     * An array containing the rule’s individual selectors.
     * Groups of selectors are split at commas.
     *
     * @type {string[]}
     *
     * @example
     * const root = postcss.parse('a, b { }');
     * const rule = root.first;
     *
     * rule.selector  //=> 'a, b'
     * rule.selectors //=> ['a', 'b']
     *
     * rule.selectors = ['a', 'strong'];
     * rule.selector //=> 'a, strong'
     */


    createClass(Rule, [{
        key: 'selectors',
        get: function get() {
            return list.comma(this.selector);
        },
        set: function set(values) {
            var match = this.selector ? this.selector.match(/,\s*/) : null;
            var sep = match ? match[0] : ',' + this.raw('between', 'beforeOpen');
            this.selector = values.join(sep);
        }
    }, {
        key: '_selector',
        get: function get() {
            warnOnce('Rule#_selector is deprecated. Use Rule#raws.selector');
            return this.raws.selector;
        },
        set: function set(val) {
            warnOnce('Rule#_selector is deprecated. Use Rule#raws.selector');
            this.raws.selector = val;
        }

        /**
         * @memberof Rule#
         * @member {string} selector - the rule’s full selector represented
         *                             as a string
         *
         * @example
         * const root = postcss.parse('a, b { }');
         * const rule = root.first;
         * rule.selector //=> 'a, b'
         */

        /**
         * @memberof Rule#
         * @member {object} raws - Information to generate byte-to-byte equal
         *                         node string as it was in the origin input.
         *
         * Every parser saves its own properties,
         * but the default CSS parser uses:
         *
         * * `before`: the space symbols before the node. It also stores `*`
         *   and `_` symbols before the declaration (IE hack).
         * * `after`: the space symbols after the last child of the node
         *   to the end of the node.
         * * `between`: the symbols between the property and value
         *   for declarations, selector and `{` for rules, or last parameter
         *   and `{` for at-rules.
         * * `semicolon`: contains true if the last child has
         *   an (optional) semicolon.
         *
         * PostCSS cleans selectors from comments and extra spaces,
         * but it stores origin content in raws properties.
         * As such, if you don’t change a declaration’s value,
         * PostCSS will use the raw value with comments.
         *
         * @example
         * const root = postcss.parse('a {\n  color:black\n}')
         * root.first.first.raws //=> { before: '', between: ' ', after: '\n' }
         */

    }]);
    return Rule;
}(Container);

/**
 * Represents a plugin’s warning. It can be created using {@link Node#warn}.
 *
 * @example
 * if ( decl.important ) {
 *     decl.warn(result, 'Avoid !important', { word: '!important' });
 * }
 */
var Warning = function () {

  /**
   * @param {string} text        - warning message
   * @param {Object} [opts]      - warning options
   * @param {Node}   opts.node   - CSS node that caused the warning
   * @param {string} opts.word   - word in CSS source that caused the warning
   * @param {number} opts.index  - index in CSS node string that caused
   *                               the warning
   * @param {string} opts.plugin - name of the plugin that created
   *                               this warning. {@link Result#warn} fills
   *                               this property automatically.
   */
  function Warning(text) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, Warning);

    /**
     * @member {string} - Type to filter warnings from
     *                    {@link Result#messages}. Always equal
     *                    to `"warning"`.
     *
     * @example
     * const nonWarning = result.messages.filter(i => i.type !== 'warning')
     */
    this.type = 'warning';
    /**
     * @member {string} - The warning message.
     *
     * @example
     * warning.text //=> 'Try to avoid !important'
     */
    this.text = text;

    if (opts.node && opts.node.source) {
      var pos = opts.node.positionBy(opts);
      /**
       * @member {number} - Line in the input file
       *                    with this warning’s source
       *
       * @example
       * warning.line //=> 5
       */
      this.line = pos.line;
      /**
       * @member {number} - Column in the input file
       *                    with this warning’s source.
       *
       * @example
       * warning.column //=> 6
       */
      this.column = pos.column;
    }

    for (var opt in opts) {
      this[opt] = opts[opt];
    }
  }

  /**
   * Returns a warning position and message.
   *
   * @example
   * warning.toString() //=> 'postcss-lint:a.css:10:14: Avoid !important'
   *
   * @return {string} warning position and message
   */


  createClass(Warning, [{
    key: 'toString',
    value: function toString() {
      if (this.node) {
        return this.node.error(this.text, {
          plugin: this.plugin,
          index: this.index,
          word: this.word
        }).message;
      } else if (this.plugin) {
        return this.plugin + ': ' + this.text;
      } else {
        return this.text;
      }
    }

    /**
     * @memberof Warning#
     * @member {string} plugin - The name of the plugin that created
     *                           it will fill this property automatically.
     *                           this warning. When you call {@link Node#warn}
     *
     * @example
     * warning.plugin //=> 'postcss-important'
     */

    /**
     * @memberof Warning#
     * @member {Node} node - Contains the CSS node that caused the warning.
     *
     * @example
     * warning.node.toString() //=> 'color: white !important'
     */

  }]);
  return Warning;
}();

/**
 * @typedef  {object} Message
 * @property {string} type   - message type
 * @property {string} plugin - source PostCSS plugin name
 */

/**
 * Provides the result of the PostCSS transformations.
 *
 * A Result instance is returned by {@link LazyResult#then}
 * or {@link Root#toResult} methods.
 *
 * @example
 * postcss([cssnext]).process(css).then(function (result) {
 *    console.log(result.css);
 * });
 *
 * @example
 * var result2 = postcss.parse(css).toResult();
 */

var Result = function () {

  /**
   * @param {Processor} processor - processor used for this transformation.
   * @param {Root}      root      - Root node after all transformations.
   * @param {processOptions} opts - options from the {@link Processor#process}
   *                                or {@link Root#toResult}
   */
  function Result(processor, root, opts) {
    classCallCheck(this, Result);

    /**
     * @member {Processor} - The Processor instance used
     *                       for this transformation.
     *
     * @example
     * for ( let plugin of result.processor.plugins) {
     *   if ( plugin.postcssPlugin === 'postcss-bad' ) {
     *     throw 'postcss-good is incompatible with postcss-bad';
     *   }
     * });
     */
    this.processor = processor;
    /**
     * @member {Message[]} - Contains messages from plugins
     *                       (e.g., warnings or custom messages).
     *                       Each message should have type
     *                       and plugin properties.
     *
     * @example
     * postcss.plugin('postcss-min-browser', () => {
     *   return (root, result) => {
     *     var browsers = detectMinBrowsersByCanIUse(root);
     *     result.messages.push({
     *       type:    'min-browser',
     *       plugin:  'postcss-min-browser',
     *       browsers: browsers
     *     });
     *   };
     * });
     */
    this.messages = [];
    /**
     * @member {Root} - Root node after all transformations.
     *
     * @example
     * root.toResult().root == root;
     */
    this.root = root;
    /**
     * @member {processOptions} - Options from the {@link Processor#process}
     *                            or {@link Root#toResult} call
     *                            that produced this Result instance.
     *
     * @example
     * root.toResult(opts).opts == opts;
     */
    this.opts = opts;
    /**
     * @member {string} - A CSS string representing of {@link Result#root}.
     *
     * @example
     * postcss.parse('a{}').toResult().css //=> "a{}"
     */
    this.css = undefined;
    /**
     * @member {SourceMapGenerator} - An instance of `SourceMapGenerator`
     *                                class from the `source-map` library,
     *                                representing changes
     *                                to the {@link Result#root} instance.
     *
     * @example
     * result.map.toJSON() //=> { version: 3, file: 'a.css', … }
     *
     * @example
     * if ( result.map ) {
     *   fs.writeFileSync(result.opts.to + '.map', result.map.toString());
     * }
     */
    this.map = undefined;
  }

  /**
   * Returns for @{link Result#css} content.
   *
   * @example
   * result + '' === result.css
   *
   * @return {string} string representing of {@link Result#root}
   */


  createClass(Result, [{
    key: 'toString',
    value: function toString() {
      return this.css;
    }

    /**
     * Creates an instance of {@link Warning} and adds it
     * to {@link Result#messages}.
     *
     * @param {string} text        - warning message
     * @param {Object} [opts]      - warning options
     * @param {Node}   opts.node   - CSS node that caused the warning
     * @param {string} opts.word   - word in CSS source that caused the warning
     * @param {number} opts.index  - index in CSS node string that caused
     *                               the warning
     * @param {string} opts.plugin - name of the plugin that created
     *                               this warning. {@link Result#warn} fills
     *                               this property automatically.
     *
     * @return {Warning} created warning
     */

  }, {
    key: 'warn',
    value: function warn(text) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!opts.plugin) {
        if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
          opts.plugin = this.lastPlugin.postcssPlugin;
        }
      }

      var warning = new Warning(text, opts);
      this.messages.push(warning);

      return warning;
    }

    /**
     * Returns warnings from plugins. Filters {@link Warning} instances
     * from {@link Result#messages}.
     *
     * @example
     * result.warnings().forEach(warn => {
     *   console.warn(warn.toString());
     * });
     *
     * @return {Warning[]} warnings from plugins
     */

  }, {
    key: 'warnings',
    value: function warnings() {
      return this.messages.filter(function (i) {
        return i.type === 'warning';
      });
    }

    /**
     * An alias for the {@link Result#css} property.
     * Use it with syntaxes that generate non-CSS output.
     * @type {string}
     *
     * @example
     * result.css === result.content;
     */

  }, {
    key: 'content',
    get: function get() {
      return this.css;
    }
  }]);
  return Result;
}();

function isPromise(obj) {
    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && typeof obj.then === 'function';
}

/**
 * @callback onFulfilled
 * @param {Result} result
 */

/**
 * @callback onRejected
 * @param {Error} error
 */

/**
 * A Promise proxy for the result of PostCSS transformations.
 *
 * A `LazyResult` instance is returned by {@link Processor#process}.
 *
 * @example
 * const lazy = postcss([cssnext]).process(css);
 */

var LazyResult = function () {
    function LazyResult(processor, css, opts) {
        classCallCheck(this, LazyResult);

        this.stringified = false;
        this.processed = false;

        var root = void 0;
        if ((typeof css === 'undefined' ? 'undefined' : _typeof(css)) === 'object' && css.type === 'root') {
            root = css;
        } else if (css instanceof LazyResult || css instanceof Result) {
            root = css.root;
            if (css.map) {
                if (typeof opts.map === 'undefined') opts.map = {};
                if (!opts.map.inline) opts.map.inline = false;
                opts.map.prev = css.map;
            }
        } else {
            var parser = parse;
            if (opts.syntax) parser = opts.syntax.parse;
            if (opts.parser) parser = opts.parser;
            if (parser.parse) parser = parser.parse;

            try {
                root = parser(css, opts);
            } catch (error) {
                this.error = error;
            }
        }

        this.result = new Result(processor, root, opts);
    }

    /**
     * Returns a {@link Processor} instance, which will be used
     * for CSS transformations.
     * @type {Processor}
     */


    createClass(LazyResult, [{
        key: 'warnings',


        /**
         * Processes input CSS through synchronous plugins
         * and calls {@link Result#warnings()}.
         *
         * @return {Warning[]} warnings from plugins
         */
        value: function warnings() {
            return this.sync().warnings();
        }

        /**
         * Alias for the {@link LazyResult#css} property.
         *
         * @example
         * lazy + '' === lazy.css;
         *
         * @return {string} output CSS
         */

    }, {
        key: 'toString',
        value: function toString() {
            return this.css;
        }

        /**
         * Processes input CSS through synchronous and asynchronous plugins
         * and calls `onFulfilled` with a Result instance. If a plugin throws
         * an error, the `onRejected` callback will be executed.
         *
         * It implements standard Promise API.
         *
         * @param {onFulfilled} onFulfilled - callback will be executed
         *                                    when all plugins will finish work
         * @param {onRejected}  onRejected  - callback will be execited on any error
         *
         * @return {Promise} Promise API to make queue
         *
         * @example
         * postcss([cssnext]).process(css).then(result => {
         *   console.log(result.css);
         * });
         */

    }, {
        key: 'then',
        value: function then(onFulfilled, onRejected) {
            return this.async().then(onFulfilled, onRejected);
        }

        /**
         * Processes input CSS through synchronous and asynchronous plugins
         * and calls onRejected for each error thrown in any plugin.
         *
         * It implements standard Promise API.
         *
         * @param {onRejected} onRejected - callback will be execited on any error
         *
         * @return {Promise} Promise API to make queue
         *
         * @example
         * postcss([cssnext]).process(css).then(result => {
         *   console.log(result.css);
         * }).catch(error => {
         *   console.error(error);
         * });
         */

    }, {
        key: 'catch',
        value: function _catch(onRejected) {
            return this.async().catch(onRejected);
        }
    }, {
        key: 'handleError',
        value: function handleError(error, plugin) {
            try {
                this.error = error;
                if (error.name === 'CssSyntaxError' && !error.plugin) {
                    error.plugin = plugin.postcssPlugin;
                    error.setMessage();
                } else if (plugin.postcssVersion) {
                    var pluginName = plugin.postcssPlugin;
                    var pluginVer = plugin.postcssVersion;
                    var runtimeVer = this.result.processor.version;
                    var a = pluginVer.split('.');
                    var b = runtimeVer.split('.');

                    if (a[0] !== b[0] || parseInt(a[1]) > parseInt(b[1])) {
                        warnOnce('Your current PostCSS version ' + 'is ' + runtimeVer + ', but ' + pluginName + ' ' + 'uses ' + pluginVer + '. Perhaps this is ' + 'the source of the error below.');
                    }
                }
            } catch (err) {
                if (console && console.error) console.error(err);
            }
        }
    }, {
        key: 'asyncTick',
        value: function asyncTick(resolve, reject) {
            var _this = this;

            if (this.plugin >= this.processor.plugins.length) {
                this.processed = true;
                return resolve();
            }

            try {
                var plugin = this.processor.plugins[this.plugin];
                var promise = this.run(plugin);
                this.plugin += 1;

                if (isPromise(promise)) {
                    promise.then(function () {
                        _this.asyncTick(resolve, reject);
                    }).catch(function (error) {
                        _this.handleError(error, plugin);
                        _this.processed = true;
                        reject(error);
                    });
                } else {
                    this.asyncTick(resolve, reject);
                }
            } catch (error) {
                this.processed = true;
                reject(error);
            }
        }
    }, {
        key: 'async',
        value: function async() {
            var _this2 = this;

            if (this.processed) {
                return new Promise(function (resolve, reject) {
                    if (_this2.error) {
                        reject(_this2.error);
                    } else {
                        resolve(_this2.stringify());
                    }
                });
            }
            if (this.processing) {
                return this.processing;
            }

            this.processing = new Promise(function (resolve, reject) {
                if (_this2.error) return reject(_this2.error);
                _this2.plugin = 0;
                _this2.asyncTick(resolve, reject);
            }).then(function () {
                _this2.processed = true;
                return _this2.stringify();
            });

            return this.processing;
        }
    }, {
        key: 'sync',
        value: function sync() {
            var _this3 = this;

            if (this.processed) return this.result;
            this.processed = true;

            if (this.processing) {
                throw new Error('Use process(css).then(cb) to work with async plugins');
            }

            if (this.error) throw this.error;

            this.result.processor.plugins.forEach(function (plugin) {
                var promise = _this3.run(plugin);
                if (isPromise(promise)) {
                    throw new Error('Use process(css).then(cb) to work with async plugins');
                }
            });

            return this.result;
        }
    }, {
        key: 'run',
        value: function run(plugin) {
            this.result.lastPlugin = plugin;

            try {
                return plugin(this.result.root, this.result);
            } catch (error) {
                this.handleError(error, plugin);
                throw error;
            }
        }
    }, {
        key: 'stringify',
        value: function stringify() {
            if (this.stringified) return this.result;
            this.stringified = true;

            this.sync();

            var opts = this.result.opts;
            var str = stringify$1;
            if (opts.syntax) str = opts.syntax.stringify;
            if (opts.stringifier) str = opts.stringifier;
            if (str.stringify) str = str.stringify;

            var result = '';
            str(this.root, function (i) {
                result += i;
            });
            this.result.css = result;

            return this.result;
        }
    }, {
        key: 'processor',
        get: function get() {
            return this.result.processor;
        }

        /**
         * Options from the {@link Processor#process} call.
         * @type {processOptions}
         */

    }, {
        key: 'opts',
        get: function get() {
            return this.result.opts;
        }

        /**
         * Processes input CSS through synchronous plugins, converts `Root`
         * to a CSS string and returns {@link Result#css}.
         *
         * This property will only work with synchronous plugins.
         * If the processor contains any asynchronous plugins
         * it will throw an error. This is why this method is only
         * for debug purpose, you should always use {@link LazyResult#then}.
         *
         * @type {string}
         * @see Result#css
         */

    }, {
        key: 'css',
        get: function get() {
            return this.stringify().css;
        }

        /**
         * An alias for the `css` property. Use it with syntaxes
         * that generate non-CSS output.
         *
         * This property will only work with synchronous plugins.
         * If the processor contains any asynchronous plugins
         * it will throw an error. This is why this method is only
         * for debug purpose, you should always use {@link LazyResult#then}.
         *
         * @type {string}
         * @see Result#content
         */

    }, {
        key: 'content',
        get: function get() {
            return this.stringify().content;
        }

        /**
         * Processes input CSS through synchronous plugins
         * and returns {@link Result#map}.
         *
         * This property will only work with synchronous plugins.
         * If the processor contains any asynchronous plugins
         * it will throw an error. This is why this method is only
         * for debug purpose, you should always use {@link LazyResult#then}.
         *
         * @type {SourceMapGenerator}
         * @see Result#map
         */

    }, {
        key: 'map',
        get: function get() {
            return this.stringify().map;
        }

        /**
         * Processes input CSS through synchronous plugins
         * and returns {@link Result#root}.
         *
         * This property will only work with synchronous plugins. If the processor
         * contains any asynchronous plugins it will throw an error.
         *
         * This is why this method is only for debug purpose,
         * you should always use {@link LazyResult#then}.
         *
         * @type {Root}
         * @see Result#root
         */

    }, {
        key: 'root',
        get: function get() {
            return this.sync().root;
        }

        /**
         * Processes input CSS through synchronous plugins
         * and returns {@link Result#messages}.
         *
         * This property will only work with synchronous plugins. If the processor
         * contains any asynchronous plugins it will throw an error.
         *
         * This is why this method is only for debug purpose,
         * you should always use {@link LazyResult#then}.
         *
         * @type {Message[]}
         * @see Result#messages
         */

    }, {
        key: 'messages',
        get: function get() {
            return this.sync().messages;
        }
    }]);
    return LazyResult;
}();

/**
 * @callback builder
 * @param {string} part          - part of generated CSS connected to this node
 * @param {Node}   node          - AST node
 * @param {"start"|"end"} [type] - node’s part type
 */

/**
 * @callback parser
 *
 * @param {string|toString} css   - string with input CSS or any object
 *                                  with toString() method, like a Buffer
 * @param {processOptions} [opts] - options with only `from` and `map` keys
 *
 * @return {Root} PostCSS AST
 */

/**
 * @callback stringifier
 *
 * @param {Node} node       - start node for stringifing. Usually {@link Root}.
 * @param {builder} builder - function to concatenate CSS from node’s parts
 *                            or generate string and source map
 *
 * @return {void}
 */

/**
 * @typedef {object} syntax
 * @property {parser} parse          - function to generate AST by string
 * @property {stringifier} stringify - function to generate string by AST
 */

/**
 * @typedef {object} toString
 * @property {function} toString
 */

/**
 * @callback pluginFunction
 * @param {Root} root     - parsed input CSS
 * @param {Result} result - result to set warnings or check other plugins
 */

/**
 * @typedef {object} Plugin
 * @property {function} postcss - PostCSS plugin function
 */

/**
 * @typedef {object} processOptions
 * @property {string} from             - the path of the CSS source file.
 *                                       You should always set `from`,
 *                                       because it is used in source map
 *                                       generation and syntax error messages.
 * @property {string} to               - the path where you’ll put the output
 *                                       CSS file. You should always set `to`
 *                                       to generate correct source maps.
 * @property {parser} parser           - function to generate AST by string
 * @property {stringifier} stringifier - class to generate string by AST
 * @property {syntax} syntax           - object with `parse` and `stringify`
 * @property {object} map              - source map options
 * @property {boolean} map.inline                    - does source map should
 *                                                     be embedded in the output
 *                                                     CSS as a base64-encoded
 *                                                     comment
 * @property {string|object|false|function} map.prev - source map content
 *                                                     from a previous
 *                                                     processing step
 *                                                     (for example, Sass).
 *                                                     PostCSS will try to find
 *                                                     previous map
 *                                                     automatically, so you
 *                                                     could disable it by
 *                                                     `false` value.
 * @property {boolean} map.sourcesContent            - does PostCSS should set
 *                                                     the origin content to map
 * @property {string|false} map.annotation           - does PostCSS should set
 *                                                     annotation comment to map
 * @property {string} map.from                       - override `from` in map’s
 *                                                     `sources`
 */

/**
 * Contains plugins to process CSS. Create one `Processor` instance,
 * initialize its plugins, and then use that instance on numerous CSS files.
 *
 * @example
 * const processor = postcss([autoprefixer, precss]);
 * processor.process(css1).then(result => console.log(result.css));
 * processor.process(css2).then(result => console.log(result.css));
 */

var Processor = function () {

  /**
   * @param {Array.<Plugin|pluginFunction>|Processor} plugins - PostCSS
   *        plugins. See {@link Processor#use} for plugin format.
   */
  function Processor() {
    var plugins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    classCallCheck(this, Processor);

    /**
     * @member {string} - Current PostCSS version.
     *
     * @example
     * if ( result.processor.version.split('.')[0] !== '5' ) {
     *   throw new Error('This plugin works only with PostCSS 5');
     * }
     */
    this.version = '5.2.0';
    /**
     * @member {pluginFunction[]} - Plugins added to this processor.
     *
     * @example
     * const processor = postcss([autoprefixer, precss]);
     * processor.plugins.length //=> 2
     */
    this.plugins = this.normalize(plugins);
  }

  /**
   * Adds a plugin to be used as a CSS processor.
   *
   * PostCSS plugin can be in 4 formats:
   * * A plugin created by {@link postcss.plugin} method.
   * * A function. PostCSS will pass the function a @{link Root}
   *   as the first argument and current {@link Result} instance
   *   as the second.
   * * An object with a `postcss` method. PostCSS will use that method
   *   as described in #2.
   * * Another {@link Processor} instance. PostCSS will copy plugins
   *   from that instance into this one.
   *
   * Plugins can also be added by passing them as arguments when creating
   * a `postcss` instance (see [`postcss(plugins)`]).
   *
   * Asynchronous plugins should return a `Promise` instance.
   *
   * @param {Plugin|pluginFunction|Processor} plugin - PostCSS plugin
   *                                                   or {@link Processor}
   *                                                   with plugins
   *
   * @example
   * const processor = postcss()
   *   .use(autoprefixer)
   *   .use(precss);
   *
   * @return {Processes} current processor to make methods chain
   */


  createClass(Processor, [{
    key: 'use',
    value: function use(plugin) {
      this.plugins = this.plugins.concat(this.normalize([plugin]));
      return this;
    }

    /**
     * Parses source CSS and returns a {@link LazyResult} Promise proxy.
     * Because some plugins can be asynchronous it doesn’t make
     * any transformations. Transformations will be applied
     * in the {@link LazyResult} methods.
     *
     * @param {string|toString|Result} css - String with input CSS or
     *                                       any object with a `toString()`
     *                                       method, like a Buffer.
     *                                       Optionally, send a {@link Result}
     *                                       instance and the processor will
     *                                       take the {@link Root} from it.
     * @param {processOptions} [opts]      - options
     *
     * @return {LazyResult} Promise proxy
     *
     * @example
     * processor.process(css, { from: 'a.css', to: 'a.out.css' })
     *   .then(result => {
     *      console.log(result.css);
     *   });
     */

  }, {
    key: 'process',
    value: function process(css) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return new LazyResult(this, css, opts);
    }
  }, {
    key: 'normalize',
    value: function normalize(plugins) {
      var normalized = [];
      plugins.forEach(function (i) {
        if (i.postcss) i = i.postcss;

        if ((typeof i === 'undefined' ? 'undefined' : _typeof(i)) === 'object' && Array.isArray(i.plugins)) {
          normalized = normalized.concat(i.plugins);
        } else if (typeof i === 'function') {
          normalized.push(i);
        } else {
          throw new Error(i + ' is not a PostCSS plugin');
        }
      });
      return normalized;
    }
  }]);
  return Processor;
}();

/**
 * Represents a CSS file and contains all its parsed nodes.
 *
 * @extends Container
 *
 * @example
 * const root = postcss.parse('a{color:black} b{z-index:2}');
 * root.type         //=> 'root'
 * root.nodes.length //=> 2
 */

var Root = function (_Container) {
    inherits(Root, _Container);

    function Root(defaults$$1) {
        classCallCheck(this, Root);

        var _this = possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).call(this, defaults$$1));

        _this.type = 'root';
        if (!_this.nodes) _this.nodes = [];
        return _this;
    }

    createClass(Root, [{
        key: 'removeChild',
        value: function removeChild(child) {
            child = this.index(child);

            if (child === 0 && this.nodes.length > 1) {
                this.nodes[1].raws.before = this.nodes[child].raws.before;
            }

            return get$1(Root.prototype.__proto__ || Object.getPrototypeOf(Root.prototype), 'removeChild', this).call(this, child);
        }
    }, {
        key: 'normalize',
        value: function normalize(child, sample, type) {
            var nodes = get$1(Root.prototype.__proto__ || Object.getPrototypeOf(Root.prototype), 'normalize', this).call(this, child);

            if (sample) {
                if (type === 'prepend') {
                    if (this.nodes.length > 1) {
                        sample.raws.before = this.nodes[1].raws.before;
                    } else {
                        delete sample.raws.before;
                    }
                } else if (this.first !== sample) {
                    nodes.forEach(function (node) {
                        node.raws.before = sample.raws.before;
                    });
                }
            }

            return nodes;
        }

        /**
         * Returns a {@link Result} instance representing the root’s CSS.
         *
         * @param {processOptions} [opts] - options with only `to` and `map` keys
         *
         * @return {Result} result with current root’s CSS
         *
         * @example
         * const root1 = postcss.parse(css1, { from: 'a.css' });
         * const root2 = postcss.parse(css2, { from: 'b.css' });
         * root1.append(root2);
         * const result = root1.toResult({ to: 'all.css', map: true });
         */

    }, {
        key: 'toResult',
        value: function toResult() {
            var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var lazy = new LazyResult(new Processor(), this, opts);
            return lazy.stringify();
        }
    }, {
        key: 'remove',
        value: function remove(child) {
            warnOnce('Root#remove is deprecated. Use Root#removeChild');
            this.removeChild(child);
        }
    }, {
        key: 'prevMap',
        value: function prevMap() {
            warnOnce('Root#prevMap is deprecated. Use Root#source.input.map');
            return this.source.input.map;
        }

        /**
         * @memberof Root#
         * @member {object} raws - Information to generate byte-to-byte equal
         *                         node string as it was in the origin input.
         *
         * Every parser saves its own properties,
         * but the default CSS parser uses:
         *
         * * `after`: the space symbols after the last child to the end of file.
         * * `semicolon`: is the last child has an (optional) semicolon.
         *
         * @example
         * postcss.parse('a {}\n').raws //=> { after: '\n' }
         * postcss.parse('a {}').raws   //=> { after: '' }
         */

    }]);
    return Root;
}(Container);

// import PreviousMap    from './previous-map';

var sequence = 0;

/**
 * @typedef  {object} filePosition
 * @property {string} file   - path to file
 * @property {number} line   - source line in file
 * @property {number} column - source column in file
 */

/**
 * Represents the source CSS.
 *
 * @example
 * const root  = postcss.parse(css, { from: file });
 * const input = root.source.input;
 */

var Input = function () {

    /**
     * @param {string} css    - input CSS source
     * @param {object} [opts] - {@link Processor#process} options
     */
    function Input(css) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        classCallCheck(this, Input);

        /**
         * @member {string} - input CSS source
         *
         * @example
         * const input = postcss.parse('a{}', { from: file }).input;
         * input.css //=> "a{}";
         */
        this.css = css.toString();

        if (this.css[0] === '\uFEFF' || this.css[0] === '\uFFFE') {
            this.css = this.css.slice(1);
        }

        if (opts.from) {
            if (/^\w+:\/\//.test(opts.from)) {
                /**
                 * @member {string} - The absolute path to the CSS source file
                 *                    defined with the `from` option.
                 *
                 * @example
                 * const root = postcss.parse(css, { from: 'a.css' });
                 * root.source.input.file //=> '/home/ai/a.css'
                 */
                this.file = opts.from;
            } else {
                this.file = path.resolve(opts.from);
            }
        }

        /*
                let map = new PreviousMap(this.css, opts);
                if ( map.text ) {
                    /!**
                     * @member {PreviousMap} - The input source map passed from
                     *                         a compilation step before PostCSS
                     *                         (for example, from Sass compiler).
                     *
                     * @example
                     * root.source.input.map.consumer().sources //=> ['a.sass']
                     *!/
                    this.map = map;
                    let file = map.consumer().file;
                    if ( !this.file && file ) this.file = this.mapResolve(file);
                }
        */

        if (!this.file) {
            sequence += 1;
            /**
             * @member {string} - The unique ID of the CSS source. It will be
             *                    created if `from` option is not provided
             *                    (because PostCSS does not know the file path).
             *
             * @example
             * const root = postcss.parse(css);
             * root.source.input.file //=> undefined
             * root.source.input.id   //=> "<input css 1>"
             */
            this.id = '<input css ' + sequence + '>';
        }
        if (this.map) this.map.file = this.from;
    }

    createClass(Input, [{
        key: 'error',
        value: function error(message, line, column) {
            var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            var result = void 0;
            var origin = this.origin(line, column);
            if (origin) {
                result = new CssSyntaxError(message, origin.line, origin.column, origin.source, origin.file, opts.plugin);
            } else {
                result = new CssSyntaxError(message, line, column, this.css, this.file, opts.plugin);
            }

            result.input = { line: line, column: column, source: this.css };
            if (this.file) result.input.file = this.file;

            return result;
        }

        /**
         * Reads the input source map and returns a symbol position
         * in the input source (e.g., in a Sass file that was compiled
         * to CSS before being passed to PostCSS).
         *
         * @param {number} line   - line in input CSS
         * @param {number} column - column in input CSS
         *
         * @return {filePosition} position in input source
         *
         * @example
         * root.source.input.origin(1, 1) //=> { file: 'a.css', line: 3, column: 1 }
         */

    }, {
        key: 'origin',
        value: function origin(line, column) {
            if (!this.map) return false;
            var consumer = this.map.consumer();

            var from = consumer.originalPositionFor({ line: line, column: column });
            if (!from.source) return false;

            var result = {
                file: this.mapResolve(from.source),
                line: from.line,
                column: from.column
            };

            var source = consumer.sourceContentFor(from.source);
            if (source) result.source = source;

            return result;
        }
    }, {
        key: 'mapResolve',
        value: function mapResolve(file) {
            if (/^\w+:\/\//.test(file)) {
                return file;
            } else {
                return path.resolve(this.map.consumer().sourceRoot || '.', file);
            }
        }

        /**
         * The CSS source identifier. Contains {@link Input#file} if the user
         * set the `from` option, or {@link Input#id} if they did not.
         * @type {string}
         *
         * @example
         * const root = postcss.parse(css, { from: 'a.css' });
         * root.source.input.from //=> "/home/ai/a.css"
         *
         * const root = postcss.parse(css);
         * root.source.input.from //=> "<input css 1>"
         */

    }, {
        key: 'from',
        get: function get() {
            return this.file || this.id;
        }
    }]);
    return Input;
}();

var SafeParser = function (_Parser) {
    inherits(SafeParser, _Parser);

    function SafeParser() {
        classCallCheck(this, SafeParser);
        return possibleConstructorReturn(this, (SafeParser.__proto__ || Object.getPrototypeOf(SafeParser)).apply(this, arguments));
    }

    createClass(SafeParser, [{
        key: 'tokenize',
        value: function tokenize() {
            this.tokens = tokenize$1(this.input, { ignoreErrors: true });
        }
    }, {
        key: 'comment',
        value: function comment(token) {
            var node = new Comment();
            this.init(node, token[2], token[3]);
            node.source.end = { line: token[4], column: token[5] };

            var text = token[1].slice(2);
            if (text.slice(-2) === '*/') text = text.slice(0, -2);

            if (/^\s*$/.test(text)) {
                node.text = '';
                node.raws.left = text;
                node.raws.right = '';
            } else {
                var match = text.match(/^(\s*)([^]*[^\s])(\s*)$/);
                node.text = match[2];
                node.raws.left = match[1];
                node.raws.right = match[3];
            }
        }
    }, {
        key: 'unclosedBracket',
        value: function unclosedBracket() {}
    }, {
        key: 'unknownWord',
        value: function unknownWord(start) {
            var buffer = this.tokens.slice(start, this.pos + 1);
            this.spaces += buffer.map(function (i) {
                return i[1];
            }).join('');
        }
    }, {
        key: 'unexpectedClose',
        value: function unexpectedClose() {
            this.current.raws.after += '}';
        }
    }, {
        key: 'doubleColon',
        value: function doubleColon() {}
    }, {
        key: 'unnamedAtrule',
        value: function unnamedAtrule(node) {
            node.name = '';
        }
    }, {
        key: 'precheckMissedSemicolon',
        value: function precheckMissedSemicolon(tokens) {
            var colon = this.colon(tokens);
            if (colon === false) return;

            var split = void 0;
            for (split = colon - 1; split >= 0; split--) {
                if (tokens[split][0] === 'word') break;
            }
            for (split -= 1; split >= 0; split--) {
                if (tokens[split][0] !== 'space') {
                    split += 1;
                    break;
                }
            }
            var other = tokens.splice(split, tokens.length - split);
            this.decl(other);
        }
    }, {
        key: 'checkMissedSemicolon',
        value: function checkMissedSemicolon() {}
    }, {
        key: 'endFile',
        value: function endFile() {
            if (this.current.nodes && this.current.nodes.length) {
                this.current.raws.semicolon = this.semicolon;
            }
            this.current.raws.after = (this.current.raws.after || '') + this.spaces;

            while (this.current.parent) {
                this.current = this.current.parent;
                this.current.raws.after = '';
            }
        }
    }]);
    return SafeParser;
}(Parser);

function safeParse(css, opts) {
    var input = new Input(css, opts);

    var parser = new SafeParser(input);
    parser.tokenize();
    parser.loop();

    return parser.root;
}

function selectors(parent, node) {
  var result = [];
  parent.selectors.forEach(function (i) {
    node.selectors.forEach(function (j) {
      if (j.indexOf('&') === -1) {
        result.push(i + ' ' + j);
      } else {
        result.push(j.replace(/&/g, i));
      }
    });
  });
  return result;
}

function pickComment(comment, after) {
  if (comment && comment.type === 'comment') {
    return comment.moveAfter(after);
  } else {
    return after;
  }
}

function atruleChilds(rule, atrule) {
  var children = [];
  atrule.each(function (child) {
    if (child.type === 'comment') {
      children.push(child);
    }
    if (child.type === 'decl') {
      children.push(child);
    } else if (child.type === 'rule') {
      child.selectors = selectors(rule, child);
    } else if (child.type === 'atrule') {
      atruleChilds(rule, child);
    }
  });
  if (children.length) {
    var clone = rule.clone({ nodes: [] });
    for (var i = 0; i < children.length; i++) {
      children[i].moveTo(clone);
    }atrule.prepend(clone);
  }
}

function processRule(rule, bubble) {
  var unwrapped = false;
  var after = rule;
  rule.each(function (child) {
    if (child.type === 'rule') {
      unwrapped = true;
      child.selectors = selectors(rule, child);
      after = pickComment(child.prev(), after);
      after = child.moveAfter(after);
    } else if (child.type === 'atrule') {
      if (bubble.indexOf(child.name) !== -1) {
        unwrapped = true;
        atruleChilds(rule, child);
        after = pickComment(child.prev(), after);
        after = child.moveAfter(after);
      }
    }
  });
  if (unwrapped) {
    rule.raws.semicolon = true;
    if (rule.nodes.length === 0) rule.remove();
  }
}

var bubble = ['media', 'supports', 'document'];

var process$2 = function process$2(node) {
  node.each(function (child) {
    if (child.type === 'rule') {
      processRule(child, bubble);
    } else if (child.type === 'atrule') {
      process$2(child);
    }
  });
};

/*

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance
- 'polyfills' on server side


// usage

import StyleSheet from 'glamor/lib/sheet'
let styleSheet = new StyleSheet()

styleSheet.inject()
- 'injects' the stylesheet into the page (or into memory if on server)

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents


*/

function last(arr) {
  return arr[arr.length - 1];
}

function sheetForTag(tag) {
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
}

var isBrowser = typeof document !== 'undefined';
var isDev = function (x) {
  return x === 'development' || !x;
}("development");
var isTest = "development" === 'test';

var oldIE = function () {
  if (isBrowser) {
    var div = document.createElement('div');
    div.innerHTML = '<!--[if lt IE 10]><i></i><![endif]-->';
    return div.getElementsByTagName('i').length === 1;
  }
}();

function makeStyleTag() {
  var tag = document.createElement('style');
  tag.type = 'text/css';
  tag.appendChild(document.createTextNode(''));
  (document.head || document.getElementsByTagName('head')[0]).appendChild(tag);
  return tag;
}

var StyleSheet$1 = function () {
  function StyleSheet() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$speedy = _ref.speedy,
        speedy = _ref$speedy === undefined ? !isDev && !isTest : _ref$speedy,
        _ref$maxLength = _ref.maxLength,
        maxLength = _ref$maxLength === undefined ? isBrowser && oldIE ? 4000 : 65000 : _ref$maxLength;

    classCallCheck(this, StyleSheet);

    this.isSpeedy = speedy; // the big drawback here is that the css won't be editable in devtools
    this.sheet = undefined;
    this.tags = [];
    this.maxLength = maxLength;
    this.ctr = 0;
  }

  createClass(StyleSheet, [{
    key: 'inject',
    value: function inject() {
      var _this = this;

      if (this.injected) {
        throw new Error('already injected stylesheet!');
      }
      if (isBrowser) {
        // this section is just weird alchemy I found online off many sources
        this.tags[0] = makeStyleTag();
        // this weirdness brought to you by firefox
        this.sheet = sheetForTag(this.tags[0]);
      } else {
        // server side 'polyfill'. just enough behavior to be useful.
        this.sheet = {
          cssRules: [],
          insertRule: function insertRule(rule) {
            // enough 'spec compliance' to be able to extract the rules later
            // in other words, just the cssText field
            var serverRule = { cssText: rule };
            _this.sheet.cssRules.push(serverRule);
            return { serverRule: serverRule, appendRule: function appendRule(newCss) {
                return serverRule.cssText += newCss;
              } };
          }
        };
      }
      this.injected = true;
    }
  }, {
    key: 'speedy',
    value: function speedy(bool) {
      if (this.ctr !== 0) {
        throw new Error('cannot change speedy mode after inserting any rule to sheet. Either call speedy(' + bool + ') earlier in your app, or call flush() before speedy(' + bool + ')');
      }
      this.isSpeedy = !!bool;
    }
  }, {
    key: '_insert',
    value: function _insert(rule) {
      // this weirdness for perf, and chrome's weird bug
      // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
      try {
        this.sheet.insertRule(rule, this.sheet.cssRules.length); // todo - correct index here
      } catch (e) {
        if (isDev) {
          // might need beter dx for this
          console.warn('whoops, illegal rule inserted', rule); //eslint-disable-line no-console
        }
      }
    }
  }, {
    key: 'insert',
    value: function insert(rule) {
      var insertedRule = void 0;

      if (isBrowser) {
        // this is the ultrafast version, works across browsers
        if (this.isSpeedy && this.sheet.insertRule) {
          this._insert(rule);
        } else {
          var textNode = document.createTextNode(rule);
          last(this.tags).appendChild(textNode);
          insertedRule = { textNode: textNode, appendRule: function appendRule(newCss) {
              return textNode.appendData(newCss);
            } };

          if (!this.isSpeedy) {
            // sighhh
            this.sheet = sheetForTag(last(this.tags));
          }
        }
      } else {
        // server side is pretty simple
        insertedRule = this.sheet.insertRule(rule);
      }

      this.ctr++;
      if (isBrowser && this.ctr % this.maxLength === 0) {
        this.tags.push(makeStyleTag());
        this.sheet = sheetForTag(last(this.tags));
      }
      return insertedRule;
    }
  }, {
    key: 'flush',
    value: function flush() {
      if (isBrowser) {
        this.tags.forEach(function (tag) {
          return tag.parentNode.removeChild(tag);
        });
        this.tags = [];
        this.sheet = null;
        this.ctr = 0;
        // todo - look for remnants in document.styleSheets
      } else {
        // simpler on server
        this.sheet.cssRules = [];
      }
      this.injected = false;
    }
  }, {
    key: 'rules',
    value: function rules() {
      if (!isBrowser) {
        return this.sheet.cssRules;
      }
      var arr = [];
      this.tags.forEach(function (tag) {
        return arr.splice.apply(arr, [arr.length, 0].concat(toConsumableArray(Array.from(sheetForTag(tag).cssRules))));
      });
      return arr;
    }
  }]);
  return StyleSheet;
}();

//      

/* Wraps glamor's stylesheet and exports a singleton for styled components
to use. */
var StyleSheet$$1 = function () {
  function StyleSheet$$1() {
    classCallCheck(this, StyleSheet$$1);

    /* Don't specify a maxLength for the global sheet, since these rules
     * are defined at initialization and should remain static after that */
    this.globalStyleSheet = new StyleSheet$1({ speedy: false });
    this.componentStyleSheet = new StyleSheet$1({ speedy: false, maxLength: 40 });
  }

  createClass(StyleSheet$$1, [{
    key: 'inject',
    value: function inject() {
      this.globalStyleSheet.inject();
      this.componentStyleSheet.inject();
    }
  }, {
    key: 'flush',
    value: function flush() {
      if (this.globalStyleSheet.sheet) this.globalStyleSheet.flush();
      if (this.componentStyleSheet.sheet) this.componentStyleSheet.flush();
    }
  }, {
    key: 'insert',
    value: function insert(rule) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { global: false };

      var sheet = opts.global ? this.globalStyleSheet : this.componentStyleSheet;
      return sheet.insert(rule);
    }
  }, {
    key: 'rules',
    value: function rules() {
      return this.globalStyleSheet.rules().concat(this.componentStyleSheet.rules());
    }
  }, {
    key: 'injected',
    get: function get() {
      return this.globalStyleSheet.injected && this.componentStyleSheet.injected;
    }
  }]);
  return StyleSheet$$1;
}();

/* Export stylesheet as a singleton class */


var styleSheet = new StyleSheet$$1();

//      
var ComponentStyle = function () {
  function ComponentStyle(rules, selector) {
    classCallCheck(this, ComponentStyle);

    this.rules = rules;
    this.selector = selector;
  }

  createClass(ComponentStyle, [{
    key: 'generateAndInject',
    value: function generateAndInject() {
      if (!styleSheet.injected) styleSheet.inject();
      var flatCSS = flatten(this.rules).join('');
      if (this.selector) {
        flatCSS = this.selector + ' {' + flatCSS + '\n}';
      }
      var root = safeParse(flatCSS);
      process$2(root);
      styleSheet.insert(root.toResult().css, { global: true });
    }
  }]);
  return ComponentStyle;
}();

//      
var injectGlobal = function injectGlobal(strings) {
  for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key];
  }

  var globalStyle = new ComponentStyle(css.apply(undefined, [strings].concat(interpolations)));
  globalStyle.generateAndInject();
};

//      
/* Trying to avoid the unknown-prop errors on styled components
 by filtering by React's attribute whitelist.
 */

/* Logic copied from ReactDOMUnknownPropertyHook */
var reactProps = {
  children: true,
  dangerouslySetInnerHTML: true,
  key: true,
  ref: true,
  autoFocus: true,
  defaultValue: true,
  valueLink: true,
  defaultChecked: true,
  checkedLink: true,
  innerHTML: true,
  suppressContentEditableWarning: true,
  onFocusIn: true,
  onFocusOut: true,
  className: true,

  /* List copied from https://facebook.github.io/react/docs/events.html */
  onCopy: true,
  onCut: true,
  onPaste: true,
  onCompositionEnd: true,
  onCompositionStart: true,
  onCompositionUpdate: true,
  onKeyDown: true,
  onKeyPress: true,
  onKeyUp: true,
  onFocus: true,
  onBlur: true,
  onChange: true,
  onInput: true,
  onSubmit: true,
  onClick: true,
  onContextMenu: true,
  onDoubleClick: true,
  onDrag: true,
  onDragEnd: true,
  onDragEnter: true,
  onDragExit: true,
  onDragLeave: true,
  onDragOver: true,
  onDragStart: true,
  onDrop: true,
  onMouseDown: true,
  onMouseEnter: true,
  onMouseLeave: true,
  onMouseMove: true,
  onMouseOut: true,
  onMouseOver: true,
  onMouseUp: true,
  onSelect: true,
  onTouchCancel: true,
  onTouchEnd: true,
  onTouchMove: true,
  onTouchStart: true,
  onScroll: true,
  onWheel: true,
  onAbort: true,
  onCanPlay: true,
  onCanPlayThrough: true,
  onDurationChange: true,
  onEmptied: true,
  onEncrypted: true,
  onEnded: true,
  onError: true,
  onLoadedData: true,
  onLoadedMetadata: true,
  onLoadStart: true,
  onPause: true,
  onPlay: true,
  onPlaying: true,
  onProgress: true,
  onRateChange: true,
  onSeeked: true,
  onSeeking: true,
  onStalled: true,
  onSuspend: true,
  onTimeUpdate: true,
  onVolumeChange: true,
  onWaiting: true,
  onLoad: true,
  onAnimationStart: true,
  onAnimationEnd: true,
  onAnimationIteration: true,
  onTransitionEnd: true,

  onCopyCapture: true,
  onCutCapture: true,
  onPasteCapture: true,
  onCompositionEndCapture: true,
  onCompositionStartCapture: true,
  onCompositionUpdateCapture: true,
  onKeyDownCapture: true,
  onKeyPressCapture: true,
  onKeyUpCapture: true,
  onFocusCapture: true,
  onBlurCapture: true,
  onChangeCapture: true,
  onInputCapture: true,
  onSubmitCapture: true,
  onClickCapture: true,
  onContextMenuCapture: true,
  onDoubleClickCapture: true,
  onDragCapture: true,
  onDragEndCapture: true,
  onDragEnterCapture: true,
  onDragExitCapture: true,
  onDragLeaveCapture: true,
  onDragOverCapture: true,
  onDragStartCapture: true,
  onDropCapture: true,
  onMouseDownCapture: true,
  onMouseEnterCapture: true,
  onMouseLeaveCapture: true,
  onMouseMoveCapture: true,
  onMouseOutCapture: true,
  onMouseOverCapture: true,
  onMouseUpCapture: true,
  onSelectCapture: true,
  onTouchCancelCapture: true,
  onTouchEndCapture: true,
  onTouchMoveCapture: true,
  onTouchStartCapture: true,
  onScrollCapture: true,
  onWheelCapture: true,
  onAbortCapture: true,
  onCanPlayCapture: true,
  onCanPlayThroughCapture: true,
  onDurationChangeCapture: true,
  onEmptiedCapture: true,
  onEncryptedCapture: true,
  onEndedCapture: true,
  onErrorCapture: true,
  onLoadedDataCapture: true,
  onLoadedMetadataCapture: true,
  onLoadStartCapture: true,
  onPauseCapture: true,
  onPlayCapture: true,
  onPlayingCapture: true,
  onProgressCapture: true,
  onRateChangeCapture: true,
  onSeekedCapture: true,
  onSeekingCapture: true,
  onStalledCapture: true,
  onSuspendCapture: true,
  onTimeUpdateCapture: true,
  onVolumeChangeCapture: true,
  onWaitingCapture: true,
  onLoadCapture: true,
  onAnimationStartCapture: true,
  onAnimationEndCapture: true,
  onAnimationIterationCapture: true,
  onTransitionEndCapture: true
};

/* From HTMLDOMPropertyConfig */
var htmlProps = {
  /**
   * Standard Properties
   */
  accept: true,
  acceptCharset: true,
  accessKey: true,
  action: true,
  allowFullScreen: true,
  allowTransparency: true,
  alt: true,
  // specifies target context for links with `preload` type
  as: true,
  async: true,
  autoComplete: true,
  // autoFocus is polyfilled/normalized by AutoFocusUtils
  // autoFocus: true,
  autoPlay: true,
  capture: true,
  cellPadding: true,
  cellSpacing: true,
  charSet: true,
  challenge: true,
  checked: true,
  cite: true,
  classID: true,
  className: true,
  cols: true,
  colSpan: true,
  content: true,
  contentEditable: true,
  contextMenu: true,
  controls: true,
  coords: true,
  crossOrigin: true,
  data: true, // For `<object />` acts as `src`.
  dateTime: true,
  default: true,
  defer: true,
  dir: true,
  disabled: true,
  download: true,
  draggable: true,
  encType: true,
  form: true,
  formAction: true,
  formEncType: true,
  formMethod: true,
  formNoValidate: true,
  formTarget: true,
  frameBorder: true,
  headers: true,
  height: true,
  hidden: true,
  high: true,
  href: true,
  hrefLang: true,
  htmlFor: true,
  httpEquiv: true,
  icon: true,
  id: true,
  inputMode: true,
  integrity: true,
  is: true,
  keyParams: true,
  keyType: true,
  kind: true,
  label: true,
  lang: true,
  list: true,
  loop: true,
  low: true,
  manifest: true,
  marginHeight: true,
  marginWidth: true,
  max: true,
  maxLength: true,
  media: true,
  mediaGroup: true,
  method: true,
  min: true,
  minLength: true,
  // Caution; `option.selected` is not updated if `select.multiple` is
  // disabled with `removeAttribute`.
  multiple: true,
  muted: true,
  name: true,
  nonce: true,
  noValidate: true,
  open: true,
  optimum: true,
  pattern: true,
  placeholder: true,
  playsInline: true,
  poster: true,
  preload: true,
  profile: true,
  radioGroup: true,
  readOnly: true,
  referrerPolicy: true,
  rel: true,
  required: true,
  reversed: true,
  role: true,
  rows: true,
  rowSpan: true,
  sandbox: true,
  scope: true,
  scoped: true,
  scrolling: true,
  seamless: true,
  selected: true,
  shape: true,
  size: true,
  sizes: true,
  span: true,
  spellCheck: true,
  src: true,
  srcDoc: true,
  srcLang: true,
  srcSet: true,
  start: true,
  step: true,
  style: true,
  summary: true,
  tabIndex: true,
  target: true,
  title: true,
  // Setting .type throws on non-<input> tags
  type: true,
  useMap: true,
  value: true,
  width: true,
  wmode: true,
  wrap: true,

  /**
   * RDFa Properties
   */
  about: true,
  datatype: true,
  inlist: true,
  prefix: true,
  // property is also supported for OpenGraph in meta tags.
  property: true,
  resource: true,
  typeof: true,
  vocab: true,

  /**
   * Non-standard Properties
   */
  // autoCapitalize and autoCorrect are supported in Mobile Safari for
  // keyboard hints.
  autoCapitalize: true,
  autoCorrect: true,
  // autoSave allows WebKit/Blink to persist values of input fields on page reloads
  autoSave: true,
  // color is for Safari mask-icon link
  color: true,
  // itemProp, itemScope, itemType are for
  // Microdata support. See http://schema.org/docs/gs.html
  itemProp: true,
  itemScope: true,
  itemType: true,
  // itemID and itemRef are for Microdata support as well but
  // only specified in the WHATWG spec document. See
  // https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
  itemID: true,
  itemRef: true,
  // results show looking glass icon and recent searches on input
  // search fields in WebKit/Blink
  results: true,
  // IE-only attribute that specifies security restrictions on an iframe
  // as an alternative to the sandbox attribute on IE<10
  security: true,
  // IE-only attribute that controls focus behavior
  unselectable: 0
};

var svgProps = {
  accentHeight: true,
  accumulate: true,
  additive: true,
  alignmentBaseline: true,
  allowReorder: true,
  alphabetic: true,
  amplitude: true,
  arabicForm: true,
  ascent: true,
  attributeName: true,
  attributeType: true,
  autoReverse: true,
  azimuth: true,
  baseFrequency: true,
  baseProfile: true,
  baselineShift: true,
  bbox: true,
  begin: true,
  bias: true,
  by: true,
  calcMode: true,
  capHeight: true,
  clip: true,
  clipPath: true,
  clipRule: true,
  clipPathUnits: true,
  colorInterpolation: true,
  colorInterpolationFilters: true,
  colorProfile: true,
  colorRendering: true,
  contentScriptType: true,
  contentStyleType: true,
  cursor: true,
  cx: true,
  cy: true,
  d: true,
  decelerate: true,
  descent: true,
  diffuseConstant: true,
  direction: true,
  display: true,
  divisor: true,
  dominantBaseline: true,
  dur: true,
  dx: true,
  dy: true,
  edgeMode: true,
  elevation: true,
  enableBackground: true,
  end: true,
  exponent: true,
  externalResourcesRequired: true,
  fill: true,
  fillOpacity: true,
  fillRule: true,
  filter: true,
  filterRes: true,
  filterUnits: true,
  floodColor: true,
  floodOpacity: true,
  focusable: true,
  fontFamily: true,
  fontSize: true,
  fontSizeAdjust: true,
  fontStretch: true,
  fontStyle: true,
  fontVariant: true,
  fontWeight: true,
  format: true,
  from: true,
  fx: true,
  fy: true,
  g1: true,
  g2: true,
  glyphName: true,
  glyphOrientationHorizontal: true,
  glyphOrientationVertical: true,
  glyphRef: true,
  gradientTransform: true,
  gradientUnits: true,
  hanging: true,
  horizAdvX: true,
  horizOriginX: true,
  ideographic: true,
  imageRendering: true,
  in: true,
  in2: true,
  intercept: true,
  k: true,
  k1: true,
  k2: true,
  k3: true,
  k4: true,
  kernelMatrix: true,
  kernelUnitLength: true,
  kerning: true,
  keyPoints: true,
  keySplines: true,
  keyTimes: true,
  lengthAdjust: true,
  letterSpacing: true,
  lightingColor: true,
  limitingConeAngle: true,
  local: true,
  markerEnd: true,
  markerMid: true,
  markerStart: true,
  markerHeight: true,
  markerUnits: true,
  markerWidth: true,
  mask: true,
  maskContentUnits: true,
  maskUnits: true,
  mathematical: true,
  mode: true,
  numOctaves: true,
  offset: true,
  opacity: true,
  operator: true,
  order: true,
  orient: true,
  orientation: true,
  origin: true,
  overflow: true,
  overlinePosition: true,
  overlineThickness: true,
  paintOrder: true,
  panose1: true,
  pathLength: true,
  patternContentUnits: true,
  patternTransform: true,
  patternUnits: true,
  pointerEvents: true,
  points: true,
  pointsAtX: true,
  pointsAtY: true,
  pointsAtZ: true,
  preserveAlpha: true,
  preserveAspectRatio: true,
  primitiveUnits: true,
  r: true,
  radius: true,
  refX: true,
  refY: true,
  renderingIntent: true,
  repeatCount: true,
  repeatDur: true,
  requiredExtensions: true,
  requiredFeatures: true,
  restart: true,
  result: true,
  rotate: true,
  rx: true,
  ry: true,
  scale: true,
  seed: true,
  shapeRendering: true,
  slope: true,
  spacing: true,
  specularConstant: true,
  specularExponent: true,
  speed: true,
  spreadMethod: true,
  startOffset: true,
  stdDeviation: true,
  stemh: true,
  stemv: true,
  stitchTiles: true,
  stopColor: true,
  stopOpacity: true,
  strikethroughPosition: true,
  strikethroughThickness: true,
  string: true,
  stroke: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeLinecap: true,
  strokeLinejoin: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true,
  surfaceScale: true,
  systemLanguage: true,
  tableValues: true,
  targetX: true,
  targetY: true,
  textAnchor: true,
  textDecoration: true,
  textRendering: true,
  textLength: true,
  to: true,
  transform: true,
  u1: true,
  u2: true,
  underlinePosition: true,
  underlineThickness: true,
  unicode: true,
  unicodeBidi: true,
  unicodeRange: true,
  unitsPerEm: true,
  vAlphabetic: true,
  vHanging: true,
  vIdeographic: true,
  vMathematical: true,
  values: true,
  vectorEffect: true,
  version: true,
  vertAdvY: true,
  vertOriginX: true,
  vertOriginY: true,
  viewBox: true,
  viewTarget: true,
  visibility: true,
  widths: true,
  wordSpacing: true,
  writingMode: true,
  x: true,
  xHeight: true,
  x1: true,
  x2: true,
  xChannelSelector: true,
  xlinkActuate: true,
  xlinkArcrole: true,
  xlinkHref: true,
  xlinkRole: true,
  xlinkShow: true,
  xlinkTitle: true,
  xlinkType: true,
  xmlBase: true,
  xmlns: true,
  xmlnsXlink: true,
  xmlLang: true,
  xmlSpace: true,
  y: true,
  y1: true,
  y2: true,
  yChannelSelector: true,
  z: true,
  zoomAndPan: true
};

/* From DOMProperty */
var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
var isCustomAttribute = RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$'));

var hasOwnProperty = {}.hasOwnProperty;
var validAttr = (function (name) {
  return hasOwnProperty.call(htmlProps, name) || hasOwnProperty.call(svgProps, name) || isCustomAttribute(name.toLowerCase()) || hasOwnProperty.call(reactProps, name);
});

//      


function isTag(target) /* : %checks */{
  return typeof target === 'string';
}

var index$7 = isFunction;

var toString$1 = Object.prototype.toString;

function isFunction(fn) {
  var string = toString$1.call(fn);
  return string === '[object Function]' || typeof fn === 'function' && string !== '[object RegExp]' || typeof window !== 'undefined' && (
  // IE8 and below
  fn === window.setTimeout || fn === window.alert || fn === window.confirm || fn === window.prompt);
}

//      
/**
 * Creates a broadcast that can be listened to, i.e. simple event emitter
 *
 * @see https://github.com/ReactTraining/react-broadcast
 */

var createBroadcast = function createBroadcast(initialValue) {
  var listeners = [];
  var currentValue = initialValue;

  return {
    publish: function publish(value) {
      currentValue = value;
      listeners.forEach(function (listener) {
        return listener(currentValue);
      });
    },
    subscribe: function subscribe(listener) {
      listeners.push(listener);

      // Publish to this subscriber once immediately.
      listener(currentValue);

      return function () {
        listeners = listeners.filter(function (item) {
          return item !== listener;
        });
      };
    }
  };
};

//      
/* globals React$Element */
// NOTE: DO NOT CHANGE, changing this is a semver major change!
var CHANNEL = '__styled-components__';

/**
 * Provide a theme to an entire react component tree via context and event listeners (have to do
 * both context and event emitter as pure components block context updates)
 */

var ThemeProvider = function (_Component) {
  inherits(ThemeProvider, _Component);

  function ThemeProvider() {
    classCallCheck(this, ThemeProvider);

    var _this = possibleConstructorReturn(this, (ThemeProvider.__proto__ || Object.getPrototypeOf(ThemeProvider)).call(this));

    _this.getTheme = _this.getTheme.bind(_this);
    return _this;
  }

  createClass(ThemeProvider, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      // If there is a ThemeProvider wrapper anywhere around this theme provider, merge this theme
      // with the outer theme
      if (this.context[CHANNEL]) {
        var subscribe = this.context[CHANNEL];
        this.unsubscribeToOuter = subscribe(function (theme) {
          _this2.outerTheme = theme;
        });
      }
      this.broadcast = createBroadcast(this.getTheme());
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return _extends({}, this.context, defineProperty({}, CHANNEL, this.broadcast.subscribe));
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.theme !== nextProps.theme) this.broadcast.publish(this.getTheme(nextProps.theme));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.context[CHANNEL]) {
        this.unsubscribeToOuter();
      }
    }

    // Get the theme from the props, supporting both (outerTheme) => {} as well as object notation

  }, {
    key: 'getTheme',
    value: function getTheme(passedTheme) {
      var theme = passedTheme || this.props.theme;
      if (index$7(theme)) {
        var mergedTheme = theme(this.outerTheme);
        if (!index$1(mergedTheme)) {
          throw new Error('[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!');
        }
        return mergedTheme;
      }
      if (!index$1(theme)) {
        throw new Error('[ThemeProvider] Please make your theme prop a plain object');
      }
      return _extends({}, this.outerTheme, theme);
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.children) {
        return null;
      }
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.only(this.props.children);
    }
  }]);
  return ThemeProvider;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

ThemeProvider.childContextTypes = defineProperty({}, CHANNEL, __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func.isRequired);
ThemeProvider.contextTypes = defineProperty({}, CHANNEL, __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func);

//      
var AbstractStyledComponent = function (_Component) {
  inherits(AbstractStyledComponent, _Component);

  function AbstractStyledComponent() {
    classCallCheck(this, AbstractStyledComponent);
    return possibleConstructorReturn(this, (AbstractStyledComponent.__proto__ || Object.getPrototypeOf(AbstractStyledComponent)).apply(this, arguments));
  }

  return AbstractStyledComponent;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

AbstractStyledComponent.contextTypes = defineProperty({}, CHANNEL, __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func);

//      

var _styledComponent = (function (ComponentStyle) {
  // eslint-disable-next-line no-undef
  var createStyledComponent = function createStyledComponent(target, rules, parent) {
    /* Handle styled(OtherStyledComponent) differently */
    var isStyledComponent = AbstractStyledComponent.isPrototypeOf(target);
    if (!isTag(target) && isStyledComponent) {
      return createStyledComponent(target.target, target.rules.concat(rules), target);
    }

    var componentStyle = new ComponentStyle(rules);
    var ParentComponent = parent || AbstractStyledComponent;

    var StyledComponent = function (_ParentComponent) {
      inherits(StyledComponent, _ParentComponent);

      function StyledComponent() {
        classCallCheck(this, StyledComponent);

        var _this = possibleConstructorReturn(this, (StyledComponent.__proto__ || Object.getPrototypeOf(StyledComponent)).call(this));

        _this.state = {
          theme: null,
          generatedClassName: ''
        };
        return _this;
      }

      createClass(StyledComponent, [{
        key: 'generateAndInjectStyles',
        value: function generateAndInjectStyles(theme, props) {
          var executionContext = _extends({}, props, { theme: theme });
          return componentStyle.generateAndInjectStyles(executionContext);
        }
      }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
          var _this2 = this;

          // If there is a theme in the context, subscribe to the event emitter. This
          // is necessary due to pure components blocking context updates, this circumvents
          // that by updating when an event is emitted
          if (this.context[CHANNEL]) {
            var subscribe = this.context[CHANNEL];
            this.unsubscribe = subscribe(function (nextTheme) {
              // This will be called once immediately

              // Props should take precedence over ThemeProvider, which should take precedence over
              // defaultProps, but React automatically puts defaultProps on props.
              var defaultProps = _this2.constructor.defaultProps;

              var isDefaultTheme = defaultProps && _this2.props.theme === defaultProps.theme;
              var theme = _this2.props.theme && !isDefaultTheme ? _this2.props.theme : nextTheme;
              var generatedClassName = _this2.generateAndInjectStyles(theme, _this2.props);
              _this2.setState({ theme: theme, generatedClassName: generatedClassName });
            });
          } else {
            var theme = this.props.theme || {};
            var generatedClassName = this.generateAndInjectStyles(theme, this.props);
            this.setState({ theme: theme, generatedClassName: generatedClassName });
          }
        }
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          var _this3 = this;

          this.setState(function (oldState) {
            // Props should take precedence over ThemeProvider, which should take precedence over
            // defaultProps, but React automatically puts defaultProps on props.
            var defaultProps = _this3.constructor.defaultProps;

            var isDefaultTheme = defaultProps && nextProps.theme === defaultProps.theme;
            var theme = nextProps.theme && !isDefaultTheme ? nextProps.theme : oldState.theme;
            var generatedClassName = _this3.generateAndInjectStyles(theme, nextProps);

            return { theme: theme, generatedClassName: generatedClassName };
          });
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          if (this.unsubscribe) {
            this.unsubscribe();
          }
        }
      }, {
        key: 'render',
        value: function render() {
          var _this4 = this;

          var _props = this.props,
              className = _props.className,
              children = _props.children,
              innerRef = _props.innerRef;
          var generatedClassName = this.state.generatedClassName;


          var propsForElement = {};
          /* Don't pass through non HTML tags through to HTML elements */
          Object.keys(this.props).filter(function (propName) {
            return !isTag(target) || validAttr(propName);
          }).forEach(function (propName) {
            propsForElement[propName] = _this4.props[propName];
          });
          propsForElement.className = [className, generatedClassName].filter(function (x) {
            return x;
          }).join(' ');
          if (innerRef) {
            propsForElement.ref = innerRef;
            if (isTag(target)) delete propsForElement.innerRef;
          }

          return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(target, propsForElement, children);
        }
      }]);
      return StyledComponent;
    }(ParentComponent);

    StyledComponent.contextTypes = ParentComponent.contextTypes;


    StyledComponent.target = target;
    StyledComponent.rules = rules;

    StyledComponent.displayName = isTag(target) ? 'styled.' + target : 'Styled(' + (target.displayName || target.name || 'Component') + ')';

    return StyledComponent;
  };

  return createStyledComponent;
});

//      
// Thanks to ReactDOMFactories for this handy list!

var domElements = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr',

// SVG
'circle', 'clipPath', 'defs', 'ellipse', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

//      
var _styled = (function (styledComponent) {
  var styled = function styled(tag) {
    return function (strings) {
      for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        interpolations[_key - 1] = arguments[_key];
      }

      return styledComponent(tag, css.apply(undefined, [strings].concat(interpolations)));
    };
  };

  // Shorthands for all valid HTML Elements
  domElements.forEach(function (domElement) {
    styled[domElement] = styled(domElement);
  });

  return styled;
});

function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var hash = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = doHash;
  // murmurhash2 via https://gist.github.com/raycmorgan/588423

  function doHash(str, seed) {
    var m = 0x5bd1e995;
    var r = 24;
    var h = seed ^ str.length;
    var length = str.length;
    var currentIndex = 0;

    while (length >= 4) {
      var k = UInt32(str, currentIndex);

      k = Umul32(k, m);
      k ^= k >>> r;
      k = Umul32(k, m);

      h = Umul32(h, m);
      h ^= k;

      currentIndex += 4;
      length -= 4;
    }

    switch (length) {
      case 3:
        h ^= UInt16(str, currentIndex);
        h ^= str.charCodeAt(currentIndex + 2) << 16;
        h = Umul32(h, m);
        break;

      case 2:
        h ^= UInt16(str, currentIndex);
        h = Umul32(h, m);
        break;

      case 1:
        h ^= str.charCodeAt(currentIndex);
        h = Umul32(h, m);
        break;
    }

    h ^= h >>> 13;
    h = Umul32(h, m);
    h ^= h >>> 15;

    return h >>> 0;
  }

  function UInt32(str, pos) {
    return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8) + (str.charCodeAt(pos++) << 16) + (str.charCodeAt(pos) << 24);
  }

  function UInt16(str, pos) {
    return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8);
  }

  function Umul32(n, m) {
    n = n | 0;
    m = m | 0;
    var nlo = n & 0xffff;
    var nhi = n >>> 16;
    var res = nlo * m + ((nhi * m & 0xffff) << 16) | 0;
    return res;
  }
});

var hashStr = unwrapExports(hash);

//      
var replaceWhitespace = function replaceWhitespace(str) {
  return str.replace(/\s|\\n/g, '');
};

var _keyframes = (function (nameGenerator) {
  return function (strings) {
    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    var rules = css.apply(undefined, [strings].concat(interpolations));
    var hash = hashStr(replaceWhitespace(JSON.stringify(rules)));
    var name = nameGenerator(hash);
    var keyframes = new ComponentStyle(rules, '@keyframes ' + name);
    keyframes.generateAndInject();
    return name;
  };
});

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

var _hyphenPattern = /-(.)/g;

/**
 * Camelcases a hyphenated string, for example:
 *
 *   > camelize('background-color')
 *   < "backgroundColor"
 *
 * @param {string} string
 * @return {string}
 */
function camelize$1(string) {
  return string.replace(_hyphenPattern, function (_, character) {
    return character.toUpperCase();
  });
}

var camelize_1 = camelize$1;

var camelize = camelize_1;

var msPattern$1 = /^-ms-/;

/**
 * Camelcases a hyphenated CSS property name, for example:
 *
 *   > camelizeStyleName('background-color')
 *   < "backgroundColor"
 *   > camelizeStyleName('-moz-transition')
 *   < "MozTransition"
 *   > camelizeStyleName('-ms-transition')
 *   < "msTransition"
 *
 * As Andi Smith suggests
 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
 * is converted to lowercase `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function camelizeStyleName(string) {
  return camelize(string.replace(msPattern$1, 'ms-'));
}

var camelizeStyleName_1 = camelizeStyleName;

var prefixProps = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = { "Webkit": { "transform": true, "transformOrigin": true, "transformOriginX": true, "transformOriginY": true, "backfaceVisibility": true, "perspective": true, "perspectiveOrigin": true, "transformStyle": true, "transformOriginZ": true, "animation": true, "animationDelay": true, "animationDirection": true, "animationFillMode": true, "animationDuration": true, "animationIterationCount": true, "animationName": true, "animationPlayState": true, "animationTimingFunction": true, "appearance": true, "userSelect": true, "fontKerning": true, "textEmphasisPosition": true, "textEmphasis": true, "textEmphasisStyle": true, "textEmphasisColor": true, "boxDecorationBreak": true, "clipPath": true, "maskImage": true, "maskMode": true, "maskRepeat": true, "maskPosition": true, "maskClip": true, "maskOrigin": true, "maskSize": true, "maskComposite": true, "mask": true, "maskBorderSource": true, "maskBorderMode": true, "maskBorderSlice": true, "maskBorderWidth": true, "maskBorderOutset": true, "maskBorderRepeat": true, "maskBorder": true, "maskType": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "filter": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true, "flex": true, "flexBasis": true, "flexDirection": true, "flexGrow": true, "flexFlow": true, "flexShrink": true, "flexWrap": true, "alignContent": true, "alignItems": true, "alignSelf": true, "justifyContent": true, "order": true, "transition": true, "transitionDelay": true, "transitionDuration": true, "transitionProperty": true, "transitionTimingFunction": true, "backdropFilter": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "shapeImageThreshold": true, "shapeImageMargin": true, "shapeImageOutside": true, "hyphens": true, "flowInto": true, "flowFrom": true, "regionFragment": true, "textSizeAdjust": true }, "Moz": { "appearance": true, "userSelect": true, "boxSizing": true, "textAlignLast": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "tabSize": true, "hyphens": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true }, "ms": { "flex": true, "flexBasis": false, "flexDirection": true, "flexGrow": false, "flexFlow": true, "flexShrink": false, "flexWrap": true, "alignContent": false, "alignItems": false, "alignSelf": false, "justifyContent": false, "order": false, "transform": true, "transformOrigin": true, "transformOriginX": true, "transformOriginY": true, "userSelect": true, "wrapFlow": true, "wrapThrough": true, "wrapMargin": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "touchAction": true, "hyphens": true, "flowInto": true, "flowFrom": true, "breakBefore": true, "breakAfter": true, "breakInside": true, "regionFragment": true, "gridTemplateColumns": true, "gridTemplateRows": true, "gridTemplateAreas": true, "gridTemplate": true, "gridAutoColumns": true, "gridAutoRows": true, "gridAutoFlow": true, "grid": true, "gridRowStart": true, "gridColumnStart": true, "gridRowEnd": true, "gridRow": true, "gridColumn": true, "gridColumnEnd": true, "gridColumnGap": true, "gridRowGap": true, "gridArea": true, "gridGap": true, "textSizeAdjust": true } };
  module.exports = exports["default"];
});

var capitalizeString = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  // helper to capitalize strings

  exports.default = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  module.exports = exports["default"];
});

var isPrefixedProperty = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (property) {
    return property.match(/^(Webkit|Moz|O|ms)/) !== null;
  };

  module.exports = exports["default"];
});

var sortPrefixedStyle_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = sortPrefixedStyle;

  var _isPrefixedProperty = isPrefixedProperty;

  var _isPrefixedProperty2 = _interopRequireDefault(_isPrefixedProperty);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function sortPrefixedStyle(style) {
    return Object.keys(style).sort(function (left, right) {
      if ((0, _isPrefixedProperty2.default)(left) && !(0, _isPrefixedProperty2.default)(right)) {
        return -1;
      } else if (!(0, _isPrefixedProperty2.default)(left) && (0, _isPrefixedProperty2.default)(right)) {
        return 1;
      }
      return 0;
    }).reduce(function (sortedStyle, prop) {
      sortedStyle[prop] = style[prop];
      return sortedStyle;
    }, {});
  }
  module.exports = exports['default'];
});

var position_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = position;
  function position(property, value) {
    if (property === 'position' && value === 'sticky') {
      return { position: ['-webkit-sticky', 'sticky'] };
    }
  }
  module.exports = exports['default'];
});

var joinPrefixedValue = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }

  // returns a style object with a single concated prefixed value string

  exports.default = function (property, value) {
    var replacer = arguments.length <= 2 || arguments[2] === undefined ? function (prefix, value) {
      return prefix + value;
    } : arguments[2];
    return _defineProperty({}, property, ['-webkit-', '-moz-', ''].map(function (prefix) {
      return replacer(prefix, value);
    }));
  };

  module.exports = exports['default'];
});

var isPrefixedValue = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (value) {
    if (Array.isArray(value)) value = value.join(',');

    return value.match(/-webkit-|-moz-|-ms-/) !== null;
  };

  module.exports = exports['default'];
});

var calc_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = calc;

  var _joinPrefixedValue = joinPrefixedValue;

  var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);

  var _isPrefixedValue = isPrefixedValue;

  var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function calc(property, value) {
    if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('calc(') > -1) {
      return (0, _joinPrefixedValue2.default)(property, value, function (prefix, value) {
        return value.replace(/calc\(/g, prefix + 'calc(');
      });
    }
  }
  module.exports = exports['default'];
});

var cursor_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = cursor;

  var _joinPrefixedValue = joinPrefixedValue;

  var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var values = {
    'zoom-in': true,
    'zoom-out': true,
    grab: true,
    grabbing: true
  };

  function cursor(property, value) {
    if (property === 'cursor' && values[value]) {
      return (0, _joinPrefixedValue2.default)(property, value);
    }
  }
  module.exports = exports['default'];
});

var flex_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = flex;
  var values = { flex: true, 'inline-flex': true };

  function flex(property, value) {
    if (property === 'display' && values[value]) {
      return {
        display: ['-webkit-box', '-moz-box', '-ms-' + value + 'box', '-webkit-' + value, value]
      };
    }
  }
  module.exports = exports['default'];
});

var sizing_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = sizing;

  var _joinPrefixedValue = joinPrefixedValue;

  var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var properties = {
    maxHeight: true,
    maxWidth: true,
    width: true,
    height: true,
    columnWidth: true,
    minWidth: true,
    minHeight: true
  };
  var values = {
    'min-content': true,
    'max-content': true,
    'fill-available': true,
    'fit-content': true,
    'contain-floats': true
  };

  function sizing(property, value) {
    if (properties[property] && values[value]) {
      return (0, _joinPrefixedValue2.default)(property, value);
    }
  }
  module.exports = exports['default'];
});

var gradient_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = gradient;

  var _joinPrefixedValue = joinPrefixedValue;

  var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);

  var _isPrefixedValue = isPrefixedValue;

  var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

  function gradient(property, value) {
    if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.match(values) !== null) {
      return (0, _joinPrefixedValue2.default)(property, value);
    }
  }
  module.exports = exports['default'];
});

var uppercasePattern = /[A-Z]/g;
var msPattern$2 = /^ms-/;
var cache = {};

function hyphenateStyleName$2(string) {
  return string in cache ? cache[string] : cache[string] = string.replace(uppercasePattern, '-$&').toLowerCase().replace(msPattern$2, '-ms-');
}

var index$8 = hyphenateStyleName$2;

var transition_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = transition;

  var _hyphenateStyleName = index$8;

  var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

  var _capitalizeString = capitalizeString;

  var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

  var _isPrefixedValue = isPrefixedValue;

  var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

  var _prefixProps = prefixProps;

  var _prefixProps2 = _interopRequireDefault(_prefixProps);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }

  var properties = {
    transition: true,
    transitionProperty: true,
    WebkitTransition: true,
    WebkitTransitionProperty: true
  };

  function transition(property, value) {
    // also check for already prefixed transitions
    if (typeof value === 'string' && properties[property]) {
      var _ref2;

      var outputValue = prefixValue(value);
      var webkitOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (value) {
        return value.match(/-moz-|-ms-/) === null;
      }).join(',');

      // if the property is already prefixed
      if (property.indexOf('Webkit') > -1) {
        return _defineProperty({}, property, webkitOutput);
      }

      return _ref2 = {}, _defineProperty(_ref2, 'Webkit' + (0, _capitalizeString2.default)(property), webkitOutput), _defineProperty(_ref2, property, outputValue), _ref2;
    }
  }

  function prefixValue(value) {
    if ((0, _isPrefixedValue2.default)(value)) {
      return value;
    }

    // only split multi values, not cubic beziers
    var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

    // iterate each single value and check for transitioned properties
    // that need to be prefixed as well
    multipleValues.forEach(function (val, index) {
      multipleValues[index] = Object.keys(_prefixProps2.default).reduce(function (out, prefix) {
        var dashCasePrefix = '-' + prefix.toLowerCase() + '-';

        Object.keys(_prefixProps2.default[prefix]).forEach(function (prop) {
          var dashCaseProperty = (0, _hyphenateStyleName2.default)(prop);

          if (val.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
            // join all prefixes and create a new value
            out = val.replace(dashCaseProperty, dashCasePrefix + dashCaseProperty) + ',' + out;
          }
        });
        return out;
      }, val);
    });

    return multipleValues.join(',');
  }
  module.exports = exports['default'];
});

var flexboxIE_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = flexboxIE;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }

  var alternativeValues = {
    'space-around': 'distribute',
    'space-between': 'justify',
    'flex-start': 'start',
    'flex-end': 'end'
  };
  var alternativeProps = {
    alignContent: 'msFlexLinePack',
    alignSelf: 'msFlexItemAlign',
    alignItems: 'msFlexAlign',
    justifyContent: 'msFlexPack',
    order: 'msFlexOrder',
    flexGrow: 'msFlexPositive',
    flexShrink: 'msFlexNegative',
    flexBasis: 'msPreferredSize'
  };

  function flexboxIE(property, value) {
    if (alternativeProps[property]) {
      return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
    }
  }
  module.exports = exports['default'];
});

var flexboxOld_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = flexboxOld;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }

  var alternativeValues = {
    'space-around': 'justify',
    'space-between': 'justify',
    'flex-start': 'start',
    'flex-end': 'end',
    'wrap-reverse': 'multiple',
    wrap: 'multiple'
  };

  var alternativeProps = {
    alignItems: 'WebkitBoxAlign',
    justifyContent: 'WebkitBoxPack',
    flexWrap: 'WebkitBoxLines'
  };

  function flexboxOld(property, value) {
    if (property === 'flexDirection' && typeof value === 'string') {
      return {
        WebkitBoxOrient: value.indexOf('column') > -1 ? 'vertical' : 'horizontal',
        WebkitBoxDirection: value.indexOf('reverse') > -1 ? 'reverse' : 'normal'
      };
    }
    if (alternativeProps[property]) {
      return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
    }
  }
  module.exports = exports['default'];
});

var prefixAll_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = prefixAll;

  var _prefixProps = prefixProps;

  var _prefixProps2 = _interopRequireDefault(_prefixProps);

  var _capitalizeString = capitalizeString;

  var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

  var _sortPrefixedStyle = sortPrefixedStyle_1;

  var _sortPrefixedStyle2 = _interopRequireDefault(_sortPrefixedStyle);

  var _position = position_1;

  var _position2 = _interopRequireDefault(_position);

  var _calc = calc_1;

  var _calc2 = _interopRequireDefault(_calc);

  var _cursor = cursor_1;

  var _cursor2 = _interopRequireDefault(_cursor);

  var _flex = flex_1;

  var _flex2 = _interopRequireDefault(_flex);

  var _sizing = sizing_1;

  var _sizing2 = _interopRequireDefault(_sizing);

  var _gradient = gradient_1;

  var _gradient2 = _interopRequireDefault(_gradient);

  var _transition = transition_1;

  var _transition2 = _interopRequireDefault(_transition);

  var _flexboxIE = flexboxIE_1;

  var _flexboxIE2 = _interopRequireDefault(_flexboxIE);

  var _flexboxOld = flexboxOld_1;

  var _flexboxOld2 = _interopRequireDefault(_flexboxOld);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  // special flexbox specifications


  var plugins = [_position2.default, _calc2.default, _cursor2.default, _sizing2.default, _gradient2.default, _transition2.default, _flexboxIE2.default, _flexboxOld2.default, _flex2.default];

  /**
   * Returns a prefixed version of the style object using all vendor prefixes
   * @param {Object} styles - Style object that gets prefixed properties added
   * @returns {Object} - Style object with prefixed properties and values
   */
  function prefixAll(styles) {
    Object.keys(styles).forEach(function (property) {
      var value = styles[property];
      if (value instanceof Object && !Array.isArray(value)) {
        // recurse through nested style objects
        styles[property] = prefixAll(value);
      } else {
        Object.keys(_prefixProps2.default).forEach(function (prefix) {
          var properties = _prefixProps2.default[prefix];
          // add prefixes if needed
          if (properties[property]) {
            styles[prefix + (0, _capitalizeString2.default)(property)] = value;
          }
        });
      }
    });

    Object.keys(styles).forEach(function (property) {
      [].concat(styles[property]).forEach(function (value, index) {
        // resolve every special plugins
        plugins.forEach(function (plugin) {
          return assignStyles(styles, plugin(property, value));
        });
      });
    });

    return (0, _sortPrefixedStyle2.default)(styles);
  }

  function assignStyles(base) {
    var extend = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    Object.keys(extend).forEach(function (property) {
      var baseValue = base[property];
      if (Array.isArray(baseValue)) {
        [].concat(extend[property]).forEach(function (value) {
          var valueIndex = baseValue.indexOf(value);
          if (valueIndex > -1) {
            base[property].splice(valueIndex, 1);
          }
          base[property].push(value);
        });
      } else {
        base[property] = extend[property];
      }
    });
  }
  module.exports = exports['default'];
});

var _static = prefixAll_1;

//      
// eslint-disable-next-line
var autoprefix = (function (root) {
  root.walkDecls(function (decl) {
    /* No point even checking custom props */
    if (/^--/.test(decl.prop)) return;

    var objStyle = defineProperty({}, camelizeStyleName_1(decl.prop), decl.value);
    var prefixed = _static(objStyle);
    Object.keys(prefixed).reverse().forEach(function (newProp) {
      var newVals = prefixed[newProp];
      var newValArray = Array.isArray(newVals) ? newVals : [newVals];
      newValArray.forEach(function (newVal) {
        decl.cloneBefore({
          prop: hyphenateStyleName_1(newProp),
          value: newVal
        });
      });
    });
    decl.remove();
  });
});

//      
/*
 ComponentStyle is all the CSS-specific stuff, not
 the React-specific stuff.
 */
var _ComponentStyle = (function (nameGenerator) {
  var inserted = {};

  var ComponentStyle = function () {
    function ComponentStyle(rules) {
      classCallCheck(this, ComponentStyle);

      this.rules = rules;
      if (!styleSheet.injected) styleSheet.inject();
      this.insertedRule = styleSheet.insert('');
    }

    /*
     * Flattens a rule set into valid CSS
     * Hashes it, wraps the whole chunk in a ._hashName {}
     * Parses that with PostCSS then runs PostCSS-Nested on it
     * Returns the hash to be injected on render()
     * */


    createClass(ComponentStyle, [{
      key: 'generateAndInjectStyles',
      value: function generateAndInjectStyles(executionContext) {
        var flatCSS = flatten(this.rules, executionContext).join('').replace(/^\s*\/\/.*$/gm, ''); // replace JS comments
        var hash = hashStr(flatCSS);
        if (!inserted[hash]) {
          var selector = nameGenerator(hash);
          inserted[hash] = selector;
          var root = safeParse('.' + selector + ' { ' + flatCSS + ' }');
          process$2(root);
          autoprefix(root);
          this.insertedRule.appendRule(root.toResult().css);
        }
        return inserted[hash];
      }
    }]);
    return ComponentStyle;
  }();

  return ComponentStyle;
});

//      
/* globals ReactClass */

var withTheme = (function (Component$$1) {
  var _class, _temp2;

  return _temp2 = _class = function (_React$Component) {
    inherits(_class, _React$Component);

    function _class() {
      var _ref;

      var _temp, _this, _ret;

      classCallCheck(this, _class);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(_class, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _this2 = this;

        if (!this.context[CHANNEL]) {
          throw new Error('[withTheme] Please use ThemeProvider to be able to use withTheme');
        }

        var subscribe = this.context[CHANNEL];
        this.unsubscribe = subscribe(function (theme) {
          _this2.setState({ theme: theme });
        });
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (typeof this.unsubscribe === 'function') this.unsubscribe();
      }
    }, {
      key: 'render',
      value: function render() {
        var theme = this.state.theme;


        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Component$$1, _extends({ theme: theme }, this.props));
      }
    }]);
    return _class;
  }(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component), _class.contextTypes = defineProperty({}, CHANNEL, __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.func), _temp2;
});

//      

/* Import singletons */
/* Import singleton constructors */
/* Import components */
/* Import Higher Order Components */
/* Instantiate singletons */
var keyframes = _keyframes(generateAlphabeticName);
var styled = _styled(_styledComponent(_ComponentStyle(generateAlphabeticName)));

/* harmony default export */ __webpack_exports__["default"] = (styled);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {

  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null

};

module.exports = ReactCurrentOwner;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(5);

var ReactNoopUpdateQueue = __webpack_require__(13);

var canDefineProperty = __webpack_require__(15);
var emptyObject = __webpack_require__(10);
var invariant = __webpack_require__(3);
var warning = __webpack_require__(1);

/**
 * Base class helpers for the updating state of a component.
 */
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

ReactComponent.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : _prodInvariant('85') : void 0;
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
ReactComponent.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'forceUpdate');
  }
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
if (process.env.NODE_ENV !== 'production') {
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    if (canDefineProperty) {
      Object.defineProperty(ReactComponent.prototype, methodName, {
        get: function () {
          process.env.NODE_ENV !== 'production' ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : void 0;
          return undefined;
        }
      });
    }
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

module.exports = ReactComponent;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(5);

var ReactCurrentOwner = __webpack_require__(8);

var invariant = __webpack_require__(3);
var warning = __webpack_require__(1);

function isNative(fn) {
  // Based on isNative() from Lodash
  var funcToString = Function.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var reIsNative = RegExp('^' + funcToString
  // Take an example native function source for comparison
  .call(hasOwnProperty)
  // Strip regex characters so we can use it for regex
  .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  // Remove hasOwnProperty from the template to make it generic
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  try {
    var source = funcToString.call(fn);
    return reIsNative.test(source);
  } catch (err) {
    return false;
  }
}

var canUseCollections =
// Array.from
typeof Array.from === 'function' &&
// Map
typeof Map === 'function' && isNative(Map) &&
// Map.prototype.keys
Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
// Set
typeof Set === 'function' && isNative(Set) &&
// Set.prototype.keys
Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

var setItem;
var getItem;
var removeItem;
var getItemIDs;
var addRoot;
var removeRoot;
var getRootIDs;

if (canUseCollections) {
  var itemMap = new Map();
  var rootIDSet = new Set();

  setItem = function (id, item) {
    itemMap.set(id, item);
  };
  getItem = function (id) {
    return itemMap.get(id);
  };
  removeItem = function (id) {
    itemMap['delete'](id);
  };
  getItemIDs = function () {
    return Array.from(itemMap.keys());
  };

  addRoot = function (id) {
    rootIDSet.add(id);
  };
  removeRoot = function (id) {
    rootIDSet['delete'](id);
  };
  getRootIDs = function () {
    return Array.from(rootIDSet.keys());
  };
} else {
  var itemByKey = {};
  var rootByKey = {};

  // Use non-numeric keys to prevent V8 performance issues:
  // https://github.com/facebook/react/pull/7232
  var getKeyFromID = function (id) {
    return '.' + id;
  };
  var getIDFromKey = function (key) {
    return parseInt(key.substr(1), 10);
  };

  setItem = function (id, item) {
    var key = getKeyFromID(id);
    itemByKey[key] = item;
  };
  getItem = function (id) {
    var key = getKeyFromID(id);
    return itemByKey[key];
  };
  removeItem = function (id) {
    var key = getKeyFromID(id);
    delete itemByKey[key];
  };
  getItemIDs = function () {
    return Object.keys(itemByKey).map(getIDFromKey);
  };

  addRoot = function (id) {
    var key = getKeyFromID(id);
    rootByKey[key] = true;
  };
  removeRoot = function (id) {
    var key = getKeyFromID(id);
    delete rootByKey[key];
  };
  getRootIDs = function () {
    return Object.keys(rootByKey).map(getIDFromKey);
  };
}

var unmountedIDs = [];

function purgeDeep(id) {
  var item = getItem(id);
  if (item) {
    var childIDs = item.childIDs;

    removeItem(id);
    childIDs.forEach(purgeDeep);
  }
}

function describeComponentFrame(name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
}

function getDisplayName(element) {
  if (element == null) {
    return '#empty';
  } else if (typeof element === 'string' || typeof element === 'number') {
    return '#text';
  } else if (typeof element.type === 'string') {
    return element.type;
  } else {
    return element.type.displayName || element.type.name || 'Unknown';
  }
}

function describeID(id) {
  var name = ReactComponentTreeHook.getDisplayName(id);
  var element = ReactComponentTreeHook.getElement(id);
  var ownerID = ReactComponentTreeHook.getOwnerID(id);
  var ownerName;
  if (ownerID) {
    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
  }
  process.env.NODE_ENV !== 'production' ? warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
  return describeComponentFrame(name, element && element._source, ownerName);
}

var ReactComponentTreeHook = {
  onSetChildren: function (id, nextChildIDs) {
    var item = getItem(id);
    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.childIDs = nextChildIDs;

    for (var i = 0; i < nextChildIDs.length; i++) {
      var nextChildID = nextChildIDs[i];
      var nextChild = getItem(nextChildID);
      !nextChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('140') : void 0;
      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : _prodInvariant('141') : void 0;
      !nextChild.isMounted ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
      if (nextChild.parentID == null) {
        nextChild.parentID = id;
        // TODO: This shouldn't be necessary but mounting a new root during in
        // componentWillMount currently causes not-yet-mounted components to
        // be purged from our tree data so their parent id is missing.
      }
      !(nextChild.parentID === id) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('142', nextChildID, nextChild.parentID, id) : void 0;
    }
  },
  onBeforeMountComponent: function (id, element, parentID) {
    var item = {
      element: element,
      parentID: parentID,
      text: null,
      childIDs: [],
      isMounted: false,
      updateCount: 0
    };
    setItem(id, item);
  },
  onBeforeUpdateComponent: function (id, element) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.element = element;
  },
  onMountComponent: function (id) {
    var item = getItem(id);
    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.isMounted = true;
    var isRoot = item.parentID === 0;
    if (isRoot) {
      addRoot(id);
    }
  },
  onUpdateComponent: function (id) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.updateCount++;
  },
  onUnmountComponent: function (id) {
    var item = getItem(id);
    if (item) {
      // We need to check if it exists.
      // `item` might not exist if it is inside an error boundary, and a sibling
      // error boundary child threw while mounting. Then this instance never
      // got a chance to mount, but it still gets an unmounting event during
      // the error boundary cleanup.
      item.isMounted = false;
      var isRoot = item.parentID === 0;
      if (isRoot) {
        removeRoot(id);
      }
    }
    unmountedIDs.push(id);
  },
  purgeUnmountedComponents: function () {
    if (ReactComponentTreeHook._preventPurging) {
      // Should only be used for testing.
      return;
    }

    for (var i = 0; i < unmountedIDs.length; i++) {
      var id = unmountedIDs[i];
      purgeDeep(id);
    }
    unmountedIDs.length = 0;
  },
  isMounted: function (id) {
    var item = getItem(id);
    return item ? item.isMounted : false;
  },
  getCurrentStackAddendum: function (topElement) {
    var info = '';
    if (topElement) {
      var name = getDisplayName(topElement);
      var owner = topElement._owner;
      info += describeComponentFrame(name, topElement._source, owner && owner.getName());
    }

    var currentOwner = ReactCurrentOwner.current;
    var id = currentOwner && currentOwner._debugID;

    info += ReactComponentTreeHook.getStackAddendumByID(id);
    return info;
  },
  getStackAddendumByID: function (id) {
    var info = '';
    while (id) {
      info += describeID(id);
      id = ReactComponentTreeHook.getParentID(id);
    }
    return info;
  },
  getChildIDs: function (id) {
    var item = getItem(id);
    return item ? item.childIDs : [];
  },
  getDisplayName: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element) {
      return null;
    }
    return getDisplayName(element);
  },
  getElement: function (id) {
    var item = getItem(id);
    return item ? item.element : null;
  },
  getOwnerID: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element || !element._owner) {
      return null;
    }
    return element._owner._debugID;
  },
  getParentID: function (id) {
    var item = getItem(id);
    return item ? item.parentID : null;
  },
  getSource: function (id) {
    var item = getItem(id);
    var element = item ? item.element : null;
    var source = element != null ? element._source : null;
    return source;
  },
  getText: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (typeof element === 'string') {
      return element;
    } else if (typeof element === 'number') {
      return '' + element;
    } else {
      return null;
    }
  },
  getUpdateCount: function (id) {
    var item = getItem(id);
    return item ? item.updateCount : 0;
  },


  getRootIDs: getRootIDs,
  getRegisteredIDs: getItemIDs
};

module.exports = ReactComponentTreeHook;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var warning = __webpack_require__(1);

function warnNoop(publicInstance, callerName) {
  if (process.env.NODE_ENV !== 'production') {
    var constructor = publicInstance.constructor;
    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass') : void 0;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {

  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @internal
   */
  enqueueCallback: function (publicInstance, callback) {},

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState) {
    warnNoop(publicInstance, 'setState');
  }
};

module.exports = ReactNoopUpdateQueue;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var ReactPropTypeLocationNames = {};

if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
}

module.exports = ReactPropTypeLocationNames;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var canDefineProperty = false;
if (process.env.NODE_ENV !== 'production') {
  try {
    // $FlowFixMe https://github.com/facebook/flow/issues/285
    Object.defineProperty({}, 'x', { get: function () {} });
    canDefineProperty = true;
  } catch (x) {
    // IE will fail on defineProperty
  }
}

module.exports = canDefineProperty;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/* global Symbol */

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

module.exports = getIteratorFn;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var wasClicked = exports.wasClicked = function wasClicked(event, element) {
    var rect = element.getBoundingClientRect();
    var minX = rect.left + element.clientLeft;
    var x = event.clientX;
    var minY = rect.top + element.clientTop;
    var y = event.clientY;
    if (x < minX || x >= minX + element.clientWidth) {
        return false;
    }
    if (y < minY || y >= minY + element.clientHeight) {
        return false;
    }
    return true;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.

var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

module.exports = REACT_ELEMENT_TYPE;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */



var ReactCurrentOwner = __webpack_require__(8);
var ReactComponentTreeHook = __webpack_require__(12);
var ReactElement = __webpack_require__(4);

var checkReactTypeSpec = __webpack_require__(36);

var canDefineProperty = __webpack_require__(15);
var getIteratorFn = __webpack_require__(16);
var warning = __webpack_require__(1);

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = ReactCurrentOwner.current.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = ' Check the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var memoizer = ownerHasKeyUseWarning.uniqueKey || (ownerHasKeyUseWarning.uniqueKey = {});

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (memoizer[currentComponentErrorInfo]) {
    return;
  }
  memoizer[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
  }

  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, ReactComponentTreeHook.getCurrentStackAddendum(element)) : void 0;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (ReactElement.isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (ReactElement.isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    // Entry iterators provide implicit keys.
    if (iteratorFn) {
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (ReactElement.isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  if (componentClass.propTypes) {
    checkReactTypeSpec(componentClass.propTypes, element.props, 'prop', name, element, null);
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    process.env.NODE_ENV !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
  }
}

var ReactElementValidator = {

  createElement: function (type, props, children) {
    var validType = typeof type === 'string' || typeof type === 'function';
    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    if (!validType) {
      if (typeof type !== 'function' && typeof type !== 'string') {
        var info = '';
        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + 'it\'s defined in.';
        }
        info += getDeclarationErrorAddendum();
        process.env.NODE_ENV !== 'production' ? warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info) : void 0;
      }
    }

    var element = ReactElement.createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    validatePropTypes(element);

    return element;
  },

  createFactory: function (type) {
    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
    // Legacy hook TODO: Warn if this is accessed
    validatedFactory.type = type;

    if (process.env.NODE_ENV !== 'production') {
      if (canDefineProperty) {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
            process.env.NODE_ENV !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : void 0;
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
    }

    return validatedFactory;
  },

  cloneElement: function (element, props, children) {
    var newElement = ReactElement.cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }

};

module.exports = ReactElementValidator;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  @media (max-width: 768px) {\n    overflow-y: auto;\n    position: fixed;\n    height: 100vh;\n    -ms-overflow-style: none;\n    overflow: -moz-scrollbars-none;\n    &::-webkit-scrollbar {\n      width: 0 !important;\n    }\n  }\n'], ['\n  @media (max-width: 768px) {\n    overflow-y: auto;\n    position: fixed;\n    height: 100vh;\n    -ms-overflow-style: none;\n    overflow: -moz-scrollbars-none;\n    &::-webkit-scrollbar {\n      width: 0 !important;\n    }\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  background: ', ';\n  color: ', ';\n  min-height: ', ';\n\n\n  @media (max-width: 768px) {\n    position: relative;\n    flex-direction: column;\n    align-items: flex-start;\n    min-width: 200px;\n    min-height: 100%;\n    left: ', ';\n    transition: left 0.4s ease;\n    ', '\n  }\n'], ['\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  background: ', ';\n  color: ', ';\n  min-height: ', ';\n\n\n  @media (max-width: 768px) {\n    position: relative;\n    flex-direction: column;\n    align-items: flex-start;\n    min-width: 200px;\n    min-height: 100%;\n    left: ', ';\n    transition: left 0.4s ease;\n    ', '\n  }\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: center;\n  margin: 0;\n  padding: 0;\n  list-style-type: none;\n\n  @media (max-width: 768px) {\n    flex-direction: column;\n    align-items: center;\n    align-items: flex-start;\n    width: 100%;\n    margin-top: 60px;\n  }\n'], ['\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: center;\n  margin: 0;\n  padding: 0;\n  list-style-type: none;\n\n  @media (max-width: 768px) {\n    flex-direction: column;\n    align-items: center;\n    align-items: flex-start;\n    width: 100%;\n    margin-top: 60px;\n  }\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  list-style-type: none;\n\n  @media (max-width: 768px) {\n    position: fixed;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    background: ', ';\n    width: ', ';\n    left: ', ';\n    transition: left 0.4s ease;\n    z-index: 10;\n  }\n'], ['\n  list-style-type: none;\n\n  @media (max-width: 768px) {\n    position: fixed;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    background: ', ';\n    width: ', ';\n    left: ', ';\n    transition: left 0.4s ease;\n    z-index: 10;\n  }\n']);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(6);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Brand = __webpack_require__(23);

var _Brand2 = _interopRequireDefault(_Brand);

var _Dropdown = __webpack_require__(24);

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _Link = __webpack_require__(25);

var _Link2 = _interopRequireDefault(_Link);

var _MenuIcon = __webpack_require__(26);

var _MenuIcon2 = _interopRequireDefault(_MenuIcon);

var _wasClicked = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Container = _styledComponents2.default.div(_templateObject);
var Nav = _styledComponents2.default.nav(_templateObject2, function (props) {
    return props.theme.primary ? props.theme.primary : 'black';
}, function (props) {
    return props.theme.text ? props.theme.text : 'white';
}, function (props) {
    return props.theme.height ? props.theme.height + 'px' : '50px';
}, function (props) {
    return props.open ? '0%' : '-100%';
}, '' /* padding-top: 30px; */);
var Items = _styledComponents2.default.ul(_templateObject3);
var Header = _styledComponents2.default.li(_templateObject4, function (props) {
    return props.theme.primary ? props.theme.primary : 'black';
}, function (props) {
    return props.maxWidth ? props.maxWidth + 'px' : '200px';
}, function (props) {
    return props.open ? '0%' : '-200px';
});

var Navbar = function (_Component) {
    _inherits(Navbar, _Component);

    function Navbar() {
        _classCallCheck(this, Navbar);

        var _this = _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).call(this));

        _this.displayName = 'Navbar';

        _this.handleDocumentClick = function (e) {
            var open = _this.state.open;

            if (!(0, _wasClicked.wasClicked)(e, _this.nav) && open) {
                _this.close();
            }
        };

        _this.toggle = function (e) {
            var open = _this.state.open;

            e.nativeEvent.stopImmediatePropagation();
            e.preventDefault();
            if (open) {
                _this.close();
            } else {
                _this.open();
            }
        };

        _this.close = function () {
            _this.setState({
                open: false,
                activeIndex: -1
            });
        };

        _this.open = function () {
            _this.setState({
                open: true
            });
        };

        _this.changeDropdown = function (i) {
            _this.setState({
                activeIndex: i
            });
        };

        _this.renderBrand = function () {
            var _this$props$brand = _this.props.brand,
                title = _this$props$brand.title,
                href = _this$props$brand.href;

            return _react2.default.createElement(_Brand2.default, { title: title, href: href });
        };

        _this.renderItems = function () {
            var activeIndex = _this.state.activeIndex;
            var items = _this.props.items;

            items = items.map(function (item, i) {
                if (item.element) {
                    return _react2.default.cloneElement(item.element, _extends({}, item.element.props, { key: i }));
                } else if (item.dropdown) {
                    return _react2.default.createElement(_Dropdown2.default, {
                        key: i,
                        index: i,
                        open: activeIndex === i ? true : false,
                        items: item.items,
                        title: item.title,
                        changeDropdown: _this.changeDropdown
                    });
                } else {
                    return _react2.default.createElement(_Link2.default, { key: i, href: item.href, title: item.title });
                }
            });
            return _react2.default.createElement(
                Items,
                null,
                items
            );
        };

        _this.state = {
            activeIndex: -1,
            open: false
        };
        return _this;
    }

    _createClass(Navbar, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.addEventListener('click', this.handleDocumentClick);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('click', this.handleDocumentClick);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                theme = _props.theme,
                brand = _props.brand,
                items = _props.items;
            var open = this.state.open;

            return _react2.default.createElement(
                _styledComponents.ThemeProvider,
                { theme: theme ? theme : {} },
                _react2.default.createElement(
                    Container,
                    null,
                    _react2.default.createElement(
                        Nav,
                        { open: open, innerRef: function innerRef(el) {
                                return _this2.nav = el;
                            } },
                        _react2.default.createElement(
                            Header,
                            { open: open },
                            brand && this.renderBrand(),
                            _react2.default.createElement(_MenuIcon2.default, { ref: function ref(el) {
                                    return _this2.icon = el;
                                }, onClick: this.toggle, open: open })
                        ),
                        items && this.renderItems()
                    )
                )
            );
        }
    }]);

    return Navbar;
}(_react.Component);

Navbar.displayName = 'Navbar';
exports.default = Navbar;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _Navbar = __webpack_require__(21);

var _Navbar2 = _interopRequireDefault(_Navbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var items = [{
    dropdown: true,
    title: 'Dropdown 1',
    items: [{
        name: 'Link 1',
        href: 'www.google.com'
    }, {
        name: 'Link 2',
        href: 'wwww.google.com'
    }]
}, {
    dropdown: true,
    title: 'Dicty Stock Center',
    items: [{
        name: 'Link 1',
        href: 'www.google.com'
    }, {
        name: 'Link 2',
        href: 'wwww.google.com'
    }, {
        name: 'Link 3',
        href: 'www.google.com'
    }, {
        name: 'Link 4',
        href: 'wwww.google.com'
    }]
}, {
    title: 'Link 1',
    href: 'google.com'
}, {
    title: 'Link 2',
    href: 'google.com'
}, {
    title: 'Link 3',
    href: 'google.com'
}, {
    title: 'Link 4',
    href: 'google.com'
}, {
    title: 'Link 5',
    href: 'google.com'
}, {
    title: 'Link 6',
    href: 'google.com'
}];
var brand = {
    title: 'Brand',
    href: 'google.com'
};
// Primary: Nav background,
// Secondary: Borders, highlights, dropdowns
// primaryText: all on the primary background,
// secondaryText: all text on the secondary color

var theme1 = {
    primary: '#3AAED8',
    secondary: '#2BD9FE',
    text: 'white'
};
var theme2 = {
    primary: '#6E2594',
    secondary: '#05668D',
    text: 'white'
};

var App = function (_Component) {
    _inherits(App, _Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Navbar2.default, { theme: theme1, brand: brand, items: items })
            );
        }
    }]);

    return App;
}(_react.Component);

App.displayName = 'App';
exports.default = App;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  list-style-type: none;\n  display: flex;\n  padding: 10px;\n\n  @media (max-width: 768px) {\n    height: 30px;\n  }\n'], ['\n  list-style-type: none;\n  display: flex;\n  padding: 10px;\n\n  @media (max-width: 768px) {\n    height: 30px;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  display: block;\n  margin: auto;\n  text-decoration: none;\n  color: ', ';\n  font-size: 1.5em;\n\n  @media (max-width: 768px) {\n    top: 0;\n    z-index: 10;\n  }\n'], ['\n  display: block;\n  margin: auto;\n  text-decoration: none;\n  color: ', ';\n  font-size: 1.5em;\n\n  @media (max-width: 768px) {\n    top: 0;\n    z-index: 10;\n  }\n']);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(6);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Container = _styledComponents2.default.div(_templateObject);
var Link = _styledComponents2.default.a(_templateObject2, function (props) {
  return props.theme.text ? props.theme.text : 'white';
});

var Brand = function (_Component) {
  _inherits(Brand, _Component);

  function Brand() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Brand);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Brand.__proto__ || Object.getPrototypeOf(Brand)).call.apply(_ref, [this].concat(args))), _this), _this.displayName = 'Brand', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Brand, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          href = _props.href;

      return _react2.default.createElement(
        Container,
        null,
        _react2.default.createElement(
          Link,
          { href: href },
          title
        )
      );
    }
  }]);

  return Brand;
}(_react.Component);

Brand.displayName = 'Brand';
exports.default = Brand;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  display: flex;\n  flex-direction: column;\n  flex-wrap: nowrap;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  padding: 0;\n  position: relative;\n  background: ', ';\n  transition: all 0.2s ease;\n\n  @media (max-width: 768px) {\n    align-items: initial;\n    width: 100%;\n  }\n'], ['\n  display: flex;\n  flex-direction: column;\n  flex-wrap: nowrap;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  padding: 0;\n  position: relative;\n  background: ', ';\n  transition: all 0.2s ease;\n\n  @media (max-width: 768px) {\n    align-items: initial;\n    width: 100%;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  display: block;\n  cursor: pointer;\n  padding: 0px 20px 0px 10px;\n  transition: all 0.3s ease;\n  color: ', ';\n  line-height: ', ';\n\n  @media (max-width: 768px) {\n    line-height: initial;\n    position: relative;\n    margin: 0;\n    padding: 10px 20px 10px 10px;\n  }\n\n  &::after {\n    content: \'\';\n    position: absolute;\n    top: ', ';\n    bottom: 0;\n    right: 5px;\n    margin: auto;\n    width: 0;\n    height: 0;\n    border-left: 5px solid transparent;\n    border-right: 5px solid transparent;\n    border-top: 5px solid ', ';\n    transform: ', ';\n    transform-origin: top;\n    transition: inherit;\n\n    @media (max-width: 768px) {\n      top: ', ';\n      right: 25px;\n      bottom: 10px;\n      top: none;\n    }\n  }\n'], ['\n  display: block;\n  cursor: pointer;\n  padding: 0px 20px 0px 10px;\n  transition: all 0.3s ease;\n  color: ', ';\n  line-height: ', ';\n\n  @media (max-width: 768px) {\n    line-height: initial;\n    position: relative;\n    margin: 0;\n    padding: 10px 20px 10px 10px;\n  }\n\n  &::after {\n    content: \'\';\n    position: absolute;\n    top: ', ';\n    bottom: 0;\n    right: 5px;\n    margin: auto;\n    width: 0;\n    height: 0;\n    border-left: 5px solid transparent;\n    border-right: 5px solid transparent;\n    border-top: 5px solid ', ';\n    transform: ', ';\n    transform-origin: top;\n    transition: inherit;\n\n    @media (max-width: 768px) {\n      top: ', ';\n      right: 25px;\n      bottom: 10px;\n      top: none;\n    }\n  }\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  position: absolute;\n  top: 100%;\n  left: 0;\n  display: flex;\n  flex-direction: column;\n  padding: 0px;\n  height: 0px;\n  width: calc(100% - 2px);\n  overflow: hidden;\n  list-style-type: none;\n  transition: all 0.2s ease;\n  border-left: 1px solid ', ';\n  border-right: 1px solid ', ';\n  border-bottom: 1px solid ', ';\n  border-bottom-width: ', ';\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);\n\n  @media (max-width: 768px) {\n    position: relative;\n    top: 0;\n    border: none;\n    color: white;\n    box-shadow: none;\n  }\n'], ['\n  position: absolute;\n  top: 100%;\n  left: 0;\n  display: flex;\n  flex-direction: column;\n  padding: 0px;\n  height: 0px;\n  width: calc(100% - 2px);\n  overflow: hidden;\n  list-style-type: none;\n  transition: all 0.2s ease;\n  border-left: 1px solid ', ';\n  border-right: 1px solid ', ';\n  border-bottom: 1px solid ', ';\n  border-bottom-width: ', ';\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);\n\n  @media (max-width: 768px) {\n    position: relative;\n    top: 0;\n    border: none;\n    color: white;\n    box-shadow: none;\n  }\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  position: relative;\n  color: ', ';\n  ', '\n  transition: all 0.14s ease;\n\n  &:hover {\n    color: white;\n    background: ', ';\n  }\n\n  @media (max-width: 768px) {\n    color: white;\n  }\n'], ['\n  position: relative;\n  color: ', ';\n  ', '\n  transition: all 0.14s ease;\n\n  &:hover {\n    color: white;\n    background: ', ';\n  }\n\n  @media (max-width: 768px) {\n    color: white;\n  }\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  text-decoration: none;\n  color: inherit;\n  padding: 10px 0px 10px 5px;\n  display: block;\n\n  @media (max-width: 768px) {\n    padding: 10px 0px 10px 20px;\n  }\n'], ['\n  text-decoration: none;\n  color: inherit;\n  padding: 10px 0px 10px 5px;\n  display: block;\n\n  @media (max-width: 768px) {\n    padding: 10px 0px 10px 20px;\n  }\n']);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(6);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _wasClicked = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Menu = _styledComponents2.default.ul(_templateObject, function (props) {
  return props.open && props.theme.secondary ? props.theme.secondary : 'transparent';
});
var Toggle = _styledComponents2.default.li(_templateObject2, function (props) {
  return props.theme.text ? props.theme.text : 'black';
}, function (props) {
  return props.theme.height ? props.theme.height : '50px';
}, function (props) {
  return props.open ? '9px' : '0px';
}, function (props) {
  return props.theme.text ? props.theme.text : 'white';
}, function (props) {
  return props.open ? 'rotateX(180deg)' : 'rotateX(0deg)';
}, function (props) {
  return props.open ? '19px' : '10px';
});
var List = _styledComponents2.default.ul(_templateObject3, function (props) {
  return props.theme.secondary ? props.theme.secondary : '#333';
}, function (props) {
  return props.theme.secondary ? props.theme.secondary : '#333';
}, function (props) {
  return props.theme.secondary ? props.theme.secondary : '#333';
}, function (props) {
  return props.open ? '1px' : '0px';
});
var Item = _styledComponents2.default.li(_templateObject4, function (props) {
  return props.theme.primary ? props.theme.primary : 'black';
}, '' /* background-size: 0px 0px; */, function (props) {
  return props.theme.secondary ? props.theme.secondary : 'black';
});
var Link = _styledComponents2.default.a(_templateObject5);

var Dropdown = function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Dropdown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call.apply(_ref, [this].concat(args))), _this), _this.displayName = 'Dropdown', _this.close = function () {
      _this.list.style.height = getComputedStyle(_this.list).height;
      // Force repaint
      _this.list.offsetHeight;
      _this.list.style.height = '0px';
    }, _this.open = function () {
      var prevHeight = _this.list.style.height;
      _this.list.style.height = 'auto';
      var endHeight = getComputedStyle(_this.list).height;
      _this.list.style.height = prevHeight;
      // Force repaint
      _this.list.offsetHeight;
      _this.list.style.height = endHeight;
    }, _this.handleClick = function (e) {
      var _this$props = _this.props,
          open = _this$props.open,
          changeDropdown = _this$props.changeDropdown,
          index = _this$props.index;

      if (open) {
        // If dropdown is clicked while open, set Navbar's activeIndex to -1
        // to signify that all dropdowns are currently closed
        changeDropdown(-1);
      } else {
        changeDropdown(index);
      }
    }, _this.handleDocumentClick = function (e) {
      var _this$props2 = _this.props,
          changeDropdown = _this$props2.changeDropdown,
          open = _this$props2.open;
      // const el = this.menu
      // const rect = el.getBoundingClientRect()
      // const minX = rect.left + el.clientLeft
      // const x = event.clientX
      // const minY = rect.top + el.clientTop
      // const y = event.clientY

      if (!(0, _wasClicked.wasClicked)(e, _this.menu) && open) {
        e.stopImmediatePropagation();
        _this.close();
        changeDropdown(-1);
        return;
      }
    }, _this.renderItems = function () {
      var items = _this.props.items;

      items = items.map(function (item, i) {
        return _react2.default.createElement(
          Item,
          { key: i },
          _react2.default.createElement(
            Link,
            { href: item.href },
            item.name
          )
        );
      });
      return items;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Dropdown, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.addEventListener('click', this.handleDocumentClick);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var open = nextProps.open;

      if (open) {
        this.open();
      } else if (!open) {
        this.close();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.handleDocumentClick);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          title = _props.title,
          open = _props.open;

      return _react2.default.createElement(
        Menu,
        { open: open, innerRef: function innerRef(el) {
            return _this2.menu = el;
          } },
        _react2.default.createElement(
          Toggle,
          { onClick: this.handleClick, open: open },
          title
        ),
        _react2.default.createElement(
          List,
          { open: open, innerRef: function innerRef(el) {
              return _this2.list = el;
            } },
          this.renderItems()
        )
      );
    }
  }]);

  return Dropdown;
}(_react.Component);

Dropdown.displayName = 'Dropdown';
exports.default = Dropdown;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  display: flex;\n\n  @media (max-width: 768px) {\n    width: 100%;\n  }\n'], ['\n  display: flex;\n\n  @media (max-width: 768px) {\n    width: 100%;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  display: block;\n  color: ', ';\n  text-decoration: none;\n  margin: auto;\n  padding: 10px;\n  height: 100%;\n\n  @media (max-width: 768px) {\n    width: 100%;\n  }\n'], ['\n  display: block;\n  color: ', ';\n  text-decoration: none;\n  margin: auto;\n  padding: 10px;\n  height: 100%;\n\n  @media (max-width: 768px) {\n    width: 100%;\n  }\n']);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(6);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ListItem = _styledComponents2.default.li(_templateObject);
var A = _styledComponents2.default.a(_templateObject2, function (props) {
  return props.theme.text ? props.theme.text : 'white';
});

var Link = function (_Component) {
  _inherits(Link, _Component);

  function Link() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Link);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Link.__proto__ || Object.getPrototypeOf(Link)).call.apply(_ref, [this].concat(args))), _this), _this.displayName = 'Link', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Link, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          href = _props.href;

      return _react2.default.createElement(
        ListItem,
        null,
        _react2.default.createElement(
          A,
          { href: href },
          title
        )
      );
    }
  }]);

  return Link;
}(_react.Component);

Link.displayName = 'Link';
exports.default = Link;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  display: none;\n  position: relative;\n  padding: 5px;\n  margin-top: 5px;\n  flex-direction: column;\n  justify-content: center;\n  ', '\n  top: 0;\n  right: ', ';\n  height: 30px;\n  width: 30px;\n  cursor: pointer;\n  transition: right 0.4s ease;\n  z-index: 10;\n  ', '\n\n  @media (max-width: 768px) {\n    display: flex;\n  }\n'], ['\n  display: none;\n  position: relative;\n  padding: 5px;\n  margin-top: 5px;\n  flex-direction: column;\n  justify-content: center;\n  ', '\n  top: 0;\n  right: ', ';\n  height: 30px;\n  width: 30px;\n  cursor: pointer;\n  transition: right 0.4s ease;\n  z-index: 10;\n  ', '\n\n  @media (max-width: 768px) {\n    display: flex;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  height: 5px;\n  background: ', ';\n  margin: 3px 0px;\n  transition: all 0.2s ease;\n  transform: ', ';\n'], ['\n  height: 5px;\n  background: ', ';\n  margin: 3px 0px;\n  transition: all 0.2s ease;\n  transform: ', ';\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  height: 5px;\n  background: ', ';\n  margin: 3px 0px;\n  transition: all 0.1s ease;\n  width: ', ';\n'], ['\n  height: 5px;\n  background: ', ';\n  margin: 3px 0px;\n  transition: all 0.1s ease;\n  width: ', ';\n']);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(6);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Toggle = _styledComponents2.default.div(_templateObject, '' /* position: fixed; */, function (props) {
  return props.open ? '15px' : '-50px';
}, '' /* transition: all 0.4s all; */);
var IconBarTop = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.open ? props.theme.text : props.theme.primary;
}, function (props) {
  return props.open ? 'rotate(-45deg) translate(-25%, 7px)' : 'rotate(0deg) translate(0px, 0px)';
});
var IconBarMiddle = _styledComponents2.default.div(_templateObject3, function (props) {
  return props.open ? props.theme.text : props.theme.primary;
}, function (props) {
  return props.open ? '0%' : '100%';
});
var IconBarBottom = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.open ? props.theme.text : props.theme.primary;
}, function (props) {
  return props.open ? 'rotate(45deg) translate(-25%, -6px)' : 'rotate(0deg) translate(0px, 0px)';
});

var MenuIcon = function (_Component) {
  _inherits(MenuIcon, _Component);

  function MenuIcon() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MenuIcon);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MenuIcon.__proto__ || Object.getPrototypeOf(MenuIcon)).call.apply(_ref, [this].concat(args))), _this), _this.displayName = 'Menu Icon', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MenuIcon, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          open = _props.open,
          onClick = _props.onClick;

      return _react2.default.createElement(
        Toggle,
        { role: 'button', onClick: onClick, open: open },
        _react2.default.createElement(IconBarTop, { open: open }),
        _react2.default.createElement(IconBarMiddle, { open: open }),
        _react2.default.createElement(IconBarBottom, { open: open })
      );
    }
  }]);

  return MenuIcon;
}(_react.Component);

MenuIcon.displayName = 'MenuIcon';
exports.default = MenuIcon;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * Unescape and unwrap key for human-readable display
 *
 * @param {string} key to unescape.
 * @return {string} the unescaped key.
 */
function unescape(key) {
  var unescapeRegex = /(=0|=2)/g;
  var unescaperLookup = {
    '=0': '=',
    '=2': ':'
  };
  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

  return ('' + keySubstring).replace(unescapeRegex, function (match) {
    return unescaperLookup[match];
  });
}

var KeyEscapeUtils = {
  escape: escape,
  unescape: unescape
};

module.exports = KeyEscapeUtils;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(5);

var invariant = __webpack_require__(3);

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var standardReleaser = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function (CopyConstructor, pooler) {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler
};

module.exports = PooledClass;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(7);

var ReactChildren = __webpack_require__(30);
var ReactComponent = __webpack_require__(11);
var ReactPureComponent = __webpack_require__(34);
var ReactClass = __webpack_require__(31);
var ReactDOMFactories = __webpack_require__(32);
var ReactElement = __webpack_require__(4);
var ReactPropTypes = __webpack_require__(33);
var ReactVersion = __webpack_require__(35);

var onlyChild = __webpack_require__(37);
var warning = __webpack_require__(1);

var createElement = ReactElement.createElement;
var createFactory = ReactElement.createFactory;
var cloneElement = ReactElement.cloneElement;

if (process.env.NODE_ENV !== 'production') {
  var ReactElementValidator = __webpack_require__(19);
  createElement = ReactElementValidator.createElement;
  createFactory = ReactElementValidator.createFactory;
  cloneElement = ReactElementValidator.cloneElement;
}

var __spread = _assign;

if (process.env.NODE_ENV !== 'production') {
  var warned = false;
  __spread = function () {
    process.env.NODE_ENV !== 'production' ? warning(warned, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.') : void 0;
    warned = true;
    return _assign.apply(null, arguments);
  };
}

var React = {

  // Modern

  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    count: ReactChildren.count,
    toArray: ReactChildren.toArray,
    only: onlyChild
  },

  Component: ReactComponent,
  PureComponent: ReactPureComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement.isValidElement,

  // Classic

  PropTypes: ReactPropTypes,
  createClass: ReactClass.createClass,
  createFactory: createFactory,
  createMixin: function (mixin) {
    // Currently a noop. Will be used to validate and trace mixins.
    return mixin;
  },

  // This looks DOM specific but these are actually isomorphic helpers
  // since they are just generating DOM strings.
  DOM: ReactDOMFactories,

  version: ReactVersion,

  // Deprecated hook for JSX spread, don't use this for anything.
  __spread: __spread
};

module.exports = React;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var PooledClass = __webpack_require__(28);
var ReactElement = __webpack_require__(4);

var emptyFunction = __webpack_require__(9);
var traverseAllChildren = __webpack_require__(38);

var twoArgumentPooler = PooledClass.twoArgumentPooler;
var fourArgumentPooler = PooledClass.fourArgumentPooler;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
function ForEachBookKeeping(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
ForEachBookKeeping.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
MapBookKeeping.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement.isValidElement(mappedChild)) {
      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

function forEachSingleChildDummy(traverseContext, child, name) {
  return null;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, forEachSingleChildDummy, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
  count: countChildren,
  toArray: toArray
};

module.exports = ReactChildren;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(5),
    _assign = __webpack_require__(7);

var ReactComponent = __webpack_require__(11);
var ReactElement = __webpack_require__(4);
var ReactPropTypeLocationNames = __webpack_require__(14);
var ReactNoopUpdateQueue = __webpack_require__(13);

var emptyObject = __webpack_require__(10);
var invariant = __webpack_require__(3);
var warning = __webpack_require__(1);

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

/**
 * Policies that describe methods in `ReactClassInterface`.
 */


var injectedMixins = [];

/**
 * Composite components are higher-level components that compose other composite
 * or host components.
 *
 * To create a new type of `ReactClass`, pass a specification of
 * your new class to `React.createClass`. The only requirement of your class
 * specification is that you implement a `render` method.
 *
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return <div>Hello World</div>;
 *     }
 *   });
 *
 * The class specification supports a specific protocol of methods that have
 * special meaning (e.g. `render`). See `ReactClassInterface` for
 * more the comprehensive protocol. Any other properties and methods in the
 * class specification will be available on the prototype.
 *
 * @interface ReactClassInterface
 * @internal
 */
var ReactClassInterface = {

  /**
   * An array of Mixin objects to include when defining your component.
   *
   * @type {array}
   * @optional
   */
  mixins: 'DEFINE_MANY',

  /**
   * An object containing properties and methods that should be defined on
   * the component's constructor instead of its prototype (static methods).
   *
   * @type {object}
   * @optional
   */
  statics: 'DEFINE_MANY',

  /**
   * Definition of prop types for this component.
   *
   * @type {object}
   * @optional
   */
  propTypes: 'DEFINE_MANY',

  /**
   * Definition of context types for this component.
   *
   * @type {object}
   * @optional
   */
  contextTypes: 'DEFINE_MANY',

  /**
   * Definition of context types this component sets for its children.
   *
   * @type {object}
   * @optional
   */
  childContextTypes: 'DEFINE_MANY',

  // ==== Definition methods ====

  /**
   * Invoked when the component is mounted. Values in the mapping will be set on
   * `this.props` if that prop is not specified (i.e. using an `in` check).
   *
   * This method is invoked before `getInitialState` and therefore cannot rely
   * on `this.state` or use `this.setState`.
   *
   * @return {object}
   * @optional
   */
  getDefaultProps: 'DEFINE_MANY_MERGED',

  /**
   * Invoked once before the component is mounted. The return value will be used
   * as the initial value of `this.state`.
   *
   *   getInitialState: function() {
   *     return {
   *       isOn: false,
   *       fooBaz: new BazFoo()
   *     }
   *   }
   *
   * @return {object}
   * @optional
   */
  getInitialState: 'DEFINE_MANY_MERGED',

  /**
   * @return {object}
   * @optional
   */
  getChildContext: 'DEFINE_MANY_MERGED',

  /**
   * Uses props from `this.props` and state from `this.state` to render the
   * structure of the component.
   *
   * No guarantees are made about when or how often this method is invoked, so
   * it must not have side effects.
   *
   *   render: function() {
   *     var name = this.props.name;
   *     return <div>Hello, {name}!</div>;
   *   }
   *
   * @return {ReactComponent}
   * @nosideeffects
   * @required
   */
  render: 'DEFINE_ONCE',

  // ==== Delegate methods ====

  /**
   * Invoked when the component is initially created and about to be mounted.
   * This may have side effects, but any external subscriptions or data created
   * by this method must be cleaned up in `componentWillUnmount`.
   *
   * @optional
   */
  componentWillMount: 'DEFINE_MANY',

  /**
   * Invoked when the component has been mounted and has a DOM representation.
   * However, there is no guarantee that the DOM node is in the document.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been mounted (initialized and rendered) for the first time.
   *
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidMount: 'DEFINE_MANY',

  /**
   * Invoked before the component receives new props.
   *
   * Use this as an opportunity to react to a prop transition by updating the
   * state using `this.setState`. Current props are accessed via `this.props`.
   *
   *   componentWillReceiveProps: function(nextProps, nextContext) {
   *     this.setState({
   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
   *     });
   *   }
   *
   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
   * transition may cause a state change, but the opposite is not true. If you
   * need it, you are probably looking for `componentWillUpdate`.
   *
   * @param {object} nextProps
   * @optional
   */
  componentWillReceiveProps: 'DEFINE_MANY',

  /**
   * Invoked while deciding if the component should be updated as a result of
   * receiving new props, state and/or context.
   *
   * Use this as an opportunity to `return false` when you're certain that the
   * transition to the new props/state/context will not require a component
   * update.
   *
   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
   *     return !equal(nextProps, this.props) ||
   *       !equal(nextState, this.state) ||
   *       !equal(nextContext, this.context);
   *   }
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @return {boolean} True if the component should update.
   * @optional
   */
  shouldComponentUpdate: 'DEFINE_ONCE',

  /**
   * Invoked when the component is about to update due to a transition from
   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
   * and `nextContext`.
   *
   * Use this as an opportunity to perform preparation before an update occurs.
   *
   * NOTE: You **cannot** use `this.setState()` in this method.
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @param {ReactReconcileTransaction} transaction
   * @optional
   */
  componentWillUpdate: 'DEFINE_MANY',

  /**
   * Invoked when the component's DOM representation has been updated.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been updated.
   *
   * @param {object} prevProps
   * @param {?object} prevState
   * @param {?object} prevContext
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidUpdate: 'DEFINE_MANY',

  /**
   * Invoked when the component is about to be removed from its parent and have
   * its DOM representation destroyed.
   *
   * Use this as an opportunity to deallocate any external resources.
   *
   * NOTE: There is no `componentDidUnmount` since your component will have been
   * destroyed by that point.
   *
   * @optional
   */
  componentWillUnmount: 'DEFINE_MANY',

  // ==== Advanced methods ====

  /**
   * Updates the component's currently mounted DOM representation.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   * @overridable
   */
  updateComponent: 'OVERRIDE_BASE'

};

/**
 * Mapping from class specification keys to special processing functions.
 *
 * Although these are declared like instance properties in the specification
 * when defining classes using `React.createClass`, they are actually static
 * and are accessible on the constructor instead of the prototype. Despite
 * being static, they must be defined outside of the "statics" key under
 * which all other static methods are defined.
 */
var RESERVED_SPEC_KEYS = {
  displayName: function (Constructor, displayName) {
    Constructor.displayName = displayName;
  },
  mixins: function (Constructor, mixins) {
    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        mixSpecIntoComponent(Constructor, mixins[i]);
      }
    }
  },
  childContextTypes: function (Constructor, childContextTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, childContextTypes, 'childContext');
    }
    Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
  },
  contextTypes: function (Constructor, contextTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, contextTypes, 'context');
    }
    Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
  },
  /**
   * Special case getDefaultProps which should move into statics but requires
   * automatic merging.
   */
  getDefaultProps: function (Constructor, getDefaultProps) {
    if (Constructor.getDefaultProps) {
      Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
    } else {
      Constructor.getDefaultProps = getDefaultProps;
    }
  },
  propTypes: function (Constructor, propTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, propTypes, 'prop');
    }
    Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
  },
  statics: function (Constructor, statics) {
    mixStaticSpecIntoComponent(Constructor, statics);
  },
  autobind: function () {} };

function validateTypeDef(Constructor, typeDef, location) {
  for (var propName in typeDef) {
    if (typeDef.hasOwnProperty(propName)) {
      // use a warning instead of an invariant so components
      // don't show up in prod but only in __DEV__
      process.env.NODE_ENV !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
    }
  }
}

function validateMethodOverride(isAlreadyDefined, name) {
  var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

  // Disallow overriding of base class methods unless explicitly allowed.
  if (ReactClassMixin.hasOwnProperty(name)) {
    !(specPolicy === 'OVERRIDE_BASE') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.', name) : _prodInvariant('73', name) : void 0;
  }

  // Disallow defining methods more than once unless explicitly allowed.
  if (isAlreadyDefined) {
    !(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('74', name) : void 0;
  }
}

/**
 * Mixin helper which handles policy validation and reserved
 * specification keys when building React classes.
 */
function mixSpecIntoComponent(Constructor, spec) {
  if (!spec) {
    if (process.env.NODE_ENV !== 'production') {
      var typeofSpec = typeof spec;
      var isMixinValid = typeofSpec === 'object' && spec !== null;

      process.env.NODE_ENV !== 'production' ? warning(isMixinValid, '%s: You\'re attempting to include a mixin that is either null ' + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec) : void 0;
    }

    return;
  }

  !(typeof spec !== 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component class or function as a mixin. Instead, just use a regular object.') : _prodInvariant('75') : void 0;
  !!ReactElement.isValidElement(spec) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component as a mixin. Instead, just use a regular object.') : _prodInvariant('76') : void 0;

  var proto = Constructor.prototype;
  var autoBindPairs = proto.__reactAutoBindPairs;

  // By handling mixins before any other properties, we ensure the same
  // chaining order is applied to methods with DEFINE_MANY policy, whether
  // mixins are listed before or after these methods in the spec.
  if (spec.hasOwnProperty(MIXINS_KEY)) {
    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
  }

  for (var name in spec) {
    if (!spec.hasOwnProperty(name)) {
      continue;
    }

    if (name === MIXINS_KEY) {
      // We have already handled mixins in a special case above.
      continue;
    }

    var property = spec[name];
    var isAlreadyDefined = proto.hasOwnProperty(name);
    validateMethodOverride(isAlreadyDefined, name);

    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
      RESERVED_SPEC_KEYS[name](Constructor, property);
    } else {
      // Setup methods on prototype:
      // The following member methods should not be automatically bound:
      // 1. Expected ReactClass methods (in the "interface").
      // 2. Overridden methods (that were mixed in).
      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
      var isFunction = typeof property === 'function';
      var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

      if (shouldAutoBind) {
        autoBindPairs.push(name, property);
        proto[name] = property;
      } else {
        if (isAlreadyDefined) {
          var specPolicy = ReactClassInterface[name];

          // These cases should already be caught by validateMethodOverride.
          !(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY')) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.', specPolicy, name) : _prodInvariant('77', specPolicy, name) : void 0;

          // For methods which are defined more than once, call the existing
          // methods before calling the new property, merging if appropriate.
          if (specPolicy === 'DEFINE_MANY_MERGED') {
            proto[name] = createMergedResultFunction(proto[name], property);
          } else if (specPolicy === 'DEFINE_MANY') {
            proto[name] = createChainedFunction(proto[name], property);
          }
        } else {
          proto[name] = property;
          if (process.env.NODE_ENV !== 'production') {
            // Add verbose displayName to the function, which helps when looking
            // at profiling tools.
            if (typeof property === 'function' && spec.displayName) {
              proto[name].displayName = spec.displayName + '_' + name;
            }
          }
        }
      }
    }
  }
}

function mixStaticSpecIntoComponent(Constructor, statics) {
  if (!statics) {
    return;
  }
  for (var name in statics) {
    var property = statics[name];
    if (!statics.hasOwnProperty(name)) {
      continue;
    }

    var isReserved = name in RESERVED_SPEC_KEYS;
    !!isReserved ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.', name) : _prodInvariant('78', name) : void 0;

    var isInherited = name in Constructor;
    !!isInherited ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('79', name) : void 0;
    Constructor[name] = property;
  }
}

/**
 * Merge two objects, but throw if both contain the same key.
 *
 * @param {object} one The first object, which is mutated.
 * @param {object} two The second object
 * @return {object} one after it has been mutated to contain everything in two.
 */
function mergeIntoWithNoDuplicateKeys(one, two) {
  !(one && two && typeof one === 'object' && typeof two === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : _prodInvariant('80') : void 0;

  for (var key in two) {
    if (two.hasOwnProperty(key)) {
      !(one[key] === undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.', key) : _prodInvariant('81', key) : void 0;
      one[key] = two[key];
    }
  }
  return one;
}

/**
 * Creates a function that invokes two functions and merges their return values.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createMergedResultFunction(one, two) {
  return function mergedResult() {
    var a = one.apply(this, arguments);
    var b = two.apply(this, arguments);
    if (a == null) {
      return b;
    } else if (b == null) {
      return a;
    }
    var c = {};
    mergeIntoWithNoDuplicateKeys(c, a);
    mergeIntoWithNoDuplicateKeys(c, b);
    return c;
  };
}

/**
 * Creates a function that invokes two functions and ignores their return vales.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createChainedFunction(one, two) {
  return function chainedFunction() {
    one.apply(this, arguments);
    two.apply(this, arguments);
  };
}

/**
 * Binds a method to the component.
 *
 * @param {object} component Component whose method is going to be bound.
 * @param {function} method Method to be bound.
 * @return {function} The bound method.
 */
function bindAutoBindMethod(component, method) {
  var boundMethod = method.bind(component);
  if (process.env.NODE_ENV !== 'production') {
    boundMethod.__reactBoundContext = component;
    boundMethod.__reactBoundMethod = method;
    boundMethod.__reactBoundArguments = null;
    var componentName = component.constructor.displayName;
    var _bind = boundMethod.bind;
    boundMethod.bind = function (newThis) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      // User is trying to bind() an autobound method; we effectively will
      // ignore the value of "this" that the user is trying to use, so
      // let's warn.
      if (newThis !== component && newThis !== null) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
      } else if (!args.length) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
        return boundMethod;
      }
      var reboundMethod = _bind.apply(boundMethod, arguments);
      reboundMethod.__reactBoundContext = component;
      reboundMethod.__reactBoundMethod = method;
      reboundMethod.__reactBoundArguments = args;
      return reboundMethod;
    };
  }
  return boundMethod;
}

/**
 * Binds all auto-bound methods in a component.
 *
 * @param {object} component Component whose method is going to be bound.
 */
function bindAutoBindMethods(component) {
  var pairs = component.__reactAutoBindPairs;
  for (var i = 0; i < pairs.length; i += 2) {
    var autoBindKey = pairs[i];
    var method = pairs[i + 1];
    component[autoBindKey] = bindAutoBindMethod(component, method);
  }
}

/**
 * Add more to the ReactClass base class. These are all legacy features and
 * therefore not already part of the modern ReactComponent.
 */
var ReactClassMixin = {

  /**
   * TODO: This will be deprecated because state should always keep a consistent
   * type signature and the only use case for this, is to avoid that.
   */
  replaceState: function (newState, callback) {
    this.updater.enqueueReplaceState(this, newState);
    if (callback) {
      this.updater.enqueueCallback(this, callback, 'replaceState');
    }
  },

  /**
   * Checks whether or not this composite component is mounted.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function () {
    return this.updater.isMounted(this);
  }
};

var ReactClassComponent = function () {};
_assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

/**
 * Module for creating composite components.
 *
 * @class ReactClass
 */
var ReactClass = {

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  createClass: function (spec) {
    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function (props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (process.env.NODE_ENV !== 'production') {
        // We allow auto-mocks to proceed as if they're returning null.
        if (initialState === undefined && this.getInitialState._isMockFunction) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      !(typeof initialState === 'object' && !Array.isArray(initialState)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : _prodInvariant('82', Constructor.displayName || 'ReactCompositeComponent') : void 0;

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, spec);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (process.env.NODE_ENV !== 'production') {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    !Constructor.prototype.render ? process.env.NODE_ENV !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : _prodInvariant('83') : void 0;

    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  },

  injection: {
    injectMixin: function (mixin) {
      injectedMixins.push(mixin);
    }
  }

};

module.exports = ReactClass;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var ReactElement = __webpack_require__(4);

/**
 * Create a factory that creates HTML tag elements.
 *
 * @private
 */
var createDOMFactory = ReactElement.createFactory;
if (process.env.NODE_ENV !== 'production') {
  var ReactElementValidator = __webpack_require__(19);
  createDOMFactory = ReactElementValidator.createFactory;
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 * This is also accessible via `React.DOM`.
 *
 * @public
 */
var ReactDOMFactories = {
  a: createDOMFactory('a'),
  abbr: createDOMFactory('abbr'),
  address: createDOMFactory('address'),
  area: createDOMFactory('area'),
  article: createDOMFactory('article'),
  aside: createDOMFactory('aside'),
  audio: createDOMFactory('audio'),
  b: createDOMFactory('b'),
  base: createDOMFactory('base'),
  bdi: createDOMFactory('bdi'),
  bdo: createDOMFactory('bdo'),
  big: createDOMFactory('big'),
  blockquote: createDOMFactory('blockquote'),
  body: createDOMFactory('body'),
  br: createDOMFactory('br'),
  button: createDOMFactory('button'),
  canvas: createDOMFactory('canvas'),
  caption: createDOMFactory('caption'),
  cite: createDOMFactory('cite'),
  code: createDOMFactory('code'),
  col: createDOMFactory('col'),
  colgroup: createDOMFactory('colgroup'),
  data: createDOMFactory('data'),
  datalist: createDOMFactory('datalist'),
  dd: createDOMFactory('dd'),
  del: createDOMFactory('del'),
  details: createDOMFactory('details'),
  dfn: createDOMFactory('dfn'),
  dialog: createDOMFactory('dialog'),
  div: createDOMFactory('div'),
  dl: createDOMFactory('dl'),
  dt: createDOMFactory('dt'),
  em: createDOMFactory('em'),
  embed: createDOMFactory('embed'),
  fieldset: createDOMFactory('fieldset'),
  figcaption: createDOMFactory('figcaption'),
  figure: createDOMFactory('figure'),
  footer: createDOMFactory('footer'),
  form: createDOMFactory('form'),
  h1: createDOMFactory('h1'),
  h2: createDOMFactory('h2'),
  h3: createDOMFactory('h3'),
  h4: createDOMFactory('h4'),
  h5: createDOMFactory('h5'),
  h6: createDOMFactory('h6'),
  head: createDOMFactory('head'),
  header: createDOMFactory('header'),
  hgroup: createDOMFactory('hgroup'),
  hr: createDOMFactory('hr'),
  html: createDOMFactory('html'),
  i: createDOMFactory('i'),
  iframe: createDOMFactory('iframe'),
  img: createDOMFactory('img'),
  input: createDOMFactory('input'),
  ins: createDOMFactory('ins'),
  kbd: createDOMFactory('kbd'),
  keygen: createDOMFactory('keygen'),
  label: createDOMFactory('label'),
  legend: createDOMFactory('legend'),
  li: createDOMFactory('li'),
  link: createDOMFactory('link'),
  main: createDOMFactory('main'),
  map: createDOMFactory('map'),
  mark: createDOMFactory('mark'),
  menu: createDOMFactory('menu'),
  menuitem: createDOMFactory('menuitem'),
  meta: createDOMFactory('meta'),
  meter: createDOMFactory('meter'),
  nav: createDOMFactory('nav'),
  noscript: createDOMFactory('noscript'),
  object: createDOMFactory('object'),
  ol: createDOMFactory('ol'),
  optgroup: createDOMFactory('optgroup'),
  option: createDOMFactory('option'),
  output: createDOMFactory('output'),
  p: createDOMFactory('p'),
  param: createDOMFactory('param'),
  picture: createDOMFactory('picture'),
  pre: createDOMFactory('pre'),
  progress: createDOMFactory('progress'),
  q: createDOMFactory('q'),
  rp: createDOMFactory('rp'),
  rt: createDOMFactory('rt'),
  ruby: createDOMFactory('ruby'),
  s: createDOMFactory('s'),
  samp: createDOMFactory('samp'),
  script: createDOMFactory('script'),
  section: createDOMFactory('section'),
  select: createDOMFactory('select'),
  small: createDOMFactory('small'),
  source: createDOMFactory('source'),
  span: createDOMFactory('span'),
  strong: createDOMFactory('strong'),
  style: createDOMFactory('style'),
  sub: createDOMFactory('sub'),
  summary: createDOMFactory('summary'),
  sup: createDOMFactory('sup'),
  table: createDOMFactory('table'),
  tbody: createDOMFactory('tbody'),
  td: createDOMFactory('td'),
  textarea: createDOMFactory('textarea'),
  tfoot: createDOMFactory('tfoot'),
  th: createDOMFactory('th'),
  thead: createDOMFactory('thead'),
  time: createDOMFactory('time'),
  title: createDOMFactory('title'),
  tr: createDOMFactory('tr'),
  track: createDOMFactory('track'),
  u: createDOMFactory('u'),
  ul: createDOMFactory('ul'),
  'var': createDOMFactory('var'),
  video: createDOMFactory('video'),
  wbr: createDOMFactory('wbr'),

  // SVG
  circle: createDOMFactory('circle'),
  clipPath: createDOMFactory('clipPath'),
  defs: createDOMFactory('defs'),
  ellipse: createDOMFactory('ellipse'),
  g: createDOMFactory('g'),
  image: createDOMFactory('image'),
  line: createDOMFactory('line'),
  linearGradient: createDOMFactory('linearGradient'),
  mask: createDOMFactory('mask'),
  path: createDOMFactory('path'),
  pattern: createDOMFactory('pattern'),
  polygon: createDOMFactory('polygon'),
  polyline: createDOMFactory('polyline'),
  radialGradient: createDOMFactory('radialGradient'),
  rect: createDOMFactory('rect'),
  stop: createDOMFactory('stop'),
  svg: createDOMFactory('svg'),
  text: createDOMFactory('text'),
  tspan: createDOMFactory('tspan')
};

module.exports = ReactDOMFactories;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var ReactElement = __webpack_require__(4);
var ReactPropTypeLocationNames = __webpack_require__(14);
var ReactPropTypesSecret = __webpack_require__(20);

var emptyFunction = __webpack_require__(9);
var getIteratorFn = __webpack_require__(16);
var warning = __webpack_require__(1);

/**
 * Collection of methods that allow declaration and validation of props that are
 * supplied to React components. Example usage:
 *
 *   var Props = require('ReactPropTypes');
 *   var MyArticle = React.createClass({
 *     propTypes: {
 *       // An optional string prop named "description".
 *       description: Props.string,
 *
 *       // A required enum prop named "category".
 *       category: Props.oneOf(['News','Photos']).isRequired,
 *
 *       // A prop named "dialog" that requires an instance of Dialog.
 *       dialog: Props.instanceOf(Dialog).isRequired
 *     },
 *     render: function() { ... }
 *   });
 *
 * A more formal specification of how these methods are used:
 *
 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
 *   decl := ReactPropTypes.{type}(.isRequired)?
 *
 * Each and every declaration produces a function with the same signature. This
 * allows the creation of custom validation functions. For example:
 *
 *  var MyLink = React.createClass({
 *    propTypes: {
 *      // An optional string or URI prop named "href".
 *      href: function(props, propName, componentName) {
 *        var propValue = props[propName];
 *        if (propValue != null && typeof propValue !== 'string' &&
 *            !(propValue instanceof URI)) {
 *          return new Error(
 *            'Expected a string or an URI for ' + propName + ' in ' +
 *            componentName
 *          );
 *        }
 *      }
 *    },
 *    render: function() {...}
 *  });
 *
 * @internal
 */

var ANONYMOUS = '<<anonymous>>';

var ReactPropTypes = {
  array: createPrimitiveTypeChecker('array'),
  bool: createPrimitiveTypeChecker('boolean'),
  func: createPrimitiveTypeChecker('function'),
  number: createPrimitiveTypeChecker('number'),
  object: createPrimitiveTypeChecker('object'),
  string: createPrimitiveTypeChecker('string'),
  symbol: createPrimitiveTypeChecker('symbol'),

  any: createAnyTypeChecker(),
  arrayOf: createArrayOfTypeChecker,
  element: createElementTypeChecker(),
  instanceOf: createInstanceTypeChecker,
  node: createNodeChecker(),
  objectOf: createObjectOfTypeChecker,
  oneOf: createEnumTypeChecker,
  oneOfType: createUnionTypeChecker,
  shape: createShapeTypeChecker
};

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
/*eslint-disable no-self-compare*/
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}
/*eslint-enable no-self-compare*/

/**
 * We use an Error-like object for backward compatibility as people may call
 * PropTypes directly and inspect their output. However we don't use real
 * Errors anymore. We don't inspect their stack anyway, and creating them
 * is prohibitively expensive if they are created too often, such as what
 * happens in oneOfType() for any type before the one that matched.
 */
function PropTypeError(message) {
  this.message = message;
  this.stack = '';
}
// Make `instanceof Error` still work for returned errors.
PropTypeError.prototype = Error.prototype;

function createChainableTypeChecker(validate) {
  if (process.env.NODE_ENV !== 'production') {
    var manualPropTypeCallCache = {};
  }
  function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
    componentName = componentName || ANONYMOUS;
    propFullName = propFullName || propName;
    if (process.env.NODE_ENV !== 'production') {
      if (secret !== ReactPropTypesSecret && typeof console !== 'undefined') {
        var cacheKey = componentName + ':' + propName;
        if (!manualPropTypeCallCache[cacheKey]) {
          process.env.NODE_ENV !== 'production' ? warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will not work in production with the next major version. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName) : void 0;
          manualPropTypeCallCache[cacheKey] = true;
        }
      }
    }
    if (props[propName] == null) {
      var locationName = ReactPropTypeLocationNames[location];
      if (isRequired) {
        if (props[propName] === null) {
          return new PropTypeError('The ' + locationName + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
        }
        return new PropTypeError('The ' + locationName + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
      }
      return null;
    } else {
      return validate(props, propName, componentName, location, propFullName);
    }
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function createPrimitiveTypeChecker(expectedType) {
  function validate(props, propName, componentName, location, propFullName, secret) {
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== expectedType) {
      var locationName = ReactPropTypeLocationNames[location];
      // `propValue` being instance of, say, date/regexp, pass the 'object'
      // check, but we can offer a more precise error message here rather than
      // 'of type `object`'.
      var preciseType = getPreciseType(propValue);

      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createAnyTypeChecker() {
  return createChainableTypeChecker(emptyFunction.thatReturns(null));
}

function createArrayOfTypeChecker(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    if (typeof typeChecker !== 'function') {
      return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
    }
    var propValue = props[propName];
    if (!Array.isArray(propValue)) {
      var locationName = ReactPropTypeLocationNames[location];
      var propType = getPropType(propValue);
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
    }
    for (var i = 0; i < propValue.length; i++) {
      var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
      if (error instanceof Error) {
        return error;
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createElementTypeChecker() {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    if (!ReactElement.isValidElement(propValue)) {
      var locationName = ReactPropTypeLocationNames[location];
      var propType = getPropType(propValue);
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createInstanceTypeChecker(expectedClass) {
  function validate(props, propName, componentName, location, propFullName) {
    if (!(props[propName] instanceof expectedClass)) {
      var locationName = ReactPropTypeLocationNames[location];
      var expectedClassName = expectedClass.name || ANONYMOUS;
      var actualClassName = getClassName(props[propName]);
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createEnumTypeChecker(expectedValues) {
  if (!Array.isArray(expectedValues)) {
    process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
    return emptyFunction.thatReturnsNull;
  }

  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    for (var i = 0; i < expectedValues.length; i++) {
      if (is(propValue, expectedValues[i])) {
        return null;
      }
    }

    var locationName = ReactPropTypeLocationNames[location];
    var valuesString = JSON.stringify(expectedValues);
    return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
  }
  return createChainableTypeChecker(validate);
}

function createObjectOfTypeChecker(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    if (typeof typeChecker !== 'function') {
      return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
    }
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== 'object') {
      var locationName = ReactPropTypeLocationNames[location];
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
    }
    for (var key in propValue) {
      if (propValue.hasOwnProperty(key)) {
        var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createUnionTypeChecker(arrayOfTypeCheckers) {
  if (!Array.isArray(arrayOfTypeCheckers)) {
    process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
    return emptyFunction.thatReturnsNull;
  }

  function validate(props, propName, componentName, location, propFullName) {
    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
        return null;
      }
    }

    var locationName = ReactPropTypeLocationNames[location];
    return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
  }
  return createChainableTypeChecker(validate);
}

function createNodeChecker() {
  function validate(props, propName, componentName, location, propFullName) {
    if (!isNode(props[propName])) {
      var locationName = ReactPropTypeLocationNames[location];
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createShapeTypeChecker(shapeTypes) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== 'object') {
      var locationName = ReactPropTypeLocationNames[location];
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
    }
    for (var key in shapeTypes) {
      var checker = shapeTypes[key];
      if (!checker) {
        continue;
      }
      var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
      if (error) {
        return error;
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function isNode(propValue) {
  switch (typeof propValue) {
    case 'number':
    case 'string':
    case 'undefined':
      return true;
    case 'boolean':
      return !propValue;
    case 'object':
      if (Array.isArray(propValue)) {
        return propValue.every(isNode);
      }
      if (propValue === null || ReactElement.isValidElement(propValue)) {
        return true;
      }

      var iteratorFn = getIteratorFn(propValue);
      if (iteratorFn) {
        var iterator = iteratorFn.call(propValue);
        var step;
        if (iteratorFn !== propValue.entries) {
          while (!(step = iterator.next()).done) {
            if (!isNode(step.value)) {
              return false;
            }
          }
        } else {
          // Iterator will provide entry [k,v] tuples rather than values.
          while (!(step = iterator.next()).done) {
            var entry = step.value;
            if (entry) {
              if (!isNode(entry[1])) {
                return false;
              }
            }
          }
        }
      } else {
        return false;
      }

      return true;
    default:
      return false;
  }
}

function isSymbol(propType, propValue) {
  // Native Symbol.
  if (propType === 'symbol') {
    return true;
  }

  // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
  if (propValue['@@toStringTag'] === 'Symbol') {
    return true;
  }

  // Fallback for non-spec compliant Symbols which are polyfilled.
  if (typeof Symbol === 'function' && propValue instanceof Symbol) {
    return true;
  }

  return false;
}

// Equivalent of `typeof` but with special handling for array and regexp.
function getPropType(propValue) {
  var propType = typeof propValue;
  if (Array.isArray(propValue)) {
    return 'array';
  }
  if (propValue instanceof RegExp) {
    // Old webkits (at least until Android 4.0) return 'function' rather than
    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
    // passes PropTypes.object.
    return 'object';
  }
  if (isSymbol(propType, propValue)) {
    return 'symbol';
  }
  return propType;
}

// This handles more types than `getPropType`. Only used for error messages.
// See `createPrimitiveTypeChecker`.
function getPreciseType(propValue) {
  var propType = getPropType(propValue);
  if (propType === 'object') {
    if (propValue instanceof Date) {
      return 'date';
    } else if (propValue instanceof RegExp) {
      return 'regexp';
    }
  }
  return propType;
}

// Returns class name of the object, if any.
function getClassName(propValue) {
  if (!propValue.constructor || !propValue.constructor.name) {
    return ANONYMOUS;
  }
  return propValue.constructor.name;
}

module.exports = ReactPropTypes;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(7);

var ReactComponent = __webpack_require__(11);
var ReactNoopUpdateQueue = __webpack_require__(13);

var emptyObject = __webpack_require__(10);

/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;
ReactPureComponent.prototype = new ComponentDummy();
ReactPureComponent.prototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
_assign(ReactPureComponent.prototype, ReactComponent.prototype);
ReactPureComponent.prototype.isPureReactComponent = true;

module.exports = ReactPureComponent;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



module.exports = '15.4.2';

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(5);

var ReactPropTypeLocationNames = __webpack_require__(14);
var ReactPropTypesSecret = __webpack_require__(20);

var invariant = __webpack_require__(3);
var warning = __webpack_require__(1);

var ReactComponentTreeHook;

if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
  // Temporary hack.
  // Inline requires don't work well with Jest:
  // https://github.com/facebook/react/issues/7240
  // Remove the inline requires when we don't need them anymore:
  // https://github.com/facebook/react/pull/7178
  ReactComponentTreeHook = __webpack_require__(12);
}

var loggedTypeFailures = {};

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?object} element The React element that is being type-checked
 * @param {?number} debugID The React component instance that is being type-checked
 * @private
 */
function checkReactTypeSpec(typeSpecs, values, location, componentName, element, debugID) {
  for (var typeSpecName in typeSpecs) {
    if (typeSpecs.hasOwnProperty(typeSpecName)) {
      var error;
      // Prop type validation may throw. In case they do, we don't want to
      // fail the render phase where it didn't fail before. So we log it.
      // After these have been cleaned up, we'll let them throw.
      try {
        // This is intentionally an invariant that gets caught. It's the same
        // behavior as without this statement except with a better message.
        !(typeof typeSpecs[typeSpecName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : _prodInvariant('84', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : void 0;
        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
      } catch (ex) {
        error = ex;
      }
      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName, typeof error) : void 0;
      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
        // Only monitor this failure once because there tends to be a lot of the
        // same error.
        loggedTypeFailures[error.message] = true;

        var componentStackInfo = '';

        if (process.env.NODE_ENV !== 'production') {
          if (!ReactComponentTreeHook) {
            ReactComponentTreeHook = __webpack_require__(12);
          }
          if (debugID !== null) {
            componentStackInfo = ReactComponentTreeHook.getStackAddendumByID(debugID);
          } else if (element !== null) {
            componentStackInfo = ReactComponentTreeHook.getCurrentStackAddendum(element);
          }
        }

        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
      }
    }
  }
}

module.exports = checkReactTypeSpec;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */


var _prodInvariant = __webpack_require__(5);

var ReactElement = __webpack_require__(4);

var invariant = __webpack_require__(3);

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'React.Children.only expected to receive a single React element child.') : _prodInvariant('143') : void 0;
  return children;
}

module.exports = onlyChild;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(5);

var ReactCurrentOwner = __webpack_require__(8);
var REACT_ELEMENT_TYPE = __webpack_require__(18);

var getIteratorFn = __webpack_require__(16);
var invariant = __webpack_require__(3);
var KeyEscapeUtils = __webpack_require__(27);
var warning = __webpack_require__(1);

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * This is inlined from ReactElement since this file is shared between
 * isomorphic and renderers. We could extract this to a
 *
 */

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (component && typeof component === 'object' && component.key != null) {
    // Explicit key
    return KeyEscapeUtils.escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' ||
  // The following is inlined from ReactElement. This means we can optimize
  // some checks. React Fiber also inlines this logic for similar purposes.
  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (iteratorFn) {
      var iterator = iteratorFn.call(children);
      var step;
      if (iteratorFn !== children.entries) {
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        if (process.env.NODE_ENV !== 'production') {
          var mapsAsChildrenAddendum = '';
          if (ReactCurrentOwner.current) {
            var mapsAsChildrenOwnerName = ReactCurrentOwner.current.getName();
            if (mapsAsChildrenOwnerName) {
              mapsAsChildrenAddendum = ' Check the render method of `' + mapsAsChildrenOwnerName + '`.';
            }
          }
          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.%s', mapsAsChildrenAddendum) : void 0;
          didWarnAboutMaps = true;
        }
        // Iterator will provide entry [k,v] tuples rather than values.
        while (!(step = iterator.next()).done) {
          var entry = step.value;
          if (entry) {
            child = entry[1];
            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        }
      }
    } else if (type === 'object') {
      var addendum = '';
      if (process.env.NODE_ENV !== 'production') {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
        if (children._isReactElement) {
          addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
        }
        if (ReactCurrentOwner.current) {
          var name = ReactCurrentOwner.current.getName();
          if (name) {
            addendum += ' Check the render method of `' + name + '`.';
          }
        }
      }
      var childrenString = String(children);
       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : _prodInvariant('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : void 0;
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

module.exports = traverseAllChildren;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
/******/ ]);