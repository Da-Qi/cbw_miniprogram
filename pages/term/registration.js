Page({
    data: {
        // 行程信息（从上个页面传递过来）
        count: 1,
        // 是否同意条款
        isAgreed: false,
        showTerm: true,
        route: {
            name: '去从化玩',

        },
        routeService: {
            name: '1人大巴',
            price: 159.00
        },
        idTypes: ["身份证", "护照", "港澳居民通行证", "台湾居民往来大陆通行证", "中华人民共和国港澳居民居住证", "中华人民共和国台湾居民居住证", "军人证"],
        // 报名人信息列表（动态生成）
        applicants: [{
            name: "",
            phone: "",
            idTypeIndex: 0, // 默认身份证
            idNumber: "",
            showBirthday: false, // 是否显示出生日期（港澳台/外国证件时为true）
            birthday: "",
            petInfo: "",
            dogBirthday: "",
            locationId: null, // 选中的集合地点ID
            remark: ""
        }]
    },
    // 姓名输入变化
    onNameChange(e) {
        const {
            index
        } = e.currentTarget.dataset;
        const applicants = [...this.data.applicants];
        applicants[index].name = e.detail.value;
        this.setData({
            applicants
        });
    },

    // 手机号码输入变化
    onPhoneChange(e) {
        const {
            index
        } = e.currentTarget.dataset;
        const applicants = [...this.data.applicants];
        applicants[index].phone = e.detail.value;
        this.setData({
            applicants
        });
    },

    // 出生日期输入变化
    onBirthdayChange(e) {
        const {
            index
        } = e.currentTarget.dataset;
        const applicants = [...this.data.applicants];
        applicants[index].birthday = e.detail.value;
        this.setData({
            applicants
        });
    },

    // 宠物信息输入变化
    onPetInfoChange(e) {
        const {
            index
        } = e.currentTarget.dataset;
        const applicants = [...this.data.applicants];
        applicants[index].petInfo = e.detail.value;
        this.setData({
            applicants
        });
    },

    // 备注输入变化
    onRemarkChange(e) {
        const {
            index
        } = e.currentTarget.dataset;
        const applicants = [...this.data.applicants];
        applicants[index].remark = e.detail.value;
        this.setData({
            applicants
        });
    },

    // 证件号码输入变化
    onIdNumberChange(e) {
        const {
            index
        } = e.currentTarget.dataset;
        const applicants = [...this.data.applicants];
        applicants[index].idNumber = e.detail.value;
        this.setData({
            applicants
        });
    },

    onLoad(options) {
        // 获取从订单页面传递的行程信息
        const count = JSON.parse(options.count);
        this.setData({
            count
        });
        // 根据购票数量更新报名人列表
        const initApplicantsList = () => {
            const {
                count
            } = this.data;
            const newApplicants = [];

            // 数量增加时，新增空白报名人
            for (let i = newApplicants.length; i < count; i++) {
                newApplicants.push({
                    name: "",
                    phone: "",
                    idTypeIndex: 0,
                    idNumber: "",
                    showBirthday: false,
                    birthday: "",
                    petInfo: "",
                    dogBirthday: "",
                    locationId: null,
                    remark: ""
                });
            }
            this.setData({
                applicants: newApplicants
            });
        };
        initApplicantsList();
    },

    // 返回上一页
    onBack() {
        wx.navigateBack();
    },

    // 处理同意状态变化
    onAgreeChange(e) {
        this.setData({
            isAgreed: e.detail.value.includes('agree')
        });
    },

    // 证件类型变化（控制出生日期显示）
    onIdTypeChange(e) {
        const {
            index
        } = e.currentTarget.dataset;
        const idTypeIndex = e.detail.value;
        console.log(' index idTypeIndex ' + index + ' ' + idTypeIndex)
        const applicants = [...this.data.applicants];
        applicants[index].idTypeIndex = idTypeIndex;
        // 护照/港澳/台湾通行证需要显示出生日期
        const showBirthday = [1, 2, 3, 4, 5].includes(Number(idTypeIndex));
        console.log('showBirthday ' + showBirthday);
        applicants[index].showBirthday = showBirthday;
        this.setData({
            applicants
        });
    },

    // 同意条款并前往支付
    onConfirm() {
        if (!this.data.isAgreed) return;
        // 关闭遮罩
        this.setData({
            showTerm: false
        });
        wx.setNavigationBarTitle({
            title: '活动报名'
        });
        // 记录用户同意状态（可选：保存到服务器）
        wx.setStorageSync(`agreed_terms_xx`, true);

        // 跳转到支付页面，携带订单信息
        // wx.navigateTo({
        //     url: `/pages/payment/index?orderId=${this.data.tripInfo.orderId}`
        // });
    },

    // 提交表单验证
    onSubmit() {
        const {
            applicants
        } = this.data;
        let isValid = true;
        let errorMsg = "";

        // 遍历每个报名人验证必填项
        applicants.forEach((item, index) => {
            if (!item.name.trim()) {
                isValid = false;
                errorMsg = `第 ${index + 1} 位报名人姓名为必填项`;
                return;
            }
            if (!/^1[3-9]\d{9}$/.test(item.phone.trim())) {
                isValid = false;
                errorMsg = `第 ${index + 1} 位报名人手机号码格式不正确`;
                return;
            }
            if (!item.idNumber.trim()) {
                isValid = false;
                errorMsg = `第 ${index + 1} 位报名人证件号码为必填项`;
                return;
            }
            if (item.showBirthday && !item.birthday.trim()) {
                isValid = false;
                errorMsg = `第 ${index + 1} 位报名人出生日期为必填项`;
                return;
            }
            if (!item.petInfo.trim()) {
                isValid = false;
                errorMsg = `第 ${index + 1} 位报名人宠物信息为必填项`;
                return;
            }
        });

        if (!isValid) {
            wx.showToast({
                title: errorMsg,
                icon: "none",
                duration: 2000
            });
            return;
        }

        // 验证通过，提交数据（实际项目中调用接口）
        wx.showLoading({
            title: "提交中..."
        });
        setTimeout(() => {
            wx.hideLoading();
            // 登记信息入库、订单信息入库
            // 用户输入的登记信息入库，方便下次填写

            // 订单信息，包含，route、route_service、order_user_id

            wx.showToast({
                title: "提交成功，跳转支付...",
                icon: "success"
            });
            // 跳转至支付页面
            setTimeout(() => {
                wx.navigateTo({
                    url: "/pages/payment/index"
                });
            }, 1500);
        }, 1000);
    }
});