// 管理网络请求
import useHomeStore from '@/store/modules/home'
import axios from 'axios'
import { nextTick } from 'vue'
import { useRouter } from 'vue-router'

// 创建 axios 副本对象
let request = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000
})

let router: string[] | null = null

export const setRouter = (routerInstance: any) => {
    router = routerInstance
}



// 设置请求拦截器
request.interceptors.request.use(
    config => {
        // const token = useHomeStore().Token
        const storedToken = localStorage.getItem('token')
        config.headers.token = storedToken
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

// 设置响应拦截器
request.interceptors.response.use(
    response => {
        if (response.data.code === -2) {
            localStorage.removeItem('token')
            console.log('Token has expired, redirecting to login...')
            if (router) {
                router.push('/login')
            } else {
                console.error('Router instance is not available.')
            }
        }
        return response
    },
    err => {
        return Promise.reject(err)
    }
)

// 创建 fileRequest 副本对象
let fileRequest = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 300000
})

// 设置请求拦截器
fileRequest.interceptors.request.use(
    config => {
        // const token = useHomeStore().Token
        const storedToken = localStorage.getItem('token')
        config.headers.token = storedToken
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

// 设置响应拦截器
fileRequest.interceptors.response.use(
    response => {
        // 假设响应数据在 response.data 中
        if (response.data.code === -2) {
            // 清除 token
            localStorage.removeItem('token')
            // 跳转到登录页面

        }
        return response
    },
    err => {
        return Promise.reject(err)
    }
)

// 暴露对象
export { request, fileRequest }
