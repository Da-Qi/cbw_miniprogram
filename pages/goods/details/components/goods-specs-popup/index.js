const ATTR_VALUE_STATUS = {
    PICKED: 'picked',
    UNPICKED: 'unpicked',
    DISABLED: 'disabled',
};

Component({
    options: {
        multipleSlots: true,
        addGlobalClass: true,
    },

    properties: {
        title: String,
        show: {
            type: Boolean,
            value: false,
        },
        initProps: {
            type: Object,
            observer(initProps) {
                if (!initProps) {
                    return;
                }
                const {
                    services,
                    route
                } = initProps;
                const serviceList = initServices(services);
                console.log('serviceList ' + serviceList.values)
                this.setData({
                    services,
                    route,
                    serviceList
                });

                const imgSrc = route.swiper_images[0];
                console.log('imgSrc ' + imgSrc)
                this.setData({
                    imgSrc,
                });
            },
        },
        outOperateStatus: {
            type: String,
            value: 'no',
        },
    },

    data: {
        price: 0,
        imgSrc: '',
        max: 999,
        skus: [],
        services: [],
        attrList: [],
        serviceList: [],
        spu: null,
        pickedSku: null,
        value: 1,
        totalSalePrice:0
    },

    observers: {
        'pickedSku': function (pickedSku) {
            let price;
            price = pickedSku.price;
            this.setData({
                price
            });
        },
        max: function (max) {
            const {
                value
            } = this.data;
            if (value > max) {
                this.setData({
                    value: max,
                });
            }
        },
        'attrList': function (attrList) {
            const sku = this.pickOnlySku(attrList);
            sku && this.triggerEvent('picked');
            this.setData({
                pickedSku: sku
            });
        },
    },

    methods: {
        clickAttrValue({
            target: {
                dataset: {
                    attrValueIndex,
                    attrNameIndex
                },
            },
        }) {
            const setAttrListWithCalculation = (serviceList) => {
                const sku = this.pickOnlySku(serviceList);
                this.setData({
                    serviceList,
                    pickedSku: sku,
                    totalSalePrice: this.data.value * sku.price
                });
            };
            const {
                serviceList
            } = this.data;

            const attrName = serviceList[attrNameIndex];
            const attrValue = attrName.values[attrValueIndex];

            switch (attrValue.status) {
                case ATTR_VALUE_STATUS.UNPICKED:
                    // pick it, and set others unpicked
                    attrName.values.forEach((value) => {
                        value.status = value === attrValue ? ATTR_VALUE_STATUS.PICKED : ATTR_VALUE_STATUS.UNPICKED;
                    });
                    setAttrListWithCalculation(serviceList);
                    break;
                case ATTR_VALUE_STATUS.DISABLED:
                    // do nothing
                    break;
                case ATTR_VALUE_STATUS.PICKED:
                    // unpick it
                    attrValue.status = ATTR_VALUE_STATUS.UNPICKED;
                    setAttrListWithCalculation(serviceList);
                    break;
                default:
                    // invalid status, skip
                    return;
            }
            this.triggerEvent('change', { 
                pickedService: this.data.pickedSku,  // 传递变化后的值
            });
        },

        pickOnlySku(attrList) {
            const pickedAttrValues = attrList
                .map((x) => x.values.find((x) => x.status === ATTR_VALUE_STATUS.PICKED))
                .filter((x) => x != null);
            if (pickedAttrValues.length !== attrList.length) {
                // should pick more
                return null;
            }
            return this.data.services.find((x) => x._id === pickedAttrValues[0]._id);
        },

        specsConfirm() {
            if (this.data.outOperateStatus === 'cart') {
                this.addCart();
            } else if (this.data.outOperateStatus === 'buy') {
                this.buyNow();
            }
        },

        handlePopupHide() {
            this.triggerEvent('closeSpecsPopup', {
                show: false,
            });
        },

        addCart() {
            const {
                pickedSku,
                max,
                value
            } = this.properties;
            if (pickedSku == null) {
                return;
            }
            if (value > max) {
                return;
            }
            if (value < 1) {
                return;
            }
            this.triggerEvent('addCart', {
                pickedSku,
                count: value
            });
        },

        buyNow() {
            const {
                pickedSku,
                max,
                value
            } = this.properties;
            if (pickedSku == null) {
                return;
            }
            if (value > max) {
                return;
            }
            if (value < 1) {
                return;
            }
            this.triggerEvent('buyNow', {
                pickedSku,
                count: value
            });
        },

        handleBuyNumChange({
            detail: {
                value
            }
        }) {
            this.setData({
                value,
                totalSalePrice: value * this.data.pickedSku.price
            });
            this.triggerEvent('changeNum', {
                buyNum: value
            });
        },
    },
    lifetimes: {},
});

function getTotalPrice(){

}

/**
 *
 * @param {Array} services
 * @returns {Array}
 */
function initServices(services) {
    const list = services.reduce((acc, cur) => {
        const item = acc.find((x) => x.name === '参与方式');
        if (item != null) {
            // already has this attr name, push value to this item
            if (item.values.find((x) => x._id === cur._id) != null) {
                // already has this attr value, do nothing
            } else {
                item.values.push({
                    value: cur.service_name,
                    _id: cur._id,
                    status: ATTR_VALUE_STATUS.UNPICKED,
                });
            }
        } else {
            // not added attr kind, make a new one
            acc.push({
                name: '参与方式',
                values: [{
                    value: cur.service_name,
                    _id: cur._id,
                    status: ATTR_VALUE_STATUS.UNPICKED,
                }, ],
            });
        }
        return acc;
    }, []);
    return list;
}

/**
 *
 * @param {{container: Array, arr: Array, eq: (a, b) => boolean}} param0
 * @returns
 */
function contains({
    container,
    arr,
    eq
}) {
    return arr.every((itemInArr) => container.findIndex((x) => eq(x, itemInArr)) !== -1);
}

/**
 *
 * @param {Array} skus
 */
function collectAttrValueSet(skus) {
    const attrValues = skus.reduce((acc, sku) => {
        sku.attrValues.forEach((value) => {
            if (acc.find((x) => x._id === value._id) != null) {
                // exists, skip
            } else {
                acc.push(Object.assign({}, value));
            }
        });
        return acc;
    }, []);
    return attrValues;
}