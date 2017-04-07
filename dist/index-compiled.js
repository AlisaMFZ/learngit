"use strict";

(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
            }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
                var n = t[o][1][e];return s(n ? n : e);
            }, l, l.exports, e, t, n, r);
        }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
        s(r[o]);
    }return s;
})({ 1: [function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        //default  config
        var config = {
            //api的host
            apiHost: ""
        };

        exports.default = config;
    }, {}], 2: [function (require, module, exports) {
        "use strict";

        var _vue = require("vue");

        var _vue2 = _interopRequireDefault(_vue);

        var _default = require("../config/default.js");

        var _default2 = _interopRequireDefault(_default);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : { default: obj };
        }

        var vm;

        vm = new _vue2.default({
            el: '#app',
            components: {},
            data: {
                tabsWidth: 414,
                showList_load: 0,
                pageSize: 10,
                pageNo: 1,
                isEnd: false, //是否到底
                noData: false, //返回数据是否为空
                rankingList: [], //列表
                picList: [] //图片

            },
            mounted: function mounted() {
                this.tabsWidth = window.screen.width;
                this.initFooterGradient();
                this.initScrollX();
                this.getList();
            },
            methods: {
                getList: function getList() {
                    var _this = this;

                    var url = _default2.default.apiHost + '/api/list';

                    var param = {
                        pageNo: this.pageNo,
                        pageSize: this.pageSize
                    };

                    _vue2.default.api.postForm(url, param, function (result) {
                        _this.showList_load = _this.showList_load + 1;
                        _this.rankingList = _this.rankingList.concat(result.data.list || []);
                        _this.resizeImgHeight();
                        _this.initScrollX();
                        if (_this.showList_load == 1) {
                            if (_this.rankingList.length == 0) {
                                _this.noData = true;
                            }
                        } else {
                            if (_this.rankingList.length == 0) {
                                _this.isEnd = true;
                            }
                        }
                    }, function (res) {
                        //异常时处理
                    });
                },
                //初始化横向滚动
                initScrollX: function initScrollX() {
                    _vue2.default.nextTick(function () {
                        $('.transverse').each(function (i, el) {
                            new fz.Scroll(el, {
                                scrollY: false,
                                scrollX: true
                            });
                        });
                    });
                },
                //底部滚动变色
                initFooterGradient: function initFooterGradient() {
                    setTimeout(function () {
                        var sh = window.screen.height;
                        if (document.body.scrollTop > sh) {
                            $('.footerGradient').css('background', 'rgba(243, 243, 243, 0.5)');
                        }
                        $(window).scroll(function () {
                            var scTop = document.body.scrollTop;
                            if (scTop <= sh) {
                                $('.footerGradient').css('background', 'rgba(243, 243, 243, 0.5)');
                            } else {
                                $('.footerGradient').css('background', 'rgba(255, 255, 255, ' + (scTop / sh - 0.5) + ')');
                            }
                        });
                    }, 500);
                },
                //点击加载更多
                load: function load() {
                    if (!this.isEnd) {
                        this.pageNo += 1;
                        this.getList();
                    }
                },
                //重置宽高
                resizeImgHeight: function resizeImgHeight() {
                    _vue2.default.nextTick(function () {
                        var w = $('.prod-warp .prod-img >span').width() + 30;
                        $('.prod-warp .prod-img >span').height(w);
                    });
                }
            }
        });
    }, { "../config/default.js": 1, "vue": undefined }] }, {}, [2]);

//# sourceMappingURL=index-compiled.js.map