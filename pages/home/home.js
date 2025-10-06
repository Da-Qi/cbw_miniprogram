/* eslint-disable no-param-reassign */
import {
    getHomeSwiper
} from '../../services/home/home';
import {
    getCloudImageTempUrl
} from '../../utils/cloudImageHandler';


Page({
    data: {
        imgSrcs: [],
        tabList: [],
        pageLoading: false,
        current: 1,
        autoplay: true,
        duration: '500',
        interval: 5000,
        navigation: {
            type: 'dots'
        },
        userInfo: {}
    },

    onShow() {
        this.getTabBar().init();
        this.setData({
            isLogin: getApp().globalData.isLogin
        })
    },

    onLoad() {
        this.init();
    },
    onPullDownRefresh() {
        this.init();
    },

    async init() {
        wx.stopPullDownRefresh();

        this.setData({
            pageLoading: true,
        });
        this.loadHomeSwiper();
    },

    async loadHomeSwiper() {
        // 选取使能的、前三高优先级的路线的海报图
        const top3Posters = await getHomeSwiper();
        console.log(top3Posters)
        this.setData({top3Posters})
        const images = top3Posters.map(poster => poster.image);
        const handledImages = await getCloudImageTempUrl(images);

        this.setData({
            imgSrcs: handledImages,
            pageLoading: false,
        });
    },
    onSwiperClick(e) {
        // 校验客户是否登录
        if (!this.data.isLogin) {
            this.setData({showLoginConfirm: true})
            return;
        }
        const index =  e.detail.index;
        console.log(index)
        console.log(this.data.top3Posters[index])
        // 根据索引从 top3Routes 中找到对应的路线 id
        const routeId = this.data.top3Posters[index]._id;
        
        // 输出或使用 id（例如跳转页面、展示详情等）
        console.log('当前点击的路线 id 是：', routeId);
        wx.navigateTo({
            url: `/pages/goods/details/index?routeId=${routeId}`,
        });
    }
});