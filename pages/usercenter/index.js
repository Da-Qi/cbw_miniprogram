import {
    ORDER_STATUS
} from '../../services/order/order';
import Toast from 'tdesign-miniprogram/toast/index';

const menuData = [
    [{
        title: '收货地址',
        tit: '',
        url: '',
        type: 'address',
    }, ],
];

const orderTagInfos = [{
        title: '待付款',
        iconName: 'wallet',
        orderNum: 0,
        tabType: ORDER_STATUS.TO_PAY,
        status: 1,
    },
    {
        title: '待发货',
        iconName: 'deliver',
        orderNum: 0,
        tabType: ORDER_STATUS.TO_SEND,
        status: 1,
    },
    {
        title: '待收货',
        iconName: 'package',
        orderNum: 0,
        tabType: ORDER_STATUS.TO_RECEIVE,
        status: 1,
    },
    {
        title: '待评价',
        iconName: 'comment',
        orderNum: 0,
        tabType: ORDER_STATUS.FINISHED,
        status: 1,
    },
    // {
    //   title: '退款/售后',
    //   iconName: 'exchang',
    //   orderNum: 0,
    //   tabType: 0,
    //   status: 1,
    // },
];

const getDefaultData = () => ({
    userInfo: {},
    menuData,
    orderTagInfos,
    customerServiceInfo: {
        servicePhone: '1867287942',
        serviceTimeDuration: '上午9:00 - 下午21:00'
    },
    currAuthStep: 1,
    showKefu: true,
    versionNo: '',
    toPayOrderCount: 0,
    toSendOrderCount: 0,
    toReceiveOrderCount: 0,
});

Page({
    data: getDefaultData(),

    onLoad() {
        this.getVersionInfo();
    },

    onShow() {
        const isLogin = getApp().globalData.isLogin
        this.setData({
            isLogin
        })
        this.getTabBar().init();
        this.init();
    },
    onPullDownRefresh() {
        this.init();
    },

    init() {
        const isLogin = getApp().globalData.isLogin
        if (isLogin) {
            const userInfo = getApp().globalData.userInfo;
            console.log(userInfo)
            this.setData({
                userInfo: userInfo,
                currAuthStep:2
            })
        }
    },

    onClickCell({
        currentTarget
    }) {
        const {
            type
        } = currentTarget.dataset;

        switch (type) {
            case 'address': {
                wx.navigateTo({
                    url: '/pages/usercenter/address/list/index'
                });
                break;
            }
            case 'service': {
                this.openMakePhone();
                break;
            }
            case 'help-center': {
                Toast({
                    context: this,
                    selector: '#t-toast',
                    message: '你点击了帮助中心',
                    icon: '',
                    duration: 1000,
                });
                break;
            }
            case 'point': {
                Toast({
                    context: this,
                    selector: '#t-toast',
                    message: '你点击了积分菜单',
                    icon: '',
                    duration: 1000,
                });
                break;
            }
            case 'coupon': {
                wx.navigateTo({
                    url: '/pages/coupon/coupon-list/index'
                });
                break;
            }
            default: {
                Toast({
                    context: this,
                    selector: '#t-toast',
                    message: '未知跳转',
                    icon: '',
                    duration: 1000,
                });
                break;
            }
        }
    },

    jumpNav(e) {
        const status = e.detail.tabType;

        if (status === 0) {
            wx.navigateTo({
                url: '/pages/order/after-service-list/index'
            });
        } else {
            wx.navigateTo({
                url: `/pages/order/order-list/index?status=${status}`
            });
        }
    },

    jumpAllOrder() {
        wx.navigateTo({
            url: '/pages/order/order-list/index'
        });
    },

    call() {
        wx.makePhoneCall({
            phoneNumber: this.data.customerServiceInfo.servicePhone,
        });
    },

    getVersionInfo() {
        const versionInfo = wx.getAccountInfoSync();
        const {
            version,
            envVersion = __wxConfig
        } = versionInfo.miniProgram;
        this.setData({
            versionNo: envVersion === 'release' ? version : envVersion,
        });
    },

    onLogout() {
        wx.showModal({
            title: '提示',
            content: '确定要退出登录吗？',
            success: (res) => {
                if (res.confirm) {
                    // 清除本地存储
                    wx.removeStorageSync('openid')
                    wx.setStorageSync('isLogin', false)

                    // 清除全局变量
                    const app = getApp()
                    app.globalData.openid = null
                    app.globalData.isLogin = false

                    // 通知所有监听者
                    app.globalData.loginListeners.forEach(fn => fn(false))
                    // 跳转回登录页
                    wx.reLaunch({
                        url: '/pages/home/home'
                    })
                }
            }
        })
    },

    addRoute() {
        wx.navigateTo({ url: '/pages/routeEditor/routeEditor' })
    },

    manageRoute() {
        wx.navigateTo({ url: '/pages/routeEditor/route-management/index' })
    }
});