import {
    operate_user,check_admin
} from '../../services/_utils/operate_database';

Component({
    properties: {},
    data: {
        isLogin: false,
        userInfo: {}
    },
    lifetimes: {
        attached() {
            // 检查是否已登录
            const app = getApp()
            this.setData({
                isLogin: app.globalData.isLogin
            })

            // 注册回调到全局
            app.globalData.loginListeners.push((isLogin) => {
                this.setData({
                    isLogin,
                })
            })
        },
        detached() {
            // 移除回调，防止内存泄漏
            const app = getApp()
            app.globalData.loginListeners = app.globalData.loginListeners.filter(fn => fn !== this.callback)
        }
    },

    methods: {
        async onGetUserInfo(e) {
            const userInfo_tmp = e.detail.userInfo
            console.log(userInfo_tmp)
            if (userInfo_tmp) {
                this.setData({
                    userInfo: userInfo_tmp,
                    isLogin: true
                })

                // 获取Openid
                const openid_res = await wx.cloud.callFunction({
                    name: 'getOpenid',
                })
                if (openid_res != null) {
                    userInfo_tmp.openid = openid_res.result.openid;
                }
                console.log(userInfo_tmp)
                // 获取用户
                const user_res = await operate_user({
                    action: 'get',
                    userInfo: userInfo_tmp
                })
                // 用户不存在，则新增用户，存在，则更新信息
                if (user_res.data == null || user_res.data == '') {
                    console.log('enter add function')
                    // 用户上传到数据库
                    await operate_user({
                        action: 'add',
                        userInfo: userInfo_tmp
                    })
                }
                const isAdmin  = await check_admin(userInfo_tmp.openid);
                userInfo_tmp.isAdmin = isAdmin;
                wx.setStorageSync('userInfo', userInfo_tmp)
                wx.setStorageSync('isLogin', true)
                const app = getApp()
                app.globalData.userInfo = userInfo_tmp
                app.globalData.isLogin = true
                wx.reLaunch({
                    url: '/pages/usercenter/index' // 目标页面路径
                  });
            } else {
                wx.showToast({
                    title: '用户拒绝授权',
                    icon: 'none'
                })
            }
        },
    },
});