import Toast from 'tdesign-miniprogram/toast/index';
import {
    LIST_LOADING_STATUS
} from '../../../utils/listLoading';
import {
    getSingleCloudImageTempUrl
} from '../../../utils/cloudImageHandler';
import {
    listRoutes,
    getPrice
} from '../../../services/route/route';

Page({
    data: {
        routeList: [],
        routeListLoadStatus: LIST_LOADING_STATUS.READY,
        showConfirm: false,
    },

    routeListPagination: {
        index: 1,
        num: 10,
    },
    async init() {
        this.loadRouteList();
    },
    onOpenArticle() {
        console.log("click onOpenArticle");
        wx.navigateTo({
            url: '/pages/webview/webview?url=' + encodeURIComponent('https://mp.weixin.qq.com/s/rDpYWi48mxzHjQfjQ3QMLw')
        })
    },
    onReachBottom() {
        if (this.data.routeListLoadStatus === LIST_LOADING_STATUS.READY) {
            this.loadRouteList();
        }
    },
    onPullDownRefresh() {
        console.log('触发了下拉刷新')
        // 调用接口加载最新数据
        this.loadRouteList(false);
        wx.stopPullDownRefresh();
    },
    onShow() {
        const isLogin = getApp().globalData.isLogin
        this.setData({
            isLogin
        })
        this.getTabBar().init();
        if (getApp().globalData.needRefreshRoute) {
            this.loadRouteList(true) // 重新拉取数据
            getApp().globalData.needRefreshRoute = false
        }
    },
    onChange(e) {
        const cateId = e?.detail?.item?._id;
        wx.navigateTo({
            url: `/pages/goods/list/index?cateId=${cateId}`,
        });
    },
    onLoad(options) {
        this.init();
    },
    routeListClickHandle(e) {
        // 校验客户是否登录
        if (!this.data.isLogin) {
            this.setData({showLoginConfirm: true})
            return;
        }
        const routeId = e?.detail?.goods?._id;
        if (typeof routeId !== 'string') return;
        wx.navigateTo({
            url: `/pages/goods/details/index?routeId=${routeId}`,
        });
    },
    routeListAddCartHandle(e) {
        const spuId = e?.detail?.goods?._id;
        if (typeof spuId !== 'string') return;
        wx.navigateTo({
            url: `/pages/goods/details/index?spuId=${spuId}`,
        });
    },
    onReTry() {
        this.loadRouteList();
    },
    async loadRouteList(fresh = false) {
        if (fresh) {
            wx.pageScrollTo({
                scrollTop: 0,
            });
        }
        this.setData({
            routeListLoadStatus: LIST_LOADING_STATUS.LOADING
        });
        const pageSize = this.routeListPagination.num;
        const pageIndex = fresh ? 1 : this.routeListPagination.index;

        try {
            // 获取路线信息
            const {
                records: nextList,
                total
            } = await listRoutes({
                pageNumber: pageIndex,
                pageSize
            });

            await Promise.all(nextList.map(async (route) => (route.swiper_images[0] = await getSingleCloudImageTempUrl(route.swiper_images[0]))));

            await Promise.all(nextList.map(async (route) => (route.price = await getPrice(route._id).catch(() => 0.01))));

            const routeList = fresh ? nextList : this.data.routeList.concat(nextList);

            this.setData({
                routeList,
                routeListLoadStatus: routeList.length >= total ? LIST_LOADING_STATUS.NO_MORE : LIST_LOADING_STATUS.READY,
            });

            this.routeListPagination.index = pageIndex + 1;
            this.routeListPagination.num = pageSize;
        } catch (err) {
            console.error('error', err);
            this.setData({
                routeListLoadStatus: LIST_LOADING_STATUS.FAILED
            });
        }
    },

    confirmDialog(e) {
        this.setData({
            showLoginConfirm: true
        });
    },

    closeDialog() {
        this.setData({
            showLoginConfirm: false
        });
    },
});