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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ActionElement.ts":
/*!******************************!*\
  !*** ./src/ActionElement.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ActionElement = /** @class */ (function () {
    function ActionElement(action) {
        var _this = this;
        this.action = action;
        this._tr = document.createElement('tr');
        var clazz = action.desirability;
        var nameTd = document.createElement('td');
        nameTd.innerText = action.name;
        nameTd.setAttribute("class", clazz);
        this._tr.appendChild(nameTd);
        var timeTd = document.createElement('td');
        timeTd.innerText = action.elapsedTime.toString();
        timeTd.setAttribute("class", clazz);
        this._tr.appendChild(timeTd);
        var buttonTd = document.createElement('td');
        var button = document.createElement('button');
        button.innerText = "Start";
        buttonTd.appendChild(button);
        this._tr.appendChild(buttonTd);
        var handle;
        buttonTd.onclick = function () {
            if (_this.action.isStart) {
                _this.action.stop();
                button.innerText = "Start";
                clearInterval(handle);
            }
            else {
                _this.action.start();
                button.innerText = "Stop";
                handle = setInterval(function () {
                    var duration = _this.action.elapsedTime;
                    timeTd.innerText = duration.toString();
                }, 110);
            }
        };
    }
    Object.defineProperty(ActionElement.prototype, "tr", {
        get: function () { return this._tr; },
        enumerable: true,
        configurable: true
    });
    ;
    return ActionElement;
}());
exports.ActionElement = ActionElement;


/***/ }),

/***/ "./src/VirtueTimeElement.ts":
/*!**********************************!*\
  !*** ./src/VirtueTimeElement.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Duration_1 = __webpack_require__(/*! ./core/Duration */ "./src/core/Duration.ts");
var VirtueTimeElement = /** @class */ (function () {
    function VirtueTimeElement(_actions) {
        var _this = this;
        this._actions = _actions;
        this._h1 = document.createElement('h1');
        setInterval(function () {
            var virtualTime = _this.calcVirtualTime();
            _this._h1.innerText = "Virtue Time : " + virtualTime.toString();
            if (virtualTime.msec < 0) {
                _this._h1.setAttribute("class", "Negative");
            }
            else {
                _this._h1.setAttribute("class", "Positive");
            }
        }, 123);
    }
    VirtueTimeElement.prototype.calcVirtualTime = function () {
        return this._actions.reduce(function (prev, curr) {
            switch (curr.desirability) {
                case "Good":
                    return prev.add(curr.elapsedTime);
                case "Bad":
                    return prev.subtract(curr.elapsedTime);
                default:
                    return prev;
            }
        }, new Duration_1.Duration(0));
    };
    Object.defineProperty(VirtueTimeElement.prototype, "h1", {
        get: function () { return this._h1; },
        enumerable: true,
        configurable: true
    });
    ;
    return VirtueTimeElement;
}());
exports.VirtueTimeElement = VirtueTimeElement;


/***/ }),

/***/ "./src/core/Action.ts":
/*!****************************!*\
  !*** ./src/core/Action.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TrackingLog_1 = __webpack_require__(/*! ./TrackingLog */ "./src/core/TrackingLog.ts");
var Duration_1 = __webpack_require__(/*! ./Duration */ "./src/core/Duration.ts");
var Action = /** @class */ (function () {
    function Action(_name, _desirability, _trackingLogs) {
        this._name = _name;
        this._desirability = _desirability;
        this._trackingLogs = _trackingLogs;
        //タイムはシリアライズ対象外にしよう
        this._duration = new Duration_1.Duration(0);
    }
    Object.defineProperty(Action.prototype, "name", {
        get: function () { return this._name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Action.prototype, "desirability", {
        get: function () { return this._desirability; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Action.prototype, "isStart", {
        get: function () { return !!this.startDate; },
        enumerable: true,
        configurable: true
    });
    Action.prototype.start = function () {
        this.startDate = new Date();
    };
    Action.prototype.stop = function () {
        if (this.startDate) {
            this._trackingLogs.push(new TrackingLog_1.TrackingLog(this.startDate, new Date()));
            this._duration = this.elapsedTime;
            this.startDate = undefined;
        }
    };
    Object.defineProperty(Action.prototype, "elapsedTime", {
        get: function () {
            if (this.isStart && this.startDate) {
                var currentDuration = new Duration_1.Duration(this.startDate, new Date());
                return this._duration.add(currentDuration);
            }
            return this._duration;
        },
        enumerable: true,
        configurable: true
    });
    return Action;
}());
exports.Action = Action;


/***/ }),

/***/ "./src/core/Duration.ts":
/*!******************************!*\
  !*** ./src/core/Duration.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Duration = /** @class */ (function () {
    function Duration(msecOrDate, date2) {
        if (typeof msecOrDate === "number") {
            this._msec = msecOrDate;
            return;
        }
        if (date2) {
            this._msec = date2.getTime() - msecOrDate.getTime();
            return;
        }
        this._msec = 0;
    }
    Object.defineProperty(Duration.prototype, "msec", {
        get: function () { return this._msec; },
        enumerable: true,
        configurable: true
    });
    Duration.prototype.add = function (msecOrDuration) {
        if (typeof msecOrDuration === "number") {
            var msec = msecOrDuration;
            return new Duration(this._msec + msec);
        }
        ;
        var duration = msecOrDuration;
        return new Duration(this._msec + duration._msec);
    };
    Duration.prototype.subtract = function (msecOrDuration) {
        if (typeof msecOrDuration === "number") {
            var msec = msecOrDuration;
            return new Duration(this._msec - msec);
        }
        ;
        var duration = msecOrDuration;
        return new Duration(this._msec - duration._msec);
    };
    Duration.prototype.toString = function () {
        var sign = this._msec >= 0 ? "" : "-";
        var absMsec = Math.abs(this._msec);
        var hour = Math.floor(absMsec / (1000 * 60 * 60));
        var minute = Math.floor((absMsec % (1000 * 60 * 60)) / (1000 * 60));
        var second = Math.floor((absMsec % (1000 * 60)) / 1000);
        var msec = absMsec % 1000;
        return "" + sign + this.fillZero(hour) + ":" + this.fillZero(minute) + ":" + this.fillZero(second) + ":" + this.fillZero(msec, 3);
        //return `${this.fillZero(hour)}:${this.fillZero(minute)}:${this.fillZero(second)}`;
    };
    Duration.prototype.fillZero = function (num, digit) {
        if (digit === void 0) { digit = 2; }
        return ("0".repeat(digit) + num.toString()).slice(-digit);
    };
    return Duration;
}());
exports.Duration = Duration;


/***/ }),

/***/ "./src/core/TrackingLog.ts":
/*!*********************************!*\
  !*** ./src/core/TrackingLog.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TrackingLog = /** @class */ (function () {
    function TrackingLog(_start, _end) {
        this._start = _start;
        this._end = _end;
    }
    Object.defineProperty(TrackingLog.prototype, "start", {
        get: function () { return this._start; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TrackingLog.prototype, "end", {
        get: function () { return this._end; },
        enumerable: true,
        configurable: true
    });
    return TrackingLog;
}());
exports.TrackingLog = TrackingLog;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ActionElement_1 = __webpack_require__(/*! ./ActionElement */ "./src/ActionElement.ts");
var Action_1 = __webpack_require__(/*! ./core/Action */ "./src/core/Action.ts");
var VirtueTimeElement_1 = __webpack_require__(/*! ./VirtueTimeElement */ "./src/VirtueTimeElement.ts");
window.onload = function () {
    var _a;
    var actions = [
        new Action_1.Action("音楽", "Good", []),
        new Action_1.Action("プログラミング", "Good", []),
        new Action_1.Action("トレーニング", "Good", []),
        new Action_1.Action("掃除", "Good", []),
        new Action_1.Action("数学", "Good", []),
        new Action_1.Action("漫画", "Neautoral", []),
        new Action_1.Action("アニメ", "Neautoral", []),
        new Action_1.Action("映画", "Neautoral", []),
        new Action_1.Action("ポケモン", "Neautoral", []),
        new Action_1.Action("ぷよぷよ", "Bad", []),
        new Action_1.Action("ネットサーフィン", "Bad", [])
    ];
    actions.map(function (a) { return new ActionElement_1.ActionElement(a); })
        .forEach(function (e) { var _a; return (_a = document.querySelector("tbody")) === null || _a === void 0 ? void 0 : _a.appendChild(e.tr); });
    var virtueTimeElement = new VirtueTimeElement_1.VirtueTimeElement(actions);
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.insertBefore(virtueTimeElement.h1, document.querySelector(".container>table"));
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map