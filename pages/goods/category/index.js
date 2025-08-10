import Toast from 'tdesign-miniprogram/toast/index';
import { getCates } from '../../../services/cate/cate';
import { listGood, getPrice } from '../../../services/good/spu';
import { LIST_LOADING_STATUS } from '../../../utils/listLoading';
import { getCloudImageTempUrl } from '../../../utils/cloudImageHandler';

Page({
  data: {
    cates: [],
    goodsList: [],
    goodsListLoadStatus: LIST_LOADING_STATUS.READY,
  },

  goodListPagination: {
    index: 1,
    num: 20,
  },
  async init() {
    try {
      const cates = await getCates();
      this.setData({ cates });
      this.loadGoodsList();
    } catch (e) {
      console.error('获取商品分类列表失败', e);
      Toast({
        context: this,
        selector: '#t-toast',
        message: '获取商品分类列表失败',
        duration: 1000,
        icon: '',
      });
    }
  },
  onReachBottom() {
    if (this.data.goodsListLoadStatus === LIST_LOADING_STATUS.READY) {
      this.loadGoodsList();
    }
  },

  onShow() {
    this.getTabBar().init();
  },
  onChange(e) {
    const cateId = e?.detail?.item?._id;
    wx.navigateTo({
      url: `/pages/goods/list/index?cateId=${cateId}`,
    });
  },
  onLoad() {
    this.init();
  },
  goodListClickHandle(e) {
    const spuId = e?.detail?.goods?._id;
    if (typeof spuId !== 'string') return;
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`,
    });
  },
  goodListAddCartHandle(e) {
    const spuId = e?.detail?.goods?._id;
    if (typeof spuId !== 'string') return;
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`,
    });
  },
  onReTry() {
    this.loadGoodsList();
  },
  async loadGoodsList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    this.setData({ goodsListLoadStatus: LIST_LOADING_STATUS.LOADING });

    const pageSize = this.goodListPagination.num;
    const pageIndex = fresh ? 1 : this.goodListPagination.index;

    try {
      const { records: nextList, total } = await listGood({ pageNumber: pageIndex, pageSize });
      const images = nextList.map((x) => x.cover_image);
      const handledImages = await getCloudImageTempUrl(images);
      handledImages.forEach((image, index) => (nextList[index].cover_image = image));
      await Promise.all(nextList.map(async (spu) => (spu.price = await getPrice(spu._id).catch(() => 0.01))));

      const goodsList = fresh ? nextList : this.data.goodsList.concat(nextList);

      this.setData({
        goodsList,
        goodsListLoadStatus: goodsList.length >= total ? LIST_LOADING_STATUS.NO_MORE : LIST_LOADING_STATUS.READY,
      });

      this.goodListPagination.index = pageIndex + 1;
      this.goodListPagination.num = pageSize;
    } catch (err) {
      console.error('error', err);
      this.setData({ goodsListLoadStatus: LIST_LOADING_STATUS.FAILED });
    }
  },
});
