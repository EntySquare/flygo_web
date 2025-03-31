import { request } from '@/utils/request'

// 【管理】添加商品
// /manage/addProduct
export const addTreasureHuntProduct = (data: any) => {
    return request({
        url: '/treasureHunt/addProduct',
        method: 'post',
        data,
    })
}

// 【管理】删除商品
// /manage/deleteProduct
export const deleteProduct = (data: any) => {
    return request({
        url: '/treasureHunt/deleteProduct',
        method: 'post',
        data,
    })
}

// 查询商品
// /manage/selectProduct
export const selectProduct = (data: any) => {
    return request({
        url: '/treasureHunt/selectProduct',
        method: 'post',
        data,
    })
}

// 【管理】更新商品
// /manage/updateProduct
export const updateProduct = (data: any) => {
    return request({
        url: '/treasureHunt/updateProduct',
        method: 'post',
        data,
    })
}


// /manage/updateSpec
export const updateSpec = (data: any) => {
    return request({
        url: '/treasureHunt/updateSpec',
        method: 'post',
        data,
    })
}
// 【管理】更新标签
// /manage/updateTag
export const updateTag = (data: any) => {
    return request({
        url: '/treasureHunt/updateTag',
        method: 'post',
        data,
    })
}
// 【管理】更新标签类型
// /manage/updateTagType
export const updateTagType = (data: any) => {
    return request({
        url: '/treasureHunt/updateTagType',
        method: 'post',
        data,
    })
}
// 【管理】添加规格
// /manage/addSpec
export const addSpec = (data: any) => {
    return request({
        url: '/treasureHunt/addSpec',
        method: 'post',
        data,
    })
}
// 【管理】删除规格
// /manage/deleteSpec
export const deleteSpec = (data: any) => {
    return request({
        url: '/treasureHunt/deleteSpec',
        method: 'post',
        data,
    })
}


// 【管理】获取可选标签
// /manage/getAvailableTag
export const getAvailableTag = (data: any) => {
    return request({
        url: '/treasureHunt/getAvailableTag',
        method: 'post',
        data,
    })
}

// 【管理】查询规格
// /manage/selectSpec
export const selectSpec = (data: any) => {
    return request({
        url: '/treasureHunt/selectSpec',
        method: 'post',
        data,
    })
}

// 【管理】更新商品标签
// /manage/updateProductTag
export const updateProductTag = (data: any) => {
    return request({
        url: '/treasureHunt/updateProductTag',
        method: 'post',
        data,
    })
}

