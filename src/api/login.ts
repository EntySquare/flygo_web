import { fileRequest } from '@/utils/request'

export const login = (data: any) => {
    return fileRequest({
        url: '/login',
        method: 'post',
        data,
    })
}

