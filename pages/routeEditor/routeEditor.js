import {
    uploadMultiImages
} from '../../services/_utils/images';
import {
    createRoute,
    createRouteServices,
    getRoute
} from '../../services/route/route';
import {
    getAllRouteServices
} from '../../services/route_service/route_service';
Page({
    /**
     * 页面的初始数据
     */
    data: {
        isEditing:false,
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
                price: '199.00',
                person_count: 1
            },
            {
                service_name: '1人大巴',
                price: '159.00',
                person_count: 1
            },
            {
                service_name: '1人1宠',
                price: '259.00',
                person_count: 1
            },
            {
                service_name: '2人1宠（送宠物座位）',
                price: '399.00',
                person_count: 2
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const {
            route_id
        } = options
        if (route_id) {
            this.setData({isEditing: true})
            this.init(route_id)
        }
    },
    
    async init(route_id){
        const routeFromDb = await getRoute(route_id)
        this.setData({
            route: {
                title: routeFromDb.name,
                carousel: routeFromDb.swiper_images,
                detailImages: routeFromDb.detail,
                active: routeFromDb.status,
                priority: routeFromDb.priority
            }
        })
        const routeServicesFromDb = await getAllRouteServices(route_id)
        this.setData({
            services: routeServicesFromDb
        })
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
        services[index].service_name = value;
        this.setData({
            services
        });
    },

    /**
     * 修改服务价格
     */
    onServicePriceChange(e) {
        const index = e.currentTarget.dataset.index;
        let inputValue = e.detail.value;  // 获取最终输入值
    
        // 1. 校验逻辑（在用户输入完成后执行）
        let validatedValue = "0.00";  // 默认值
        if (inputValue) {
          // 过滤非数字和处理格式
          inputValue = inputValue.replace(/[^\d.]/g, '');
          
          // 校验是否为有效数字
          if (!isNaN(parseFloat(inputValue))) {
            // 格式化为两位小数
            validatedValue = parseFloat(inputValue).toFixed(2);
          } else {
            // 无效输入时给出提示
            wx.showToast({
              title: '请输入有效数字',
              icon: 'none',
              duration: 1500
            });
          }
        }
        // 2. 更新数据
        const services = [...this.data.services];
        services[index].price = validatedValue;
        this.setData({ services });
    },

    /**
     * 修改每个服务每张票服务的人数
     */
    onServicePersonCountChange(e) {
        const index = e.currentTarget.dataset.index;
        let inputValue = e.detail.value;  // 获取最终输入值
        // 1. 校验逻辑（在用户输入完成后执行）
        let validatedValue = "1";  // 默认值
        if (inputValue) {
            // 正则表达式：匹配正整数（不允许0和负数）
            const reg = /^[1-9]\d*$/;
            // 只保留数字
            const numValue = inputValue.replace(/[^\d]/g, '');
            // 校验是否为正整数
            const isValid = reg.test(numValue);
          // 校验是否为有效数字
          if (isValid) {
            // 格式化为两位小数
            validatedValue = parseInt(numValue);
          } else {
            // 无效输入时给出提示
            wx.showToast({
              title: '请输入有效正整数',
              icon: 'none',
              duration: 1500
            });
          }
        }
        // 2. 更新数据
        const services = [...this.data.services];
        services[index].person_count = validatedValue;
        console.log("validatedValue "+ validatedValue);
        this.setData({ services });
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
            title: '上传中...',
            mask: true // 可选，防止用户点击
        });

        try {
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
                routeService.route_id = {
                    _id: createRouteData.data.id
                }
            })
            console.log(routeServicesData)
            await createRouteServices({
                serviceArray: routeServicesData
            })
            wx.showToast({
                title: '提交成功',
                icon: 'success'
            });
            // 延时跳转，保证用户能看到 toast
            getApp().globalData.needRefreshRoute = true
            setTimeout(() => {
                wx.switchTab({
                    url: '/pages/goods/category/index'
                });
            }, 1000);
        } catch (e) {
            wx.showToast({
                title: '提交失败',
                icon: 'none'
            });
        } finally {
            wx.hideLoading();
        }
    },

    closeBack() {
        wx.navigateBack()
    }

})