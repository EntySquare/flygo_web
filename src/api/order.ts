import { request } from '@/utils/request'
// 【管理】后台查询购买订单
//  /manage/order/adminQueryPurchaseOrder
export const adminQueryPurchaseOrder = (data: any) => {
    return request({
        url: '/order/adminQueryPurchaseOrder',
        method: 'post',
        data,
    })
}
// 【管理】后台查看订单评价
//  /manage/order/displayOrderComment
export const displayOrderComment = (data: any) => {
    return request({
        url: '/order/displayOrderComment',
        method: 'post',
        data,
    })
}
// 【管理】后台同意退款  
// /manage/order/proveRefundOrder
export const proveRefundOrder = (data: any) => {
    return request({
        url: '/order/proveRefundOrder',
        method: 'post',
        data,
    })
}
// 【管理】后台拒绝退款
// /manage/order/refuseRefundOrder
export const refuseRefundOrder = (data: any) => {
    return request({
        url: '/order/refuseRefundOrder',
        method: 'post',
        data,
    })
}
// 【管理】后台更新用户订单的物流状态
// /manage/order/updateShippingStatus
export const updateShippingStatus = (data: any) => {
    return request({
        url: '/order/updateShippingStatus',
        method: 'post',
        data,
    })
}
