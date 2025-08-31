import Toast from 'tdesign-miniprogram/toast/index';
import { ORDER_STATUS, listOrder, orderStatusToName } from '../../../services/order/order';
import { getAllOrderItemsOfAnOrder } from '../../../services/order/orderItem';
import { LIST_LOADING_STATUS } from '../../../utils/listLoading';
import { getCloudImageTempUrl,getSingleCloudImageTempUrl } from '../../../utils/cloudImageHandler';
import { OPERATION_TYPE } from '../../../utils/orderOperation';
import { shouldFresh, orderListFinishFresh } from '../../../utils/orderListFresh';
import {getRoute} from '../../../services/route/route'
import {getRouteService} from '../../../services/route_service/route_service'

const ORDER_STATUS_ALL = '999';

Page({
  page: {
    size: 5,
    num: 1,
  },

  data: {
    tabs: [
      { key: ORDER_STATUS_ALL, text: '全部', total: 0 },
      { key: ORDER_STATUS.TO_PAY, text: '待支付', total: 0 },
      { key: ORDER_STATUS.PAID, text: '已支付', total: 0 },
      { key: ORDER_STATUS.CANCELED, text: '已取消', total: 0 },
      { key: ORDER_STATUS.FINISHED, text: '已完成', total: 0 },
    ],
    curTab: ORDER_STATUS_ALL,
    orderList: [],
    listLoading: LIST_LOADING_STATUS.READY,
    emptyImg: 'https://cdn-we-retail.ym.tencent.com/miniapp/order/empty-order-list.png',
    backRefresh: false,
    order_status: ORDER_STATUS_ALL,
    pullDownRefreshing: false,
    loadingProps: {
      theme: 'circular',
      size: '40rpx',
    },
  },

  errorToast(message, e) {
    console.error(message, e);
    this.toast(message);
  },

  toast(message) {
    Toast({
      context: this,
      selector: '#t-toast',
      message,
      duration: 1000,
      icon: '',
    });
  },

  onLoad(query) {
    const order_status = this.data.tabs.find((x) => x.key === query.order_status)?.key ?? ORDER_STATUS_ALL;
    this.setData({
        order_status,
    });
    console.log('order_status ' + order_status)
    this.refreshList(order_status);
  },

  async pullRefresh() {
    this.setData({ pullDownRefreshing: true });
    try {
      await this.onRefresh();
      orderListFinishFresh();
    } catch (e) {
      this.errorToast('获取订单列表失败', e);
    } finally {
      this.setData({ pullDownRefreshing: false });
    }
  },

  async onShow() {
    if (!shouldFresh) return;
    try {
      await this.onRefresh();
      orderListFinishFresh();
    } catch (e) {
      this.errorToast('获取订单列表失败', e);
    }
  },

  onReachBottom() {
    if (this.data.listLoading === LIST_LOADING_STATUS.READY) {
      this.getOrderList(this.data.curTab);
    }
  },

  async getOrderItems(order) {
    const route_id = order.route_id;
    try {
      const route = await getRoute(route_id);
      order.route = []
      const orderImage =  await getSingleCloudImageTempUrl(route.swiper_images[0])
      order.route.route_service = {}
      const route_service = await getRouteService(order.service_ids[0])
      order.route.push({
        image: orderImage,
        name: route.name,
        route_service: route_service,
        count: order.customer_id.length
    })
    } catch (e) {
      this.errorToast('获取订单详情失败', e);
    }
  },

  async getOrderList(statusCode = ORDER_STATUS_ALL, reset = false) {
    this.setData({
      listLoading: LIST_LOADING_STATUS.LOADING,
    });
    try {
      const { records, total } = await listOrder({
        pageSize: this.page.size,
        pageNumber: this.page.num,
        order_status: statusCode !== ORDER_STATUS_ALL ? statusCode : ORDER_STATUS_ALL,
      });
      records.forEach((order) => (order.statusDesc = orderStatusToName(order.order_status)));

      // async get items for each order
      await Promise.all(records.map((order) => this.getOrderItems(order)));

      const orderList = reset ? records : this.data.orderList.concat(records);
      const listLoading = orderList.length >= total ? LIST_LOADING_STATUS.NO_MORE : LIST_LOADING_STATUS.READY; // TODO: maybe we should notify user when `length > total`?

      this.setData({ listLoading, orderList });
      const currentNum = reset ? 1 : this.page.num;
      this.page.num = currentNum + 1;
    } catch (e) {
      console.error('获取订单列表失败', e);
      this.setData({ listLoading: LIST_LOADING_STATUS.FAILED });
    }
  },

  onReTryLoad() {
    this.getOrderList(this.data.curTab);
  },

  onTabChange(e) {
    const { value } = e.detail;
    console.log('onTabChange ' + value)
    this.setData({
        order_status: value,
    });
    this.refreshList(value);
  },

  refreshList(order_status = ORDER_STATUS_ALL) {
    this.page = {
      size: this.page.size,
      num: 1,
    };
    this.setData({ curTab: order_status, orderList: [] });

    return this.getOrderList(order_status, true);
  },

  onRefresh() {
    return this.refreshList(this.data.curTab);
  },

  onOrderCardTap(e) {
    const { order } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/order/order-detail/index?order_id=${order.order_id}`,
    });
  },

  onOperation(e) {
    const type = e?.detail?.type;
    const success = e?.detail?.success;

    if (type == null) return;

    const resultMessage = success ? '成功' : '失败';

    let operationMessage;

    if (type === OPERATION_TYPE.CANCEL) {
      operationMessage = '取消订单';
    } else if (type === OPERATION_TYPE.CONFIRM) {
      operationMessage = '确认收货';
    } else {
      operationMessage = '支付';
    }

    this.toast(`${operationMessage}${resultMessage}`);
    this.onRefresh();
  },
});
