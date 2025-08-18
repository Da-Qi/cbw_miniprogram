import {
    uploadMultiImages
} from '../../services/_utils/images';
import {
    createRoute, createRouteServices
} from '../../services/route/route';
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
        },
        // 初始服务列表，包含4种默认服务
        services: [{
                service_name: '1人自驾',
                price: '199.00'
            },
            {
                service_name: '1人大巴',
                price: '159.00'
            },
            {
                service_name: '1人1宠',
                price: '259.00'
            },
            {
                service_name: '2人1宠（送宠物座位）',
                price: '399.00'
            }
        ]
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
        wx.chooseMedia({
            count: 5,
            success: (res) => {
                const tmpCarousels = [];
                res.tempFiles.forEach((tempFile, index) => {
                    tmpCarousels.push(tempFile.tempFilePath)
                })
                this.setData({
                    'route.carousel': tmpCarousels
                })
                console.log(this.data.route.carousel)
            }
        })
    },

    addDetailImage() {
        wx.chooseMedia({
            count: 10,
            success: (res) => {
                const tmpDetailImages = [];
                res.tempFiles.forEach((tempFile, index) => {
                    tmpDetailImages.push(tempFile.tempFilePath)
                })
                this.setData({
                    'route.detailImages': tmpDetailImages
                })
                console.log(this.data.route.detailImages)
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

    /**
     * 修改服务名称
     */
    onServiceNameChange(e) {
        const index = e.currentTarget.dataset.index;
        const value = e.detail.value;
        const services = [...this.data.services];
        services[index].name = value;
        this.setData({
            services
        });
    },

    /**
     * 修改服务价格
     */
    onServicePriceChange(e) {
        const index = e.currentTarget.dataset.index;
        let value = e.detail.value;

        // 简单的价格格式化处理
        if (value) {
            // 确保是数字
            value = parseFloat(value).toFixed(2);
        }

        const services = [...this.data.services];
        services[index].price = value;
        this.setData({
            services
        });
    },

    /**
     * 新增服务
     */
    addService() {
        const services = [...this.data.services];
        // 添加新服务项，带空值
        services.push({
            name: '',
            price: ''
        });

        // 添加动画效果
        this.setData({
            services
        }, () => {
            const lastIndex = services.length - 1;
            this.createAnimation(lastIndex);
        });
    },

    /**
     * 创建新增服务项的动画
     */
    createAnimation(index) {
        const animation = wx.createAnimation({
            duration: 300,
            timingFunction: 'ease-out'
        });

        // 先缩小再恢复，产生"弹出"效果
        animation.scale(0.9).step().scale(1).step();

        // 将动画数据设置到对应的服务项
        const services = [...this.data.services];
        services[index].animationData = animation.export();
        this.setData({
            services
        });
    },

    /**
     * 删除服务
     */
    deleteService(e) {
        const index = e.currentTarget.dataset.index;
        const services = [...this.data.services];

        // 至少保留一项服务
        if (services.length <= 1) {
            wx.showToast({
                title: '至少保留一项服务',
                icon: 'none',
                duration: 2000
            });
            return;
        }

        // 移除指定索引的服务
        services.splice(index, 1);
        this.setData({
            services
        });
    },

    async saveRoute() {
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
        // 1. 上传轮播图片、详情图
        wx.showLoading({
            title: '上传中...'
        });
        const carouselFileIDs = await uploadMultiImages('route_carousel', routeData.carousel)
        const detailImagesFileIDs = await uploadMultiImages('route_detail', routeData.detailImages)
        console.log('上传成功，carouselFileIDs列表:', carouselFileIDs);
        console.log('上传成功，detailImagesFileIDs列表:', detailImagesFileIDs);

        // 2. 写入数据库
        const createRouteData = await createRoute({
            name: routeData.title,
            priority: routeData.priority,
            swiper_images: carouselFileIDs,
            detail: detailImagesFileIDs,
            status: routeData.active
        })
        console.log('createRouteData ' + createRouteData.data.id)

        // 2. 写入路线具体服务数据库
        const routeServicesData = this.data.services
        routeServicesData.forEach((routeService, index) => {
            routeService.route_id = {_id : createRouteData.data.id}
        })

        const createRouteServicesData = await createRouteServices({
            serviceArray: routeServicesData
        })

        wx.showToast({
            title: '保存成功',
            icon: 'success'
        })
    },


})