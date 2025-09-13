import {
    operate_user,
    check_admin
} from '../../services/_utils/operate_database';
// 第三方库
import Toast from 'tdesign-miniprogram/toast/index';

Component({
    properties: {
        // 是否弹出登录提示框
        showLoginConfirm: {
            type: Boolean, // 属性类型（必填）：String/Number/Boolean/Object/Array
            value: false // 默认值（可选）
        },
        confirmBtn: {
            type: Object,
            value: {
                content: '确定',
                variant: 'base'
            }
        },
    },
    data: {
        isLogin: false,
        userInfo: {},
        loging:false,
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
        toast(message) {
            Toast({
                context: this,
                selector: '#t-toast',
                message,
                icon: '',
                duration: 2000,
            });
        },
        // 核心登录逻辑（共享方法）
        async doLogin(userInfo) {
            this.setData({
                loging:true
            })
            const userInfo_tmp = userInfo
            if (userInfo_tmp) {
                this.setData({
                    userInfo: userInfo_tmp,
                })
                // 获取Openid
                const openid_res = await wx.cloud.callFunction({
                    name: 'getOpenid',
                })
                if (openid_res != null) {
                    userInfo_tmp.openid = openid_res.result.openid;
                }
                // 获取用户
                const user_res = await operate_user({
                    action: 'get',
                    userInfo: userInfo_tmp
                })
                // 用户不存在，则新增用户，存在，则更新信息
                if (user_res.data == null || user_res.data == '') {
                    // 用户上传到数据库
                    await operate_user({
                        action: 'add',
                        userInfo: userInfo_tmp
                    })
                }
                const isAdmin = await check_admin(userInfo_tmp.openid);
                userInfo_tmp.isAdmin = isAdmin;
                wx.setStorageSync('userInfo', userInfo_tmp)
                wx.setStorageSync('isLogin', true)
                const app = getApp()
                app.globalData.userInfo = userInfo_tmp
                app.globalData.isLogin = true
                // 登录成功后的其他操作（如跳转页面、更新UI等）
                wx.reLaunch({
                    url: '/pages/usercenter/index' // 目标页面路径
                });
                this.setData({
                    loging:false,
                    isLogin: true
                })
            } else {
                this.toast('登录失败');
                console.error('登录失败：', err);
            }
        },
        // 对话框确认按钮点击（主动触发登录授权）
        handleLoginConfirm() {
            // 关闭对话框
            this.setData({
                showLoginConfirm: false
            });

            // 主动调用微信登录授权（模拟按钮点击的授权流程）
            wx.getUserProfile({
                desc: '用于完善会员资料', // 声明获取用户信息的用途，必填
                success: (res) => {
                    // 调用核心登录逻辑
                    this.doLogin(res.userInfo);
                },
                fail: () => {
                    this.toast('登录失败，请重试');
                }
            });
        },

        async onGetUserInfo(e) {
            const userInfo_tmp = e.detail.userInfo
            if (userInfo_tmp) {
                // 调用核心登录逻辑
                this.doLogin(userInfo_tmp);
            } else {
                this.toast('请允许获取用户信息');
            }
        },

        closeDialog(e) {
            // 关闭对话框
            this.setData({
                showLoginConfirm: false
            });
        }
    },

});