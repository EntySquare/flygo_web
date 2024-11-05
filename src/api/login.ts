import { request, fileRequest } from '@/utils/request'

export const Login = (data: any) => {
    return request({
        url: '/login',
        method: 'post',
        data,

    })
}

//是修改是否kyc的接口
// Flag           string       `json:"flag"` 传的字段
export const checkUserInfo = (data: any) => {
    return request({
        url: '/checkUserInfo',
        method: 'post',
        data

    })
}



// 查询用户信息接口 要筛选就传对应字段    id 用户名 手机号 身份证 只能筛选这四个
export const viewUserInfo = (data: any) => {
    return request({
        url: '/viewUserInfo',
        method: 'post',
        data
    })
}

export const uploadFile = (data: any, headers: any) => {
    return fileRequest({
        url: '/upload',
        method: 'post',
        data,
        headers,
    })
}

export const downloadFile = (data: any) => {
    return fileRequest({
        url: '/downloadImg',
        method: 'post',
        data,
    })
}


