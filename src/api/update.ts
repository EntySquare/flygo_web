import { request } from '@/utils/request'


// 【管理】更新类别
// /manage/updateCategory
export const updateCategory = (data: any) => {
    return request({
        url: '/updateCategory',
        method: 'post',
        data,
    })
}
// 【管理】更新商品
// /manage/updateProduct
export const updateProduct = (data: any) => {
    return request({
        url: '/updateProduct',
        method: 'post',
        data,
    })
}
// 【管理】更新商品标签
// /manage/updateProductTag
export const updateProductTag = (data: any) => {
    return request({
        url: '/updateProductTag',
        method: 'post',
        data,
    })
}
// 【管理】更新规格
// /manage/updateSpec
export const updateSpec = (data: any) => {
    return request({
        url: '/updateSpec',
        method: 'post',
        data,
    })
}
// 【管理】更新标签
// /manage/updateTag
export const updateTag = (data: any) => {
    return request({
        url: '/updateTag',
        method: 'post',
        data,
    })
}
// 【管理】更新标签类型
// /manage/updateTagType
export const updateTagType = (data: any) => {
    return request({
        url: '/updateTagType',
        method: 'post',
        data,
    })
}