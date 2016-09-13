var vendor_library =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	(function (factory) {
	    if (( false ? 'undefined' : _typeof(exports)) === 'object') {
	        // CommonJS
	        module.exports = factory(window, document);
	    } else {
	        // Browser
	        window.util = factory(window, document);
	    }
	})(function (window, document) {
	    'use strict';

	    var util = {
	        prompt: function prompt(args) {
	            var opts = {
	                type: "fail",
	                text: "操作失败",
	                time: 2e3
	            };
	            $.extend(opts, args);
	            var type_class = "prompt-box-text";
	            if (opts.type == "fail") {
	                type_class = "prompt-box-text prompt-box-error";
	            }
	            var h = '<div class="prompt-box-wrap"><div class="prompt-box-black"></div><div class="' + type_class + '"><span></span>' + opts.text + "</div></div>";
	            if ($(".prompt-box-wrap").length) {
	                $(".prompt-box-wrap").remove();
	            }
	            $("body").append(h);
	            window.setTimeout(function () {
	                $(".prompt-box-wrap").hide();
	                if (opts.callback) {
	                    opts.callback();
	                }
	                // opts.callback && opts.callback();
	            }, opts.time);
	        },
	        getUrlParam: function getUrlParam(name) {
	            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	            var r = window.location.search.substr(1).match(reg);
	            if (r !== null) return decodeURI(r[2]);
	            return null;
	        },
	        loading: {
	            node: $('<div class="spinner-overlay"></div><div class="spinner"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div>'),
	            show: function show() {
	                $('body').append(this.node);
	            },
	            hide: function hide() {
	                this.node.remove();
	            }
	        },
	        dowloadProgress: function () {
	            var progress;

	            var tmpl = {
	                node: '<div class="progress-wrap">' + '<div class="progress-body">' + '<div class="progress">' + '<div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar">' + '<span class="progress-number">0</span>%' + '</div>' + '</div>' + '<div class="content-wrap">' + '<div class="content-customer">' + '<p class="tips">请等待...</p>' +
	                // '<a class="btn btn-success hide">下载</a>' +
	                '</div>' + '</div>' + '</div>'
	            };

	            function Progress(options) {
	                this.options = options;
	                this.init();
	            }

	            Progress.prototype.init = Progress.prototype.reset = function () {
	                var options = this.options;
	                if (this.progressDialog && this.progressDialog.remove) {
	                    this.progressDialog.remove();
	                }
	                this.progressDialog = new dialog({
	                    title: '进度' || options.title,
	                    content: tmpl.node,
	                    onclose: options.onclose,
	                    cancel: false
	                });
	                this.$node = $('.ui-dialog-body').find('.progress-wrap');
	                this.$progressBar = this.$node.find('.progress-bar');
	                this.$progressNumber = this.$node.find('.progress-number');
	                this.$contentWrap = this.$node.find('.content-wrap');
	                // var content = options.content;
	                // if(content !== undefined) {
	                //     this.$contentWrap.append(content);
	                // }
	                // $('body').append(this.$node);
	            };

	            Progress.prototype.show = function () {
	                this.reset();
	                if (this.progressDialog && this.progressDialog.showModal) {
	                    this.progressDialog.showModal();
	                }
	            };

	            Progress.prototype.update = function (number) {
	                var $progressBar = this.$progressBar;
	                var $progressNumber = this.$progressNumber;
	                $progressBar.css({
	                    width: number + '%'
	                });
	                $progressNumber.text(number);
	                // $('body').append(this.$node);
	            };

	            Progress.prototype.success = function (msg) {
	                var $btn = this.$node.find('.btn');
	                var $tips = this.$node.find('.tips');
	                $btn.removeClass('hide');
	                $tips.text(msg || '生成成功').addClass('success');
	                this.progressDialog.button([{
	                    value: '确定',
	                    autofocus: true
	                }]);
	                // $('body').append(this.$node);
	            };
	            Progress.prototype.fail = function (msg) {
	                var $tips = this.$node.find('.tips');
	                var $progressBar = this.$progressBar;
	                $progressBar.addClass('progress-bar-danger');
	                $tips.text(msg || '生成失败').addClass('fail');

	                this.progressDialog.button([{
	                    value: '关闭'
	                }]);
	                // $('body').append(this.$node);
	            };

	            var publicApi = {
	                name: 'progress',
	                getProgress: function getProgress(options) {
	                    if (progress === undefined) {
	                        progress = new Progress(options);
	                    }
	                    return progress;
	                }
	            };

	            return publicApi;
	        }(),
	        /**
	         * Function formatMoney 数值转或货币格式
	         *  -@param {Number} number 要转换的数值
	         *  -@param {Number} places 保留小数点位数
	         *  -@param {String} symbol 货币符号
	         *  -@param {String} thousand 间隔符
	         *  -@param {String} decimal 小数位符号
	         * Return {String}
	         */
	        formatMoney: function formatMoney(number, places, symbol, thousand, decimal) {
	            number = number || 0;
	            places = !isNaN(places = Math.abs(places)) ? places : 2;
	            symbol = symbol !== undefined ? symbol : "$";
	            thousand = thousand || ",";
	            decimal = decimal || ".";
	            var negative = number < 0 ? "-" : "",
	                i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
	                j = (j = i.length) > 3 ? j % 3 : 0;
	            return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
	        },
	        // 两个浮点数求和
	        accAdd: function accAdd(num1, num2) {
	            var r1, r2, m;
	            try {
	                r1 = num1.toString().split('.')[1].length;
	            } catch (e) {
	                r1 = 0;
	            }
	            try {
	                r2 = num2.toString().split(".")[1].length;
	            } catch (e) {
	                r2 = 0;
	            }
	            m = Math.pow(10, Math.max(r1, r2));
	            // return (num1*m+num2*m)/m;
	            return Math.round(num1 * m + num2 * m) / m;
	        },

	        // 两个浮点数相减
	        accSub: function accSub(num1, num2) {
	            var r1, r2, m, n;
	            if (isNaN(num1)) {
	                num1 = 0;
	            }
	            if (isNaN(num2)) {
	                num2 = 0;
	            }
	            try {
	                r1 = num1.toString().split('.')[1].length;
	            } catch (e) {
	                r1 = 0;
	            }
	            try {
	                r2 = num2.toString().split(".")[1].length;
	            } catch (e) {
	                r2 = 0;
	            }
	            m = Math.pow(10, Math.max(r1, r2));
	            n = r1 >= r2 ? r1 : r2;
	            return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
	        },
	        // 两数相除
	        accDiv: function accDiv(num1, num2) {
	            var t1, t2, r1, r2;
	            try {
	                t1 = num1.toString().split('.')[1].length;
	            } catch (e) {
	                t1 = 0;
	            }
	            try {
	                t2 = num2.toString().split(".")[1].length;
	            } catch (e) {
	                t2 = 0;
	            }
	            r1 = Number(num1.toString().replace(".", ""));
	            r2 = Number(num2.toString().replace(".", ""));
	            return r1 / r2 * Math.pow(10, t2 - t1);
	        },
	        //两个相乘
	        accMul: function accMul(num1, num2) {
	            var m = 0,
	                s1 = num1.toString(),
	                s2 = num2.toString();
	            try {
	                m += s1.split(".")[1].length;
	            } catch (e) {}
	            try {
	                m += s2.split(".")[1].length;
	            } catch (e) {}
	            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
	        },
	        /**
	         * formFromJSON
	         * form表单对象转json
	         */
	        formToJSON: function formToJSON(form) {
	            form = $(form);
	            if (form.length !== 1) return false;

	            // Form data
	            var formData = {};

	            // Skip input types
	            var skipTypes = ['submit', 'image', 'button', 'file'];
	            var skipNames = [];
	            form.find('input, select, textarea').each(function () {
	                var input = $(this);
	                var name = input.attr('name');
	                var type = input.attr('type');
	                var tag = this.$nodeName.toLowerCase();
	                if (skipTypes.indexOf(type) >= 0) return;
	                if (skipNames.indexOf(name) >= 0 || !name) return;
	                if (tag === 'select' && input.prop('multiple')) {
	                    skipNames.push(name);
	                    formData[name] = [];
	                    form.find('select[name="' + name + '"] option').each(function () {
	                        if (this.selected) formData[name].push(this.value);
	                    });
	                } else {
	                    switch (type) {
	                        case 'checkbox':
	                            skipNames.push(name);
	                            formData[name] = [];
	                            form.find('input[name="' + name + '"]').each(function () {
	                                if (this.checked) formData[name].push(this.value);
	                            });
	                            break;
	                        case 'radio':
	                            skipNames.push(name);
	                            form.find('input[name="' + name + '"]').each(function () {
	                                if (this.checked) formData[name] = this.value;
	                            });
	                            break;
	                        default:
	                            formData[name] = input.val();
	                            break;
	                    }
	                }
	            });
	            form.trigger('formToJSON', {
	                formData: formData
	            });

	            return formData;
	        },
	        parseHtml: function parseHtml() {
	            // console.log(this);
	            // return;
	            this.REGX_HTML_ENCODE = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g;

	            this.REGX_HTML_DECODE = /&\w+;|&#(\d+);/g;

	            this.REGX_TRIM = /(^\s*)|(\s*$)/g;

	            this.HTML_DECODE = {
	                "&lt;": "<",
	                "&gt;": ">",
	                "&amp;": "&",
	                "&nbsp;": " ",
	                "&quot;": "\"",
	                "&copy;": ""

	                // Add more
	            };

	            this.encodeHtml = function (s) {
	                s = s !== undefined ? s : this.toString();
	                return typeof s != "string" ? s : s.replace(this.REGX_HTML_ENCODE, function ($0) {
	                    var c = $0.charCodeAt(0),
	                        r = ["&#"];
	                    c = c == 0x20 ? 0xA0 : c;
	                    r.push(c);
	                    r.push(";");
	                    return r.join("");
	                });
	            };

	            this.decodeHtml = function (s) {
	                var HTML_DECODE = this.HTML_DECODE;

	                s = s !== undefined ? s : this.toString();
	                return typeof s != "string" ? s : s.replace(this.REGX_HTML_DECODE, function ($0, $1) {
	                    var c = HTML_DECODE[$0];
	                    if (c === undefined) {
	                        // Maybe is Entity Number
	                        if (!isNaN($1)) {
	                            c = String.fromCharCode($1 == 160 ? 32 : $1);
	                        } else {
	                            c = $0;
	                        }
	                    }
	                    return c;
	                });
	            };

	            this.trim = function (s) {
	                s = s !== undefined ? s : this.toString();
	                return typeof s != "string" ? s : s.replace(this.REGX_TRIM, "");
	            };

	            this.hashCode = function () {
	                var hash = this.__hash__,
	                    _char;
	                if (hash === undefined || hash === 0) {
	                    hash = 0;
	                    for (var i = 0, len = this.length; i < len; i++) {
	                        _char = this.charCodeAt(i);
	                        hash = 31 * hash + _char;
	                        hash = hash & hash; // Convert to 32bit integer
	                    }
	                    hash = hash & 0x7fffffff;
	                }
	                this.__hash__ = hash;

	                return this.__hash__;
	            };
	        },
	        /**
	         * [CtoH 输入内容全角转半角]
	         * @param {[type string]} str [输入字符串]
	         */
	        CtoH: function CtoH(str) {
	            var result = '';
	            for (var i = 0; i < str.length; i++) {
	                if (str.charCodeAt(i) == 12288) {
	                    result += String.fromCharCode(str.charCodeAt(i) - 12256);
	                    continue;
	                }
	                if (str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375) result += String.fromCharCode(str.charCodeAt(i) - 65248);else result += String.fromCharCode(str.charCodeAt(i));
	            }
	            return result;
	        },
	        //设置cookies
	        setCookie: function setCookie(name, value, days) {
	            var Days = days || 30;
	            var exp = new Date();
	            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=social.joyowo.com";
	        },
	        //读取cookies
	        getCookie: function getCookie(name) {
	            var arr,
	                reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	            if (arr = document.cookie.match(reg)) {
	                return unescape(arr[2]);
	            } else {
	                return null;
	            }
	        },
	        //删除cookies
	        delCookie: function delCookie(name) {
	            var exp = new Date();
	            exp.setTime(exp.getTime() - 1);
	            var cval = util.getCookie(name);
	            if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	        },
	        extend: function extend() {
	            var src,
	                copyIsArray,
	                copy,
	                name,
	                options,
	                clone,
	                target = arguments[0] || {},
	                i = 1,
	                length = arguments.length,
	                deep = false;

	            // Handle a deep copy situation
	            if (typeof target === "boolean") {
	                deep = target;

	                // skip the boolean and the target
	                target = arguments[i] || {};
	                i++;
	            }

	            // Handle case when target is a string or something (possible in deep copy)
	            if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== "object" && !jQuery.isFunction(target)) {
	                target = {};
	            }

	            // extend jQuery itself if only one argument is passed
	            if (i === length) {
	                target = this;
	                i--;
	            }

	            for (; i < length; i++) {
	                // Only deal with non-null/undefined values
	                if ((options = arguments[i]) != null) {
	                    // Extend the base object
	                    for (name in options) {
	                        src = target[name];
	                        copy = options[name];

	                        // Prevent never-ending loop
	                        if (target === copy) {
	                            continue;
	                        }

	                        // Recurse if we're merging plain objects or arrays
	                        if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
	                            if (copyIsArray) {
	                                copyIsArray = false;
	                                clone = src && jQuery.isArray(src) ? src : [];
	                            } else {
	                                clone = src && jQuery.isPlainObject(src) ? src : {};
	                            }

	                            // Never move original objects, clone them
	                            target[name] = jQuery.extend(deep, clone, copy);

	                            // Don't bring in undefined values
	                        } else if (copy !== undefined) {
	                            target[name] = copy;
	                        }
	                    }
	                }
	            }

	            // Return the modified object
	            return target;
	        },
	        /**
	         * [promiseAjax ajax]
	         * @param  {[Object]} ajaxData [ajax参数]
	         * @return {[Object]}          [promise]
	         */
	        promiseAjax: function promiseAjax(ajaxData) {
	            var data = util.extend({}, ajaxData);
	            //show loading
	            util.loading.show();
	            var dtd = $.Deferred();

	            var url = data.url;
	            delete data.url;

	            $.ajax({
	                url: url,
	                data: data,
	                type: 'post',
	                dataType: 'json',
	                success: function success(d) {
	                    if (d.errcode === 0 || d.status === 0) {
	                        dtd.resolve(d);
	                    } else {
	                        ajaxFail(d);
	                        dtd.reject(d);
	                    }
	                },
	                error: function error() {
	                    ajaxFail({
	                        msg: '服务器无响应'
	                    });
	                    dtd.reject();
	                }
	            });
	            return dtd.promise();
	        },
	        setSessionStorage: function setSessionStorage(name, val) {
	            sessionStorage[name] = JSON.stringify(val);
	        },
	        getSessionStorage: function getSessionStorage(name) {
	            try {
	                JSON.parse(sessionStorage[name]);
	            } catch (e) {
	                throw new Error('不存在或者不能被JSON.parse解析的格式');
	            }
	            return JSON.parse(sessionStorage[name]);
	        },
	        setLocalStorage: function setLocalStorage(name, val) {
	            localStorage[name] = JSON.stringify(val);
	        },
	        getLocalStorage: function getLocalStorage(name) {
	            try {
	                JSON.parse(localStorage[name]);
	            } catch (e) {
	                throw new Error('不存在或者不能被JSON.parse解析的格式');
	            }
	            return JSON.parse(localStorage[name]);
	        }
	    };

	    /**
	     * [ajaxFail ajax失败情况提示]
	     * @param  {[Object]} d [服务端返回的数据]
	     */
	    function ajaxFail(d) {
	        var msg = d && d.msg ? d.msg : '请求失败';

	        if (util && util.prompt) {
	            util.prompt({
	                text: msg
	            });
	        } else {
	            alert(msg);
	        }

	        //hide loading
	        util.loading.hide();
	    }
	    return util;
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);