// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: 'cloudbase-8ggwz66a187bc814' }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const spbillCreateIp = context.CLIENTIP || '127.0.0.1'; // 兜底值
    // 重新生成订单号
    const outTradeNo = event.order_id + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const res = await cloud.cloudPay.unifiedOrder({
      "body" : event.body, // 商品描述
      "outTradeNo" : outTradeNo, // 商户订单号
      "subMchId" : "1729581300", // 商户号,
      "spbillCreateIp": spbillCreateIp, // 传入获取到的 IP
      "totalFee" : event.total_price * 100, // 总金额
      "envId": "cloudbase-8ggwz66a187bc814", // 云函数环境名称
      "functionName": "pay_notify" // 支付结果通知回调云函数名
    })
    return res
}