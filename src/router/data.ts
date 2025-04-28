const deta = [
    {
        name: 'categories',
        lable: '类别',
        path: '/categories', component: () => import('@/views/Categories/index.vue')
    },
    {
        path: '/commodity',
        name: 'commodity',
        lable: '商品',
        component: () => import('@/views/Commodity/commodity.vue'),
    },

    {
        name: 'specifications',
        lable: '规格',
        path: '/specifications',
        component: () => import('@/views/Specifications/index.vue')
    },

    {
        path: '/commodityTreasureHunt',
        name: 'commodityTreasureHunt',
        lable: '夺宝商品',
        component: () => import('@/views/Commodity/commodityTreasureHunt.vue'),
    },
    {
        name: 'treasureHuntSpec',
        lable: '夺宝规格',
        path: '/treasureHuntSpec',
        component: () => import('@/views/Specifications/treasureHuntSpec.vue')
    },
    {
        name: 'tagType',
        lable: '标签类型',
        path: '/tagType', component: () => import('@/views/tags/tag_type.vue')
    },
    // {
    //     name: 'tags',
    //     lable: '标签',
    //     path: '/tags', component: () => import('@/views/tags/tags.vue')
    // },
    {
        name: 'user',
        lable: '用户列表',
        path: '/user', component: () => import('@/views/user/index.vue')
    },{
        name: 'assetList',
        lable: '用户资产',
        path: '/user-assetList', component: () => import('@/views/user/assetList.vue')
    },{
        name: 'withdrawApplyList',
        lable: '提现申请列表',
        path: '/withdrawApplyList', component: () => import('@/views/user/withdrawList.vue')
    },
    {
        name: 'treasureHunt',
        lable: '夺宝列表',
        path: '/treasureHunt', component: () => import('@/views/treasureHunt/list.vue')
    },
    {
        name: 'treasureHuntOrders',
        lable: '夺宝参与记录',
        path: '/treasureHunt-orders', component: () => import('@/views/treasureHunt/orders.vue')
    },
    {
        name: 'winningList',
        lable: '夺宝中奖列表',
        path: '/treasureHunt-winningList', component: () => import('@/views/treasureHunt/winningList.vue')
    },
    {
        name: 'purchase',
        lable: '购买订单',
        path: '/purchase', component: () => import('@/views/Purchase/Purchase.vue')
    },
    {
        name: 'AgentList',
        lable: '代理商管理',
        path: '/user-agentList', component: () => import('@/views/user/agentList.vue')
    },
    {
        name: 'Imgmanage',
        lable: '首页管理',
        path: '/Imgmanage', component: () => import('@/views/Imgmanage/index.vue')
    },
]
export default deta