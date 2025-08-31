import {
    model,
    getAll
} from '../_utils/model';
import {
    DATA_MODEL_KEY
} from '../../config/model';
import {
    cloudbaseTemplateConfig
} from '../../config/index';
import {
    ROUTE_SERVICES_MOCK
} from '../cloudbaseMock/index';

const ROUTE_SERVICE_MODEL_KEY = DATA_MODEL_KEY.ROUTE_SERVICE;

/**
 *
 * @param {String} skuId
 */
export async function getSkuDetail(skuId) {
    if (cloudbaseTemplateConfig.useMock) {
        const sku = SKU.find((x) => x._id === skuId);
        sku.attr_value = ATTR_VALUE.filter((x) => x.sku.find((x) => x._id === skuId));
        sku.spu = SPU.find((spu) => spu._id === sku.spu._id);
        return sku;
    }

    const {
        data
    } = await model()[SKU_MODEL_KEY].get({
        filter: {
            where: {
                _id: {
                    $eq: skuId
                },
            },
        },
        select: {
            _id: true,
            count: true,
            price: true,
            image: true,
            attr_value: {
                value: true,
                _id: true,
            },
            spu: {
                name: true,
            },
        },
    });
    return data;
}

export async function updateSku({
    skuId,
    data
}) {
    if (cloudbaseTemplateConfig.useMock) {
        SKU.find((x) => x._id === skuId).count = data.count;
        return;
    }

    return wx.cloud.callFunction({
        // 云函数名称
        name: 'shop_update_sku',
        // 传给云函数的参数
        data: {
            skuId,
            data,
        },
    });
}

export async function getAllRouteServices(routeId) {
    if (cloudbaseTemplateConfig.useMock) {
        return ROUTE_SERVICES_MOCK.filter((x) => x.route_id === routeId);
    }
    return getAll({
        name: ROUTE_SERVICE_MODEL_KEY,
        filter: {
            where: {
                route_id: {
                    $eq: routeId,
                },
            },
        },
    });
}


export async function getRouteService(route_service_id) {
    return (
        await model()[ROUTE_SERVICE_MODEL_KEY].get({
            filter: {
                where: {
                    _id: {
                        $eq: route_service_id
                    }
                },
            },
        })
    ).data;
}