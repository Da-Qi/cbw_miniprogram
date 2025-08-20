import updateManager from './common/updateManager';
import { init } from '@cloudbase/wx-cloud-client-sdk';

wx.cloud.init({
  env: 'cloudbase-8ggwz66a187bc814', // 指定云开发环境 ID
});

const client = init(wx.cloud);
const models = client.models;
globalThis.dataModel = models;
globalThis.database = wx.cloud.database();
// 接下来就可以调用 models 上的数据模型增删改查等方法了

App({
  onLaunch() {},
  onShow: function () {
    updateManager();
  },
  globalData: {
    userInfo: null, // 用户信息
    isLogin: false,
    loginListeners: [],  // 用于存储组件的回调
    needRefreshRoute: false, // 路线页面是否需要刷新
  }
});
