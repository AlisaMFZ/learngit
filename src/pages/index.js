import Vue from "vue";
import config from "../config/default.js";

var vm;

vm = new Vue({
    el: '#app',
    components: {},
    data: {
        tabsWidth:414,
        showList_load:0,
        pageSize:10,
        pageNo:1,
        isEnd:false,//是否到底
        noData:false,//返回数据是否为空
        rankingList:[],//列表
        picList:[]//图片

    },
    mounted: function () {
        this.tabsWidth = window.screen.width;
        this.initFooterGradient();
        this.initScrollX();
        this.getList();
    },
    methods: {
        getList: function () {
            var url = config.apiHost + '/api/list';

            var param = {
                pageNo:this.pageNo,
                pageSize:this.pageSize,
            };

            Vue.api.postForm(url, param, (result) => {
                this.showList_load = this.showList_load + 1;
                this.rankingList = this.rankingList.concat(result.data.list || []);
                this.resizeImgHeight();
                this.initScrollX();
                if (this.showList_load == 1) {
                    if (this.rankingList.length == 0) {
                        this.noData = true;
                    }
                } else {
                    if (this.rankingList.length == 0) {
                        this.isEnd = true;
                    }
                }
            }, (res) => {
                //异常时处理
            });
        },
        //初始化横向滚动
        initScrollX: function () {
            Vue.nextTick(function () {
                $('.transverse').each(function (i, el) {
                    new fz.Scroll(el, {
                        scrollY: false,
                        scrollX: true
                    });
                });
            });
        },
        //底部滚动变色
        initFooterGradient: function () {
            setTimeout(function () {
                var sh = window.screen.height;
                if(document.body.scrollTop > sh) {
                    $('.footerGradient').css('background', 'rgba(243, 243, 243, 0.5)');
                }
                $(window).scroll(function () {
                    var scTop = document.body.scrollTop;
                    if(scTop <= sh) {
                        $('.footerGradient').css('background', 'rgba(243, 243, 243, 0.5)');

                    }else {
                        $('.footerGradient').css('background', 'rgba(255, 255, 255, '+ (scTop/sh-0.5) +')');
                    }
                });
            }, 500);
        },
        //点击加载更多
        load:function(){
            if (!this.isEnd) {
                this.pageNo += 1;
                this.getList();
            }
        },
        //重置宽高
        resizeImgHeight: function () {
            Vue.nextTick(
                function(){
                    var w = $('.prod-warp .prod-img >span').width()+30;
                    $('.prod-warp .prod-img >span').height(w);
                }
            )
        },
    }
});