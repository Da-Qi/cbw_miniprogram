import {
    DATA_MODEL_KEY
} from '../../config/model';
import {
    getAll,
    model
} from '../_utils/model';
import {
    cloudbaseTemplateConfig
} from '../../config/index';
import {
    ROUTE_MOCK
} from '../cloudbaseMock/index';

const ROUTE_MODEL_KEY = DATA_MODEL_KEY.ROUTE;
const ROUTE_SERVICE_MODEL_KEY = DATA_MODEL_KEY.ROUTE_SERVICE;

/**
 * 路线是否启用
 */
export const SPU_SELLING_STATUS = true;

export async function createRoute({
    name,
    priority,
    swiper_images,
    detail,
    status
}) {
    //  if (cloudbaseTemplateConfig.useMock) {
    //     ROUTE_MOCK.push({
    //      address,
    //      name,
    //      phone,
    //    });
    //    return;
    //  }
    return model()[ROUTE_MODEL_KEY].create({
        data: {
            name,
            priority,
            swiper_images,
            detail,
            status
        },
    });
}

export async function createRouteServices({
    serviceArray
}) {
    return model()[ROUTE_SERVICE_MODEL_KEY].createMany({
        data: serviceArray,
    });
}

/**
 * 展示所有路线
 */
export async function listRoutes({
    pageSize,
    pageNumber,
    search
}) {
    // if (cloudbaseTemplateConfig.useMock) {
    //   const records = search ? ROUTE_MOCK.filter((x) => x.name.includes(search)) : ROUTE_MOCK;
    //   const startIndex = (pageNumber - 1) * pageSize;
    //   const endIndex = startIndex + pageSize;
    //   return {
    //     records: records.slice(startIndex, endIndex),
    //     total: records.length,
    //   };
    // }
    const filter = {
        where: {
            status: {
                $eq: SPU_SELLING_STATUS
            }
        },
    };
    if (search) {
        filter.where.name = {
            $search: search
        };
    }

    return (
        await model()[ROUTE_MODEL_KEY].list({
            filter,
            pageSize,
            pageNumber,
            getCount: true
        })
    ).data;
}

export async function getPrice(routeId) {
    // if (cloudbaseTemplateConfig.useMock) {
    //   return SKU.find((x) => x.spu._id === routeId).price;
    // }
    const {
        data: {
            records
        },
    } = await model()[ROUTE_SERVICE_MODEL_KEY].list({
        select: {
            price: true,
        },
        filter: {
            where: {
                route_id: {
                    $eq: routeId,
                },
            },
        },
        orderBy: [
            {
                price: 'asc',
            },
          ],
    });
    console.log(records[0])
    return records[0].price;
}