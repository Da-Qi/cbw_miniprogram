export async function closeOrder({
    order_id,
    nonce_str
}) {
    await wx.cloud.callFunction({
        name: 'close_order',
        data: {
          order_id: order_id,
          nonce_str: nonce_str
        },
    });
}

/**
 *
 * @param {{id: String, totalPrice: Number}} order
 * @returns
 */
export async function pay(order) {
  try {
    const res = await wx.cloud.callFunction({
      name: 'pre_pay',
      data: {
        order_id: order.order_id,
        body: '宠伴玩旅行社-协宠游玩',
        total_price: order.total_price
      },
    });
    const paymentData = res.result.payment;
    return Promise.resolve(paymentData);
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function refund(orderId) {
  const res = await wx.cloud.callFunction({
    // 云函数名称
    name: 'shop_refund',
    data: {
      orderId,
    },
  });
  if (!res?.result?.data) {
    throw new Error("refund failed", res);
  }
  return res;
}