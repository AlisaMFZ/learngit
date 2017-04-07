import Vue from "vue";
import VueResource from "vue-resource";

//初始化插件
Vue.use(VueResource);

//https://github.com/vuejs/vue-resource/issues/314
Vue.http.interceptors.unshift(function(request, next) {
    next(function(response) {
        if (typeof response.headers['content-type'] != 'undefined') {
            response.headers['Content-Type'] = response.headers['content-type'];
        }
    });
});

/**
 * 在Vue-Resource之上为restful API提供通常的错误处理
 */
Vue.api = {
    loadingCount: 0,
    loginErrorCount: 0,
    timeoutMonitor: null,
    //是否隐藏oading mask，默认false。
    hideLoading: false,

    /**
     * 发送Http Get请求
     * 
     * @param url 请求url
     * @param params 请求参数（如果没有可以为null）
     * @param onsuccess 请求成功的回调函数
     * @param onerror 请求出错的回调函数(可选)
     */
    get: function (url, params, onsuccess, onerror) {
        var that = this;

        if (!that.hideLoading) {
            that._startLoading();
        }
        Vue.http.get(that._getUrlWithParams(url, params)).then(function (response){
            if (!that.hideLoading) {
                that._endLoading();
            }

            var result = response.data;

            if (that.isSuccessful(response)) {
                if (onsuccess) {
                    onsuccess(result);
                }

            } else if (onerror) {
                onerror(result);
            } else {
                that._hanleError(result);
            }

        }, function(response) {
            if (!that.hideLoading) {
                that._endLoading();
            }
            that._handleUnknownError(response)
        });
    },

    /**
     * 发送Http Post请求
     * 
     * @param url 请求url
     * @param params 请求参数（如果没有可以为null）
     * @param onsuccess 请求成功的回调函数
     * @param onerror 请求出错的回调函数(可选)
     */
    post: function (url, params, onsuccess, onerror) {
        this._doPostRequest("post", url, params, null, onsuccess, onerror);
    },

    /**
     * 发送Http Post请求（以表单提交的格式，application/x-www-form-urlencoded）
     *
     * @param url 请求url
     * @param params 请求参数（可选）
     * @param callback 请求成功的回调函数
     */
    postForm: function (url, params, onsuccess, onerror) {
        this._doPostRequest("post", url, params, { emulateJSON: true }, onsuccess, onerror);
    },

    /**
     * 判断请求返回是成功还是失败
     */
    isSuccessful: function (response) {
        var data = response.data;
        //JSON格式的数据
        if (data && (data.hasOwnProperty("code") || data.hasOwnProperty("Code"))) {
            return data.code == "0" || data.Code == "0" || data.Code == "10200002"||data.code=="10200002" || data.Code == "001001000"||data.code=="001001000";
        }

        //非JSON数据
        if (response.status == 200) {
            return true;
        }

        return false;
    },

    /**
     * 处理post api请求
     */
    _doPostRequest: function (method, url, params, options, onsuccess, onerror) {
        var that = this;

        Vue.http.post(url, params, options).then(function (response) {
            var result = response.data;

            if (that.isSuccessful(response)) {
                if (onsuccess) {
                    onsuccess(result);
                }
            } else if (onerror) {
                onerror(result);
            } else {
                that._hanleError(result);
            }

        }, function (response){
            that._handleUnknownError(response)
        });
    },

    //开始加载
    _startLoading: function() {
        var that = this;

        if (that.loadingCount++ > 0) {
            return;
        }

         //延时200毫秒执行
        setTimeout(function (){
            if (that.loadingCount > 0 && !Vue.loading.visible) {
                Vue.loading.show();

                //设置超时5秒后自动隐藏loading mask
                if (!that.timeoutMonitor) {
                    that.timeoutMonitor = setTimeout(function (){
                        that._clearLoading();
                    }, 5000);
                }
            }
        }, 200);
    },

    //结束加载
    _endLoading: function() {
        if (--this.loadingCount > 0) {
            return;
        }

        this._clearLoading();
    },

    //清除Loading mask
    _clearLoading: function() {
        if (this.timeoutMonitor) {
            clearTimeout(this.timeoutMonitor);
            this.timeoutMonitor = null;
        }

        Vue.loading.hide();
        this.loadingCount = 0;
    },

    /**
     * 默认错误处理
     */
    _hanleError: function (data) {
        //未登录弹出提示并跳转到登录页面
        if (data && data.code == "99") {
            if (this.loginErrorCount++ > 0) {
                return;
            }
            
            //删除用户UT
            Vue.auth.deleteUserToken();
            if (Vue.browser.isApp()) {
                //跳转到app登录页面
                window.location.href = "lyf://login";

            } else {
                var from = Vue.utils.getRelatedUrl();

                //如果登录页本身不需要重定向
                if (from && from.indexOf("login.html") < 0) {
                    window.location.href = "${contextPath}/login.html?from=" + encodeURIComponent(from);
                } else {
                    window.location.href = "${contextPath}/login.html";
                }
            }

        } else {
            var msg = data && data.message ? data.message : "请求出错，请稍后再试";
            this._showError(msg);
        }

    },

    /**
     * 处理未知错误 （如40x，50x）
     */
    _handleUnknownError: function (response) {
        this._showError("未知错误");
    },

    /**
     * 显示错误错误信息
     */
    _showError: function (msg) {
        $.tips({
            content: msg,
            stayTime: 2000,
            type: "warn"
        });
    },

    /**
     * 构造请求url
     */
    _getUrlWithParams: function (url, params) {
        if (!params) {
            return url;
        }

        //zeptojs function
        var str = $.param(params);

        if (!str) {
            return url;
        }

        if (url.indexOf("?") < 0) {
            //url没有参数时
            url += "?";
        } else {
            //有参数时
            url += "&";
        }

        return url + str;
    }
}
