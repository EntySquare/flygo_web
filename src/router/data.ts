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
        path: '/select',
        name: 'selectProductTag',
        lable: '商品标签',
        component: () => import('@/views/Commodity/product_label.vue'),
    },
    {
        name: 'specifications',
        lable: '规格',
        path: '/specifications',
        component: () => import('@/views/Specifications/index.vue')
    },
    {
        name: 'tags',
        lable: '标签',
        path: '/tags', component: () => import('@/views/tags/tags.vue')
    },
    {
        name: 'tagType',
        lable: '标签类型',
        path: '/tagType', component: () => import('@/views/tags/tag_type.vue')
    },
    {
        name: 'user',
        lable: '用户列表',
        path: '/user', component: () => import('@/views/user/index.vue')
    },

]
export default deta