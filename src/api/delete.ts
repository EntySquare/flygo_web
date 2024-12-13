import { request } from '@/utils/request'

// 【管理】删除类别
// /manage/deleteCategory
export const deleteCategory = (data: any) => {
    return request({
        url: '/deleteCategory',
        method: 'post',
        data,
    })
}
// 【管理】删除商品
// /manage/deleteProduct
export const deleteProduct = (data: any) => {
    return request({
        url: '/deleteProduct',
        method: 'post',
        data,
    })
}
// 【管理】删除商品标签
// /manage/deleteProductTag
export const deleteProductTag = (data: any) => {
    return request({
        url: '/deleteProductTag',
        method: 'post',
        data,
    })
}
// 【管理】删除规格
// /manage/deleteSpec
export const deleteSpec = (data: any) => {
    return request({
        url: '/deleteSpec',
        method: 'post',
        data,
    })
}
// 【管理】删除标签
// /manage/deleteTag
export const deleteTag = (data: any) => {
    return request({
        url: '/deleteTag',
        method: 'post',
        data,
    })
}
// 【管理】删除标签类型
// /manage/deleteTagType
export const deleteTagType = (data: any) => {
    return request({
        url: '/deleteTagType',
        method: 'post',
        data,
    })
}