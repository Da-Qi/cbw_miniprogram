export function DB() {
    return globalThis.database;
}

async function operate_user({
    action,
    userInfo
}) {
    console.log(action + ' ' + userInfo)
    if (action === 'add') {
        console.log(action + ' ' + userInfo)
        return await DB().collection('users').add({
            data: {
                avatarUrl: userInfo.avatarUrl,
                nickname: userInfo.nickName,
                createdAt: new Date()
            }
        }).then(res => {
            console.log(res)
        })
    } else if (action === "get") {
        console.log(action + ' ' + userInfo)
        return await DB().collection('users').where({
            _openid: userInfo.openid // 填入当前用户 openid
        }).get()
    }
}

async function check_admin({
    openId
}) {
    const res = await DB().collection('admins').where({
        openid
    }).get()
    return {
        isAdmin: res.data.length > 0
    }
}


module.exports = {
    operate_user
}