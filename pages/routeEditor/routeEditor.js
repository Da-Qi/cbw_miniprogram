// pages/routeEditor/routeEditor.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        route: {
            title: '',
            carousel: [], // 轮播图数组
            detailImages: [], // 描述详情图数组
            active: true, // 是否可用
            priority: 0 // 展示优先级
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const {
            id
        } = options
        if (id) {
            this.setData({
                productId: id
            })
            wx.cloud.database().collection('products').doc(id).get()
                .then(res => this.setData(res.data))
        }
    },

    onTitleChange(e) {
        this.setData({
            'route.title': e.detail.value
        })
    },

    addCarouselImage() {
        wx.chooseImage({
            count: 5,
            success: res => {
                this.setData({
                    'route.carousel': this.data.route.carousel.concat(res.tempFilePaths)
                })
            }
        })
    },

    addDetailImage() {
        wx.chooseImage({
            count: 10,
            success: res => {
                this.setData({
                    'route.detailImages': this.data.route.detailImages.concat(res.tempFilePaths)
                })
            }
        })
    },

    onActiveChange(e) {
        this.setData({
            'route.active': e.detail.value
        })
    },

    onPriorityChange(e) {
        this.setData({
            'route.priority': Number(e.detail.value)
        })
    },

    saveRoute() {
        const routeData = this.data.route

        // 校验标题
        if (!routeData.title) {
            wx.showToast({
                title: '请填写标题',
                icon: 'none'
            })
            return
        }

        // 可以在这里上传到数据库或保存到本地存储
        wx.setStorageSync('routeData', routeData)
        wx.showToast({
            title: '保存成功',
            icon: 'success'
        })
    }
})