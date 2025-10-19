// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const res = await cloud.cloudPay.closeOrder({
    "out_trade_no" : event.order_id, // 商户订单号
    "sub_mch_id" : "1729581300", // 商户号,
    "nonce_str": event.nonce_str
  })
  return res;
}