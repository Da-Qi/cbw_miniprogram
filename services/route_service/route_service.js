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

export async function removeRouteServiceOfOneRoute(route_id) {
    return (
        await model()[ROUTE_SERVICE_MODEL_KEY].deleteMany({
            filter: {
                where: {
                    route_id: {
                        $eq: route_id
                    }
                },
            },
        })
    ).data;
}