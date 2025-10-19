import {
    model,
    getAll
} from '../_utils/model';
import {
    DATA_MODEL_KEY
} from '../../config/model';


const CUSTOMER_INFO_MODEL_KEY = DATA_MODEL_KEY.CUSTOMER_INFO;

// 证件类型枚举
export const IdType = {
    map: {
        ID_CARD: {
            value: 0,
            text: '身份证'
        },
        PASSPORT: {
            value: 1,
            text: '护照'
        },
        HK_MACAO_PASS: {
            value: 2,
            text: '港澳居民通行证'
        },
        TAIWAN_PASS: {
            value: 3,
            text: '台湾居民往来大陆通行证'
        },
        HK_MACAO_RESIDENCE: {
            value: 4,
            text: '中华人民共和国港澳居民居住证'
        },
        TAIWAN_RESIDENCE: {
            value: 5,
            text: '中华人民共和国台湾居民居住证'
        },
        MILITARY_ID: {
            value: 6,
            text: '军人证'
        }
    },
    list: [
        { value: 0, text: '身份证' },
        { value: 1, text: '护照' },
        { value: 2, text: '港澳居民通行证' },
        { value: 3, text: '台湾居民往来大陆通行证' },
        { value: 4, text: '中华人民共和国港澳居民居住证' },
        { value: 5, text: '中华人民共和国台湾居民居住证' },
        { value: 6, text: '军人证' }
      ],
};

export function getIdTypeText(value) {
  // 遍历map对象，找到value匹配的项
  for (const key in IdType.map) {
    if (IdType.map[key].value === value) {
      return IdType.map[key].text;
    }
  }
  return ''; // 未找到时返回空
}


/**
 *
 * @param {{
 *   customerArray: Array     // 本次下单的记录
 *   userInfoToImport: Array  // 已有的用户记录，若本次下单的有同名，将直接更新该用户信息，如果没有同名的，将入库；
 * }} param0
 * @returns
 */
export async function createCustomers(customerArray, userInfoToImport) {
    const dateModelToBeCreated = [];
    const customerList = []

    for (let j = 0 ; j < customerArray.length ; j++) {
        let isSame = false;
        for (let i = 0; i < userInfoToImport.length; i++) {
            // 同名、同手机号、同证件号的人，证明是同一个人，不必入库，否则就入库
            if (customerArray[j].name === userInfoToImport[i].full_name && customerArray[j].phone === userInfoToImport[i].phone_number &&
                String(customerArray[j].idTypeIndex) === userInfoToImport[i].id_type && customerArray[j].idNumber === userInfoToImport[i].id_number) {
                customerList.push(userInfoToImport[i]._id);
                isSame = true;
                break;
            }
        }
        if (isSame) {
            continue;
        }
        let user = {
            full_name: customerArray[j].name,
            date_of_birth: customerArray[j].showBirthday ? new Date(customerArray[j].birthday).getTime() : null,
            id_number: customerArray[j].idNumber,
            id_type: String(customerArray[j].idTypeIndex),
            phone_number: customerArray[j].phone,
            petInfo: customerArray[j].petInfo,
        }
        dateModelToBeCreated.push(user)
    }

    if (dateModelToBeCreated.length > 0) {
        const { data } = await model()[CUSTOMER_INFO_MODEL_KEY].createMany({
            data: dateModelToBeCreated
        });
        data.idList.forEach(element => {
            customerList.push(element);
        });
    }
    return customerList;
}

export async function listCustomerInfo(customerList) {
    return (
      await model()[CUSTOMER_INFO_MODEL_KEY].list({
        filter: {
            where: {
               _id : {
                   $in: customerList
               }
            }
        },
        getCount: true,
      })
    ).data;
  }

  /**
   * 用户自身创建的信息，默认仅能获取 本人创建的信息
   */
export async function getCustomInfoCreatedByMyself() {
    return (
      await model()[CUSTOMER_INFO_MODEL_KEY].list({
        pageSize: 200,
        pageNumber: 1,
        getCount: true,
      })
    ).data;
}

  /**
   * 用户自身创建的信息，默认仅能获取 本人创建的信息
   */
export async function updateCustomerInfo(customerInfo) {
    return (
        await model()[CUSTOMER_INFO_MODEL_KEY].update({
            data: customerInfo,
            filter: {
                where: {
                    _id: {
                        $eq: customerInfo._id, // 推荐传入_id数据标识进行操作
                    },
                },
            },
        }).data);
}