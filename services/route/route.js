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
    ROUTE_MOCK,
    createId
} from '../cloudbaseMock/index';

const ROUTE_MODEL_KEY = DATA_MODEL_KEY.ROUTE;
const ROUTE_SERVICE_MODEL_KEY = DATA_MODEL_KEY.ROUTE_SERVICE;


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

export async function createRouteServices({serviceArray}) {
    return model()[ROUTE_SERVICE_MODEL_KEY].createMany({
        data: serviceArray,
    });
}