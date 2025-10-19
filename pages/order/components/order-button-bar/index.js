import Dialog from 'tdesign-miniprogram/dialog/index';
import { ORDER_STATUS, updateOrderStatus } from '../../../../services/order/order';
import { pay, refund, closeOrder } from '../../../../services/pay/pay';
import { OrderButtonTypes } from '../../config';
import { objectToParamString } from '../../../../utils/util';
import { OPERATION_TYPE } from '../../../../utils/orderOperation';

const OPERATION_DONE_EVENT = 'operation';

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    order: {
      type: Object,
      observer(order) {
        this.init(order);
      },
    },
    goodsIndex: {
      type: Number,
      value: null,
    },
    isBtnMax: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    order: {},
    buttons: {
      left: [],
      right: [],
    },
  },

  methods: {
    // 点击【订单操作】按钮，根据按钮类型分发
    onOrderBtnTap(e) {
      const { type } = e.currentTarget.dataset;
      switch (type) {
        case OrderButtonTypes.CANCEL:
          this.onCancel(this.data.order);
          break;
        case OrderButtonTypes.CONFIRM:
          this.onConfirm(this.data.order);
          break;
        case OrderButtonTypes.PAY:
          this.onPay(this.data.order);
          break;
        case OrderButtonTypes.APPLY_REFUND:
          this.onApplyRefund(this.data.order);
          break;
        case OrderButtonTypes.COMMENT:
          this.onAddComment(this.data.order);
          break;
      }
    },

    checkOrder(order, operationType) {
      if (order != null) {
        return true;
      }
      this.triggerEvent(OPERATION_DONE_EVENT, {
        type: operationType,
        message: 'no order',
        success: false,
      });
      return false;
    },

    async onCancel(order) {
      if (!this.checkOrder(order, OPERATION_TYPE.CANCEL)) return;
      // if order is paid, we should first refund
      if (order.order_status !== ORDER_STATUS.TO_PAY) {
      try {
          await refund(order._id);
        } catch (e) {
          this.triggerEvent(OPERATION_DONE_EVENT, {
            type: OPERATION_TYPE.CANCEL,
            message: 'refund failed',
            success: false,
            detail: e,
          });
          return;
        }
      }

      try {
        await updateOrderStatus({ order_id: order.order_id, order_status: ORDER_STATUS.CANCELED });
      } catch (e) {
        this.triggerEvent(OPERATION_DONE_EVENT, {
          type: OPERATION_TYPE.CANCEL,
          message: 'update order order_status failed',
          success: false,
          detail: e,
        });
        return;
      }

      this.triggerEvent(OPERATION_DONE_EVENT, {
        type: OPERATION_TYPE.CANCEL,
        success: true,
      });
    },

    async onConfirm(order) {
      if (!this.checkOrder(order, OPERATION_TYPE.CONFIRM)) return;

      try {
        await Dialog.confirm({
          title: '确认是否已经收到货？',
          content: '',
          confirmBtn: '确认收货',
          cancelBtn: '取消',
        });
      } catch (e) {
        this.triggerEvent(OPERATION_DONE_EVENT, {
          type: OPERATION_TYPE.CONFIRM,
          message: 'confirm dialog failed',
          success: false,
          detail: e,
        });
        return;
      }

      try {
        await updateOrderStatus({ order_id: order.order_id, order_status: ORDER_STATUS.FINISHED });
      } catch (e) {
        this.triggerEvent(OPERATION_DONE_EVENT, {
          type: OPERATION_TYPE.CONFIRM,
          message: 'update order order_status failed',
          success: false,
          detail: e,
        });
      }

      this.triggerEvent(OPERATION_DONE_EVENT, {
        type: OPERATION_TYPE.CONFIRM,
        success: true,
      });
    },

    async onPay(order) {
        console.log(order)
      if (!this.checkOrder(order, OPERATION_TYPE.PAY)) return;

      try {
        pay({
            order_id: order.order_id,
            total_price: order.total_price
        }).then(paymentData => {
            console.log(paymentData)
            const that = this
            // 唤起微信支付组件，完成支付
            try {
                wx.requestPayment({
                    timeStamp: paymentData?.timeStamp,
                    nonceStr: paymentData?.nonceStr,
                    package: paymentData?.package,
                    paySign: paymentData?.paySign,
                    signType: paymentData?.signType, // 该参数为固定值
                    success (res) {
                        updateOrderStatus({ order_id: order.order_id, order_status: ORDER_STATUS.PAID });
                        that.triggerEvent(OPERATION_DONE_EVENT, {
                            type: OPERATION_TYPE.PAY,
                            success: true,
                        });
                    },
                    fail (err) {
                        console.log(err)
                        that.triggerEvent(OPERATION_DONE_EVENT, {
                            type: OPERATION_TYPE.PAY,
                            message: 'pay failed',
                            success: false,
                            detail: err,
                        });
                    }
                });
            } catch (e) {
                this.triggerEvent(OPERATION_DONE_EVENT, {
                    type: OPERATION_TYPE.PAY,
                    message: 'pay failed',
                    success: false,
                    detail: "取消支付",
                });
            }
        })
      } catch (e) {
        this.triggerEvent(OPERATION_DONE_EVENT, {
          type: OPERATION_TYPE.PAY,
          message: 'pay failed',
          success: false,
          detail: e,
        });
        return;
      }
    },

    onApplyRefund(order) {
      wx.navigateTo({ url: `/pages/order/apply-service/index?${objectToParamString({ orderId: order._id })}` });
    },

    /** 添加订单评论 */
    onAddComment(order) {
      wx.navigateTo({
        url: `/pages/goods/comments/create-list/index?${objectToParamString({ orderId: order._id })}`,
      });
    },

    init(order) {
      if (order == null) return;

      if (order.order_status === ORDER_STATUS.TO_PAY) {
        this.setData({
          buttons: {
            left: [],
            right: [
              { type: OrderButtonTypes.CANCEL, name: '取消订单' },
              { type: OrderButtonTypes.PAY, name: '付款', primary: true },
            ],
          },
        });
        return;
      }
      if (order.order_status === ORDER_STATUS.FINISHED) {
        this.setData({
          buttons: {
            left: [],
            right: [],
          },
        });
        return;
      }
      if (order.order_status === ORDER_STATUS.CANCELED) {
        this.setData({
          buttons: {
            left: [],
            right: [],
          },
        });
        return;
      }
      if (order.order_status === ORDER_STATUS.RETURN_APPLIED) {
        this.setData({
          buttons: {
            left: [],
            right: [],
          },
        });
        return;
      }
      if (order.order_status === ORDER_STATUS.RETURN_REFUSED) {
        this.setData({
          buttons: {
            left: [],
            right: [],
          },
        });
        return;
      }
      if (order.order_status === ORDER_STATUS.RETURN_FINISH) {
        this.setData({
          buttons: {
            left: [],
            right: [],
          },
        });
        return;
      }
      if (order.order_status === ORDER_STATUS.RETURN_MONEY_REFUSED) {
        this.setData({
          buttons: {
            left: [],
            right: [],
          },
        });
        return;
      }
    },
  },

  lifetimes: {
    attached() {
      this.init(this.data.order);
    },
  },
});
