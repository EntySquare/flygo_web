import { request } from '@/utils/request'


// 【管理】查询类别
// /manage/selectCategory
export const selectCategory = (data: any) => {
    return request({
        url: '/selectCategory',
        method: 'post',
        data,
    })
}
// 查询商品
// /manage/selectProduct
export const selectProduct = (data: any) => {
    return request({
        url: '/selectCategory',
        method: 'post',
        data,
    })
}

// 【管理】查询商品标签
// /manage/selectProductTag

export const selectProductTag = (data: any) => {
    return request({
        url: '/selectProductTag',
        method: 'post',
        data,
    })
}
// 【管理】查询规格
// /manage/selectSpec
export const selectSpec = (data: any) => {
    return request({
        url: '/selectSpec',
        method: 'post',
        data,
    })
}
// 【管理】查询标签
// /manage/selectTag
export const selectTag = (data: any) => {
    return request({
        url: '/selectTag',
        method: 'post',
        data,
    })
}
// 【管理】查询标签类型
// /manage/selectTagType
export const selectTagType = (data: any) => {
    return request({
        url: '/selectTagType',
        method: 'post',
        data,
    })
}
// 用户列表
// /manage/user/list
export const userList = (data: any) => {
    return request({
        url: '/user/list',
        method: 'post',
        data,
    })
}