export const USER_ID = 'USER_MOCK';

export function createId() {
    return Array.from({
            length: 16
        })
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join('');
}
// 单一商品
export const SPU = [{
        owner: '1856254275343773698',
        priority: 1,
        swiper_images: ['https://qcloudimg.tencent-cloud.cn/raw/063123361b3a397f4ba6894591c3a006.png'],
        createdAt: 1731488370922,
        createBy: '1856254275343773698',
        updateBy: '1856254275343773698',
        _openid: '1856254275343773698',
        name: '腾讯QQ正版铜工艺品太空鹅全铜摆件',
        detail: '<p style="text-align: center"><span style="font-size: 32px"><strong><span style="color: #45818e"><i><span style="text-decoration: underline">腾讯QQ正版铜工艺品太空鹅全铜摆件</span></i></span></strong></span></p><p style="text-align: center"><span class="exeditor-picture"><img src="https://qcloudimg.tencent-cloud.cn/raw/063123361b3a397f4ba6894591c3a006.png" width="356" height="356"></span></p><p style="text-align: center">企鹅企鹅企鹅</p><p style="text-align: center"><span style="font-family: STKaiti, 华文楷体, serif">帅！</span></p>',
        cover_image: 'https://qcloudimg.tencent-cloud.cn/raw/063123361b3a397f4ba6894591c3a006.png',
        _id: 'P4_prod',
        updatedAt: 1731488370922,
        status: 'ENABLED',
    },
    {
        owner: '1856254275343773698',
        priority: 2,
        swiper_images: ['https://qcloudimg.tencent-cloud.cn/raw/62eb1d8d8ea3b05302c199636f787438.png'],
        createdAt: 1731488370775,
        createBy: '1856254275343773698',
        updateBy: '1856254275343773698',
        _openid: '1856254275343773698',
        name: '软底一脚蹬小白鞋女鞋休闲棉加绒显脚瘦',
        detail: '<p style="text-align: center"><span style="font-size: 32px"><span style="background-color: #00ff00"><strong><span style="color: #ea9999"><i>软底一脚蹬小白鞋女鞋休闲棉加绒显脚瘦</i></span></strong></span></span></p><p style="text-align: center"><span class="exeditor-picture"><img src="https://qcloudimg.tencent-cloud.cn/raw/62eb1d8d8ea3b05302c199636f787438.png" width="356" height="356"></span></p><p style="text-align: center">好穿</p>',
        cover_image: 'https://qcloudimg.tencent-cloud.cn/raw/62eb1d8d8ea3b05302c199636f787438.png',
        _id: 'P3_prod',
        updatedAt: 1731488370775,
        status: 'ENABLED',
    },
    {
        owner: '1856254275343773698',
        priority: 1,
        swiper_images: ['https://qcloudimg.tencent-cloud.cn/raw/7b2c975b21d24c43f1609e0b0328dccf.png'],
        createdAt: 1731488370653,
        createBy: '1856254275343773698',
        updateBy: '1856254275343773698',
        _openid: '1856254275343773698',
        name: '随身蓝牙无线音箱小型便携式迷你户外',
        detail: '<p style="text-align: center"><span style="font-size: 32px"><strong><span style="color: #ff9900"><i>随身蓝牙无线音箱小型便携式迷你户外</i></span></strong></span></p><p style="text-align: center"><span class="exeditor-picture"><img src="https://qcloudimg.tencent-cloud.cn/raw/7b2c975b21d24c43f1609e0b0328dccf.png" width="356" height="356"></span></p><p style="text-align: center">非常劲爆的音乐。</p>',
        cover_image: 'https://qcloudimg.tencent-cloud.cn/raw/7b2c975b21d24c43f1609e0b0328dccf.png',
        _id: 'P2_prod',
        updatedAt: 1731488370653,
        status: 'ENABLED',
    },
    {
        owner: '1856254275343773698',
        priority: 1,
        swiper_images: ['https://qcloudimg.tencent-cloud.cn/raw/ac3c9a255cae575661323fdcb8cae468.png'],
        createdAt: 1731488370507,
        createBy: '1856254275343773698',
        updateBy: '1856254275343773698',
        _openid: '1856254275343773698',
        name: '正版腾讯生肖祥龙Q版包包龙抬头',
        detail: '<p style="text-align: right"><span style="font-size: 32px"><span style="background-color: #434343"><strong><span style="color: #ffffff"><i><span style="text-decoration: underline">龙龙龙</span></i></span></strong></span></span></p><p style="text-align: right"><span class="exeditor-picture"><img src="https://qcloudimg.tencent-cloud.cn/raw/ac3c9a255cae575661323fdcb8cae468.png" width="356" height="356"></span></p><p style="text-align: right">每天带龙去上班。</p>',
        cover_image: 'https://qcloudimg.tencent-cloud.cn/raw/ac3c9a255cae575661323fdcb8cae468.png',
        _id: 'P1_prod',
        updatedAt: 1731488370507,
        status: 'ENABLED',
    },
];
// 某一个路线对应的具体配置
export const SKU = [{
        owner: '1856254275343773698',
        image: 'https://qcloudimg.tencent-cloud.cn/raw/063123361b3a397f4ba6894591c3a006.png',
        createdAt: 1731488370290,
        createBy: '1856254275343773698',
        updateBy: '1856254275343773698',
        price: 200,
        _openid: '1856254275343773698',
        count: 100,
        description: '1人1狗',
        spu: {
            _id: 'P4_prod'
        },
        _id: 'K6_prod',
        updatedAt: 1731488370290,
    },
    {
        owner: '1856254275343773698',
        image: 'https://qcloudimg.tencent-cloud.cn/raw/063123361b3a397f4ba6894591c3a006.png',
        createdAt: 1731488370145,
        createBy: '1856254275343773698',
        updateBy: '1856254275343773698',
        price: 150,
        _openid: '1856254275343773698',
        count: 100,
        description: '1人大巴',
        spu: {
            _id: 'P4_prod'
        },
        _id: 'K5_prod',
        updatedAt: 1731488370145,
    },
    {
        owner: '1856254275343773698',
        image: 'https://qcloudimg.tencent-cloud.cn/raw/063123361b3a397f4ba6894591c3a006.png',
        createdAt: 1731488370145,
        createBy: '1856254275343773698',
        updateBy: '1856254275343773698',
        price: 100,
        _openid: '1856254275343773698',
        count: 100,
        description: '1人自驾',
        spu: {
            _id: 'P4_prod'
        },
        _id: 'K5_prod',
        updatedAt: 1731488370145,
    },
    {
        owner: '1856254275343773698',
        image: 'https://qcloudimg.tencent-cloud.cn/raw/62eb1d8d8ea3b05302c199636f787438.png',
        createdAt: 1731488369981,
        createBy: '1856254275343773698',
        updateBy: '1856254275343773698',
        price: 300,
        _openid: '1856254275343773698',
        count: 100,
        description: '34 码小白鞋',
        spu: {
            _id: 'P3_prod'
        },
        _id: 'K4_prod',
        updatedAt: 1731488369981,
    },
    {
        owner: '1856254275343773698',
        image: 'https://qcloudimg.tencent-cloud.cn/raw/62eb1d8d8ea3b05302c199636f787438.png',
        createdAt: 1731488369817,
        createBy: '1856254275343773698',
        updateBy: '1856254275343773698',
        price: 300,
        _openid: '1856254275343773698',
        count: 95,
        description: '33 码小白鞋',
        spu: {
            _id: 'P3_prod'
        },
        _id: 'K3_prod',
        updatedAt: 1731488629039,
    },
    {
        owner: '1856254275343773698',
        image: 'https://qcloudimg.tencent-cloud.cn/raw/7b2c975b21d24c43f1609e0b0328dccf.png',
        createdAt: 1731488369644,
        createBy: '1856254275343773698',
        updateBy: '1856254275343773698',
        price: 100,
        _openid: '1856254275343773698',
        count: 100,
        description: '普通音箱',
        spu: {
            _id: 'P2_prod'
        },
        _id: 'K2_prod',
        updatedAt: 1731488369644,
    },
    {
        owner: '1856254275343773698',
        image: 'https://qcloudimg.tencent-cloud.cn/raw/ac3c9a255cae575661323fdcb8cae468.png',
        createdAt: 1731488369320,
        createBy: '1856254275343773698',
        updateBy: '1856254275343773698',
        price: 90,
        _openid: '1856254275343773698',
        count: 100,
        description: '普通斜挎包',
        spu: {
            _id: 'P1_prod'
        },
        _id: 'K1_prod',
        updatedAt: 1731488369320,
    },
];

export const HOME_SWIPER = [{
    images: ['cloud://cloudbase-8ggwz66a187bc814.636c-cloudbase-8ggwz66a187bc814-1373336490/header_1.png',
        'cloud://cloudbase-8ggwz66a187bc814.636c-cloudbase-8ggwz66a187bc814-1373336490/header_2.png'
    ],
    _id: 'A3QFLT6UVN',
}, ];

export const CATEGORY = [{
        owner: '1856254275343773698',
        createdAt: 1731488367747,
        createBy: '1856254275343773698',
        updateBy: '1856254275343773698',
        _openid: '1856254275343773698',
        name: '数码',
        spu: [],
        _id: 'C3_prod',
        child_cate: [{
            image: 'https://qcloudimg.tencent-cloud.cn/raw/7b2c975b21d24c43f1609e0b0328dccf.png',
            name: '音箱',
            _id: 'ACGNME9W2U',
        }, ],
        updatedAt: 1731488367747,
    },
    {
        owner: '1856254275343773698',
        createdAt: 1731488367429,
        createBy: '1856254275343773698',
        updateBy: '1856254275343773698',
        _openid: '1856254275343773698',
        name: '周边',
        spu: [],
        _id: 'C2_prod',
        child_cate: [{
            image: 'https://qcloudimg.tencent-cloud.cn/raw/063123361b3a397f4ba6894591c3a006.png',
            name: '摆件',
            _id: 'ACGNMD7TRS',
        }, ],
        updatedAt: 1731488367429,
    },
    {
        owner: '1856254275343773698',
        createdAt: 1731488366964,
        createBy: '1856254275343773698',
        updateBy: '1856254275343773698',
        _openid: '1856254275343773698',
        name: '服饰',
        spu: [],
        _id: 'C1_prod',
        child_cate: [{
                image: 'https://qcloudimg.tencent-cloud.cn/raw/ac3c9a255cae575661323fdcb8cae468.png',
                name: '箱包',
                _id: 'ACGNMBTP4L',
            },
            {
                image: 'https://qcloudimg.tencent-cloud.cn/raw/62eb1d8d8ea3b05302c199636f787438.png',
                name: '鞋子',
                _id: 'ACGNMCB9N8',
            },
        ],
        updatedAt: 1731488366964,
    },
    {
        owner: '1856254275343773698',
        image: 'https://qcloudimg.tencent-cloud.cn/raw/7b2c975b21d24c43f1609e0b0328dccf.png',
        createdAt: 1731488367913,
        createBy: '1856254275343773698',
        updateBy: '1856254275343773698',
        _openid: '1856254275343773698',
        name: '音箱',
        spu: [{
            _id: 'P2_prod'
        }],
        _id: 'ACGNME9W2U',
        child_cate: [],
        updatedAt: 1731488367913,
    },
    {
        owner: '1856254275343773698',
        image: 'https://qcloudimg.tencent-cloud.cn/raw/063123361b3a397f4ba6894591c3a006.png',
        createdAt: 1731488367571,
        createBy: '1856254275343773698',
        updateBy: '1856254275343773698',
        _openid: '1856254275343773698',
        name: '摆件',
        spu: [{
            _id: 'P4_prod'
        }],
        _id: 'ACGNMD7TRS',
        child_cate: [],
        updatedAt: 1731488367571,
    },
    {
        owner: '1856254275343773698',
        image: 'https://qcloudimg.tencent-cloud.cn/raw/62eb1d8d8ea3b05302c199636f787438.png',
        createdAt: 1731488367273,
        createBy: '1856254275343773698',
        updateBy: '1856254275343773698',
        _openid: '1856254275343773698',
        name: '鞋子',
        spu: [{
            _id: 'P3_prod'
        }],
        _id: 'ACGNMCB9N8',
        child_cate: [],
        updatedAt: 1731488367273,
    },
    {
        owner: '1856254275343773698',
        image: 'https://qcloudimg.tencent-cloud.cn/raw/ac3c9a255cae575661323fdcb8cae468.png',
        createdAt: 1731488367108,
        createBy: '1856254275343773698',
        updateBy: '1856254275343773698',
        _openid: '1856254275343773698',
        name: '箱包',
        spu: [{
            _id: 'P1_prod'
        }],
        _id: 'ACGNMBTP4L',
        child_cate: [],
        updatedAt: 1731488367108,
    },
];

export const ATTR_VALUE = [{
        owner: '1856254275343773698',
        createdAt: 1731488369101,
        createBy: '1856254275343773698',
        updateBy: '1856254275343773698',
        attr_name: {
            name: '数量',
            _id: 'N2_prod'
        },
        _openid: '1856254275343773698',
        _id: 'V4_prod',
        sku: [{
            _id: 'K6_prod'
        }],
        value: '2 个',
        updatedAt: 1731488369101,
    },
    {
        owner: '1856254275343773698',
        createdAt: 1731488368972,
        createBy: '1856254275343773698',
        updateBy: '1856254275343773698',
        attr_name: {
            name: '数量',
            _id: 'N2_prod'
        },
        _openid: '1856254275343773698',
        _id: 'V3_prod',
        sku: [{
            _id: 'K5_prod'
        }],
        value: '1 个',
        updatedAt: 1731488368972,
    },
    {
        owner: '1856254275343773698',
        createdAt: 1731488368836,
        createBy: '1856254275343773698',
        updateBy: '1856254275343773698',
        attr_name: {
            name: '尺码',
            _id: 'N1_prod'
        },
        _openid: '1856254275343773698',
        _id: 'V2_prod',
        sku: [{
            _id: 'K4_prod'
        }],
        value: '34 码',
        updatedAt: 1731488368836,
    },
    {
        owner: '1856254275343773698',
        createdAt: 1731488368490,
        createBy: '1856254275343773698',
        updateBy: '1856254275343773698',
        attr_name: {
            name: '尺码',
            _id: 'N1_prod'
        },
        _openid: '1856254275343773698',
        _id: 'V1_prod',
        sku: [{
            _id: 'K3_prod'
        }],
        value: '33 码',
        updatedAt: 1731488368490,
    },
];

export const COMMENTS = [{
    owner: '1788891669799862274',
    createdAt: 1728899184779,
    createBy: '1788891669799862274',
    updateBy: '1788891669799862274',
    order_item: {
        _id: 'A6JRQ0YB2G',
    },
    spu: {
        _id: 'A3QFLUSAK2',
    },
    _openid: '1788891669799862274',
    rating: 5,
    _id: 'A6JRGRT6U8',
    reply: '',
    content: '好好好',
    updatedAt: 1728899339993,
}, ];
COMMENTS.pop(); // 默认没数据，先塞后清是为了有编辑器提示

export const CART_ITEM = [{
    count: 8,
    _id: 'A6JQYSJJSL',
    sku: {
        _id: 'A3QFLRCZFW',
    },
}, ];

CART_ITEM.pop();

export const DELIVERY_INFO = [{
    name: '客人a',
    address: '深圳湾一号',
    _id: 'A6JRPE3NYG',
    phone: '13858585858',
}, ];

DELIVERY_INFO.pop();

export const ORDER = [{
    "_id": "f1ebb68068b45d490098a3657e2ea54d",
    "owner": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
    "route_id": "f97e292f68a5dcbb02b2fcbc1402ebb7",
    "total_price": 798.0,
    "route_name": "去从化玩咯",
    "service_names": ["2人1宠（送宠物座位）"],
    "customer_notes": "好玩啊",
    "order_status": "0",
    "createdAt": 1756650825938,
    "createBy": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
    "updateBy": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
    "_openid": "o6Pdp1zo59H14A5P1g1x0KwzrtwM",
    "service_ids": ["2ccbb81568a5dcbb02acdff17d975642"],
    "customer_id": ["5ee6d14c68b45d470097649d60c9fd6f", "5ee6d14c68b45d470097649e7eb8d103"],
    "order_id": "20250831223343587",
    "updatedAt": 1756650825938
}];

// ORDER.pop();

export const ORDER_ITEM = [{
    count: 0,
    sku: {
        _id: '',
    },
    order: {
        _id: '',
    },
    _id: '',
}, ];

ORDER_ITEM.pop();

// 某一个路线对应的具体配置
export const
    ROUTE_MOCK = [{
        "_id": "f97e292f68a5dcbb02b2fcbc1402ebb7",
        "owner": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
        "swiper_images": ["cloud://cloudbase-8ggwz66a187bc814.636c-cloudbase-8ggwz66a187bc814-1373336490/route_carousel/1755700409551-0-285l8s.jpg", "cloud://cloudbase-8ggwz66a187bc814.636c-cloudbase-8ggwz66a187bc814-1373336490/route_carousel/1755700409555-1-zc5c9l.jpg"],
        "createdAt": 1755700411521,
        "createBy": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
        "updateBy": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
        "_openid": "o6Pdp1zo59H14A5P1g1x0KwzrtwM",
        "name": "去从化玩咯",
        "detail": ["cloud://cloudbase-8ggwz66a187bc814.636c-cloudbase-8ggwz66a187bc814-1373336490/route_detail/1755700410448-0-kks237.jpg", "cloud://cloudbase-8ggwz66a187bc814.636c-cloudbase-8ggwz66a187bc814-1373336490/route_detail/1755700410451-1-rmzspd.jpg"],
        "priority": 0,
        "status": true,
        "updatedAt": 1755700411521
    }, {
        "_id": "d84b302f68a5f37802b44c63013d405e",
        "owner": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
        "swiper_images": ["cloud://cloudbase-8ggwz66a187bc814.636c-cloudbase-8ggwz66a187bc814-1373336490/route_carousel/1755706230319-0-hkhm82.jpg", "cloud://cloudbase-8ggwz66a187bc814.636c-cloudbase-8ggwz66a187bc814-1373336490/route_carousel/1755706230320-1-lkgoa1.jpg"],
        "createdAt": 1755706232645,
        "createBy": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
        "updateBy": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
        "_openid": "o6Pdp1zo59H14A5P1g1x0KwzrtwM",
        "name": "去惠州玩",
        "detail": ["cloud://cloudbase-8ggwz66a187bc814.636c-cloudbase-8ggwz66a187bc814-1373336490/route_detail/1755706231443-0-kriyql.jpg", "cloud://cloudbase-8ggwz66a187bc814.636c-cloudbase-8ggwz66a187bc814-1373336490/route_detail/1755706231447-1-fpeizm.jpg"],
        "priority": 0,
        "status": true,
        "updatedAt": 1755706232645
    }];

    // 某一个路线对应的具体配置
    export const
        ROUTE_SERVICES_MOCK = [{
            "_id": "2ccbb81568a5dcbb02acdfee00807615",
            "owner": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "createdAt": 1755700411924,
            "createBy": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "is_active": true,
            "updateBy": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "price": 199.0,
            "service_name": "1人自驾",
            "_openid": "o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "updatedAt": 1755700411924,
            "route_id": "f97e292f68a5dcbb02b2fcbc1402ebb7"
        }, {
            "_id": "2ccbb81568a5dcbb02acdfef0c0a2639",
            "owner": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "createdAt": 1755700411924,
            "createBy": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "is_active": true,
            "updateBy": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "price": 159.0,
            "service_name": "1人大巴",
            "_openid": "o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "updatedAt": 1755700411924,
            "route_id": "f97e292f68a5dcbb02b2fcbc1402ebb7"
        }, {
            "_id": "2ccbb81568a5dcbb02acdff00977641f",
            "owner": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "createdAt": 1755700411924,
            "createBy": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "is_active": true,
            "updateBy": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "price": 259.0,
            "service_name": "1人1宠",
            "_openid": "o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "updatedAt": 1755700411924,
            "route_id": "f97e292f68a5dcbb02b2fcbc1402ebb7"
        }, {
            "_id": "2ccbb81568a5dcbb02acdff17d975642",
            "owner": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "createdAt": 1755700411924,
            "createBy": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "is_active": true,
            "updateBy": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "price": 399.0,
            "service_name": "2人1宠（送宠物座位）",
            "_openid": "o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "updatedAt": 1755700411924,
            "route_id": "f97e292f68a5dcbb02b2fcbc1402ebb7"
        }, {
            "_id": "b157edf068a5f37902b2ecad434b5d30",
            "owner": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "createdAt": 1755706233005,
            "createBy": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "is_active": true,
            "updateBy": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "price": 199.0,
            "service_name": "1人自驾",
            "_openid": "o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "updatedAt": 1755706233005,
            "route_id": "d84b302f68a5f37802b44c63013d405e"
        }, {
            "_id": "b157edf068a5f37902b2ecae760a69e3",
            "owner": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "createdAt": 1755706233005,
            "createBy": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "is_active": true,
            "updateBy": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "price": 159.0,
            "service_name": "1人大巴",
            "_openid": "o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "updatedAt": 1755706233005,
            "route_id": "d84b302f68a5f37802b44c63013d405e"
        }, {
            "_id": "b157edf068a5f37902b2ecaf06d309c8",
            "owner": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "createdAt": 1755706233005,
            "createBy": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "is_active": true,
            "updateBy": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "price": 259.0,
            "service_name": "1人1宠",
            "_openid": "o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "updatedAt": 1755706233005,
            "route_id": "d84b302f68a5f37802b44c63013d405e"
        }, {
            "_id": "b157edf068a5f37902b2ecb004d5f43a",
            "owner": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "createdAt": 1755706233005,
            "createBy": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "is_active": true,
            "updateBy": "weda_o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "price": 399.0,
            "service_name": "2人1宠（送宠物座位）",
            "_openid": "o6Pdp1zo59H14A5P1g1x0KwzrtwM",
            "updatedAt": 1755706233005,
            "route_id": "d84b302f68a5f37802b44c63013d405e"
        }]