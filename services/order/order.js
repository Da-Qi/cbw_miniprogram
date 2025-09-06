import { model, getAll } from '../../services/_utils/model';
import { DATA_MODEL_KEY } from '../../config/model';
import { cloudbaseTemplateConfig } from '../../config/index';
import {ORDER } from '../cloudbaseMock/index';

const ORDER_MODEL_KEY = DATA_MODEL_KEY.ORDER_INFO;

const ORDER_STATUS_INFO = {
  TO_PAY: { value: '0', label: '待支付' },
  PAID: { value: '1', label: '已支付' },
  FINISHED: { value: '2', label: '已完成' },
  CANCELED: { value: '3', label: '已取消' }
};

/**
 * 生成订单号
 * @returns {string} 订单号
 */
function generateOrderNumber() {
    // 1. 处理时间部分：精确到秒，格式为YYYYMMDDHHmmss
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const timeStr = `${year}${month}${day}${hours}${minutes}${seconds}`;
    
    // 2. 生成随机因子：3位随机数，降低同一秒同一用户重复下单的概率
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    // 3. 组合生成订单号
    return `${timeStr}${randomNum}`;
}

export const ORDER_STATUS = new Proxy(ORDER_STATUS_INFO, {
  get(target, prop) {
    return target[prop]?.value;
  },
});

export const orderStatusToName = (status) => Object.values(ORDER_STATUS_INFO).find((x) => x.value === status)?.label;

/**
 *
 * @param {{
 *   status: String,
 *   addressId: String
 * }} param0
 * @returns
 */
export async function createOrder({
    customerList,
    route,
    routeService,
    remark,
    order_status,
    total_price
  }) {
   const orderId =  generateOrderNumber()
   console.log('orderId ' + orderId)
   console.log('customerList ' + customerList)
   console.log('route ' + route)
   console.log('routeService ' + routeService)
   console.log('remark ' + remark)
   console.log('total_price ' + total_price)
   console.log('order_status ' + order_status)
  return model()[ORDER_MODEL_KEY].create({
      data: {
        order_id: orderId,
        route_id: {
            _id: route.id,
        },
        customer_notes: remark,
        order_status: String(order_status),
        total_price: total_price,
        service_names: [routeService.name],
        service_ids: [routeService.id],
        route_name: route.name,
        customer_id: [...customerList]
      },
    });
}

export function getAllOrder() {
  return getAll({
    name: ORDER_MODEL_KEY,
  });
}

/**
 *
 * @param {{
 *   pageSize: Number,
 *   pageNumber: Number,
 *   order_status?: String
 * }}} param0
 * @returns
 */
export async function listOrder({ pageSize, pageNumber, order_status }) {
  if (cloudbaseTemplateConfig.useMock) {
    const filteredOrder = order_status == null || order_status == 999 ? ORDER : ORDER.filter((x) => String(x.order_status) === String(order_status));
    console.log('filteredOrder ' + filteredOrder)
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const records = filteredOrder.slice(startIndex, endIndex);
    const total = filteredOrder.length;
    return {
      records,
      total,
    };
  }

  if (order_status != null && order_status !== String(999)) {
    return (
      await model()[ORDER_MODEL_KEY].list({
        filter: {
          where: {
            order_status: {
              $eq: order_status,
            },
          },
        },
        pageSize,
        pageNumber,
        getCount: true,
      })
    ).data;
  }
  return (
    await model()[ORDER_MODEL_KEY].list({
      filter: {},
      pageSize,
      pageNumber,
      getCount: true,
    })
  ).data;
}

async function getOrderCountOfStatus(order_status) {
  if (cloudbaseTemplateConfig.useMock) {
    return ORDER.filter((x) => x.order_status === order_status).length;
  }

  return (
    await model()[ORDER_MODEL_KEY].list({
      filter: { where: { order_status: { $eq: order_status } } },
      select: { _id: true },
      getCount: true,
    })
  ).data.total;
}

export async function getToPayOrderCount() {
  return getOrderCountOfStatus(ORDER_STATUS.TO_PAY);
}

export async function getToSendOrderCount() {
  return getOrderCountOfStatus(ORDER_STATUS.TO_SEND);
}

export async function getToReceiveOrderCount() {
  return getOrderCountOfStatus(ORDER_STATUS.TO_RECEIVE);
}

/**
 *
 * @param {String} orderId
 */
export async function getOrder(orderId) {
//   if (cloudbaseTemplateConfig.useMock) {
//     const order = ORDER.find(o => o.order_id === orderId);
//     return order
//   }
  return (
      await model()[ORDER_MODEL_KEY].get({
      filter: {
        where: {
            order_id: { $eq: orderId },
        },
      },
    })
  ).data;
}

export async function updateOrderDeliveryInfo({ orderId, deliveryInfoId }) {
  return model()[ORDER_MODEL_KEY].update({
    data: {
      delivery_info: {
        _id: deliveryInfoId,
      },
    },
    filter: {
      where: {
        _id: {
          $eq: orderId,
        },
      },
    },
  });
}

/**
 *
 * @param {{orderId: String, order_status: String}}} param0
 * @returns
 */
export async function updateOrderStatus({ orderId, order_status }) {
  if (cloudbaseTemplateConfig.useMock) {
    ORDER.find(x => x._id === orderId).order_status = order_status
    return;
  }
  return await model()[ORDER_MODEL_KEY].update({
    data: {
        order_status,
    },
    filter: {
      where: {
        _id: {
          $eq: orderId,
        },
      },
    },
  });
}
