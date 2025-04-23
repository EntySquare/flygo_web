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

// 询参与夺宝的商品 夺宝
export const selectItem = (data: any) => {
    return request({
        url: '/treasureHunt/selectItem',
        method: 'post',
        data,
    })
}

// 添加夺宝参与的商品
export const addItem = (data: any) => {
    return request({
        url: '/treasureHunt/addItem',
        method: 'post',
        data,
    })
}
// 修改夺宝参与的商品的状态为进行中
export const updateItemStatusProcessing = (data: any) => {
    return request({
        url: '/treasureHunt/updateItemStatusProcessing',
        method: 'post',
        data,
    })
}
// 查询夺宝中奖订单
export const adminQueryPurchaseOrder = (data: any) => {
    return request({
        url: '/treasureHuntOrder/adminQueryPurchaseOrder',
        method: 'post',
        data,
    })
}

// 处理中奖订单(提货/转卖)
export const handleWinner = (data: any) => {
    return request({
        url: '/treasureHuntOrder/handleWinner',
        method: 'post',
        data,
    })
}
// 后台更新用户夺宝订单的物流状态
export const updateShippingStatus = (data: any) => {
    return request({
        url: '/treasureHuntOrder/updateShippingStatus',
        method: 'post',
        data,
    })
}

// 设置夺宝中奖用户
export const setWinner = (data: any) => {
    return request({
        url: '/treasureHunt/setWinner',
        method: 'post',
        data,
    })
}
// 获取系统配置值
export const getKeyValues = () => {
    return request({
        url: '/keyValues/get',
        method: 'get',
    })
}

// 更新系统配置值
export const keyValuesUpdate = (data: any) => {
    return request({
        url: '/keyValues/update',
        method: 'post',
        data,
    })
}