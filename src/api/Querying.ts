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
        url: '/selectProduct',
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


// 【管理】获取可选标签
// /manage/getAvailableTag
export const getAvailableTag = (data: any) => {
    return request({
        url: '/getAvailableTag',
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


// 【管理】获取首页数据
// /manage/managerHomeData
export const homeData = () => {
    return request({
        url: '/managerHomeData',
        method: 'post',
        data: {}
    })
}
// 【管理】设置轮播图
// /manage/setCarouselImages
export const setCarouselImages = (data: any) => {
    return request({
        url: '/setCarouselImages',
        method: 'post',
        data: data
    })
}
// 【管理】设置平铺图
// /manage/setRawImages
export const setRawImages = (data: any) => {
    return request({
        url: '/setRawImages',
        method: 'post',
        data: data
    })
}
// 【管理】设置热门商品
// /manage/setHotList
export const setHotList = (data: any) => {
    return request({
        url: '/setHotList',
        method: 'post',
        data: data
    })
}
// 【管理】设置今日商品
// /manage/setTodayDeal
export const setTodayDeal = (data: any) => {
    return request({
        url: '/setTodayDeal',
        method: 'post',
        data: data
    })
}

// 查询用户资产
export const selectUserAsset = (data: any) => {
    return request({
        url: '/selectUserAsset',
        method: 'post',
        data: data
    })
}
// 查询用户资产明细
export const selectUserAssetRecord = (data: any) => {
    return request({
        url: '/selectUserAssetRecord',
        method: 'post',
        data: data
    })
}
// 获取提现申请列表
export const withdrawList = (data: any) => {
    return request({
        url: '/withdraw/list',
        method: 'post',
        data: data
    })
}
// 处理提现申请
export const withdrawHandle = (data: any) => {
    return request({
        url: '/withdraw/handle',
        method: 'post',
        data: data
    })
}

// 查询代理商配置
export const selectAgentConfig = (data: any) => {
    return request({
        url: '/selectAgentConfig',
        method: 'post',
        data: data
    })
}
// 更新代理商配置
export const updateAgentConfig = (data: any) => {
    return request({
        url: '/updateAgentConfig',
        method: 'post',
        data: data
    })
}