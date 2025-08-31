import {
    model,
    getAll
} from '../../services/_utils/model';
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


/**
 *
 * @param {{
 *   customerArray: Array
 * }} param0
 * @returns
 */
export async function createCustomers(customerArray) {
    const dateModelArray = [];
    customerArray.forEach((item, index) => {
        dateModelArray.push({
            full_name: item.name,
            date_of_birth: new Date(item.birthday).getTime(),
            id_number: item.idNumber,
            id_type: String(item.idTypeIndex),
            phone_number: item.phone
        })
    })
    return model()[CUSTOMER_INFO_MODEL_KEY].createMany({
            data: dateModelArray
        });
}