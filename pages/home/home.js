/* eslint-disable no-param-reassign */
import { getHomeSwiper } from '../../services/home/home';
import { getCloudImageTempUrl } from '../../utils/cloudImageHandler';


Page({
  data: {
    imgSrcs: [],
    tabList: [],
    pageLoading: false,
    current: 1,
    autoplay: true,
    duration: '500',
    interval: 5000,
    navigation: { type: 'dots' },
    swiperImageProps: { mode: 'scaleToFill' }
  },

  privateData: {
    tabIndex: 0,
  },

  onShow() {
    this.getTabBar().init();
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
      pageLoading: false,
    });
    this.loadHomeSwiper();
  },

  async loadHomeSwiper() {
    const { images } = await getHomeSwiper();
    const handledImages = await getCloudImageTempUrl(images);

    this.setData({ imgSrcs: handledImages });
  },

  navToSearchPage() {
    wx.navigateTo({ url: '/pages/goods/search/index' });
  },

  navToActivityDetail({ detail }) {
    const { index: promotionID = 0 } = detail || {};
    wx.navigateTo({
      url: `/pages/promotion-detail/index?promotion_id=${promotionID}`,
    });
  }
});
