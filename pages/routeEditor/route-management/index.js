import {
    listRoutes,
    getPrice,
    removeRoute
} from '../../../services/route/route';
import {
    getAllRouteServices,
    removeRouteServiceOfOneRoute
} from '../../../services/route_service/route_service';
import { removeCloudImage } from '../../../utils/cloudImageHandler';
Page({
    data: {
        // 路线列表数据
        routes: [],
        // 弹窗状态
        showModal: false,
        // 是否为编辑状态
        isEditing: false,
        // 当前编辑的路线ID
        currentRouteId: null,
        // 删除确认弹窗状态
        showDeleteConfirm: false,
        // 待删除的路线ID
        routeToDelete: null
    },

    onLoad() {
        // 页面加载时获取路线列表
        this.fetchRoutes();
    },

    // 获取路线列表数据
    async fetchRoutes() {
        try {
            const {
                records: dataFromDb,
                total
            } = await listRoutes({
                pageNumber: 1,
                pageSize: 50
            });
            // 模拟数据
            this.setData({
                routes: dataFromDb
            });
        } catch (err) {
            console.error('获取路线列表失败:', err);
            wx.showToast({
                title: '加载失败',
                icon: 'none'
            });
        }
    },

    // 打开新增路线弹窗
    handleAddRoute() {
        wx.navigateTo({ url: '/pages/routeEditor/routeEditor' })
    },

    handleEditRoute(e) {
        const routeId = e.currentTarget.dataset.id;
        // 查找当前路线数据
        const route = this.data.routes.find(item => item._id === routeId);
        if (route) {
            wx.navigateTo({ url: `/pages/routeEditor/routeEditor?route_id=${routeId}` })
        }
    },

    // 阻止事件冒泡
    stopPropagation(e) {
        e.stopPropagation();
    },

    // 输入框变化处理
    handleInputChange(e) {
        const field = e.currentTarget.dataset.field;
        const value = e.detail.value;

        this.setData({
            [`formData.${field}`]: value
        });
    },

    // 状态变更处理
    handleStatusChange(e) {
        this.setData({
            'formData.status': e.detail.value
        });
    },

    // 打开删除确认弹窗
    handleDeleteRoute(e) {
        const routeId = e.currentTarget.dataset.id;
        this.setData({
            showDeleteConfirm: true,
            routeToDelete: routeId
        });
    },

    // 关闭删除确认弹窗
    closeDeleteConfirm() {
        this.setData({
            showDeleteConfirm: false,
            routeToDelete: null
        });
    },

    // 确认删除
    async confirmDelete() {
        const targetRouteId = this.data.routeToDelete
        if (!targetRouteId) return;

        try {
            // 删除对应路线及附属服务
            removeRouteServiceOfOneRoute(targetRouteId)
            const filteredRoutes = this.data.routes.filter((route) => route._id !== targetRouteId)
            const route = this.data.routes.find(item => item._id === targetRouteId);
            if (route) {
                removeCloudImage(route.swiper_images)
                removeCloudImage(route.detail)
            }
            removeRoute(targetRouteId)
            this.setData({
                routes: filteredRoutes,
                showDeleteConfirm: false
            });

            wx.showToast({
                title: '删除成功'
            });
        } catch (err) {
            console.error('删除失败:', err);
            wx.showToast({
                title: '删除失败',
                icon: 'none'
            });
            this.closeDeleteConfirm();
        }
    }
})