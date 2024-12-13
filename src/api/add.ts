import { request } from '@/utils/request'


// 【管理】添加类别
// /manage/addCategory
export const addCategory = (data: any) => {
    return request({
        url: '/addCategory',
        method: 'post',
        data,
    })
}
// 【管理】添加商品
// /manage/addProduct
export const addProduct = (data: any) => {
    return request({
        url: '/addProduct',
        method: 'post',
        data,
    })
}

//【管理】添加商品标签
// /manage/addProductTag
export const addProductTag = (data: any) => {
    return request({
        url: '/addProductTag',
        method: 'post',
        data,
    })
}
// 【管理】添加规格
// /manage/addSpec
export const addSpec = (data: any) => {
    return request({
        url: '/addSpec',
        method: 'post',
        data,
    })
}
// 【管理】添加标签
// /manage/addTag
export const addTag = (data: any) => {
    return request({
        url: '/addTag',
        method: 'post',
        data,
    })
}
// 【管理】添加标签类型
// /manage/addTagType
export const addTagType = (data: any) => {
    return request({
        url: '/addTagType',
        method: 'post',
        data,
    })
}