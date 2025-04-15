import { fileRequest } from '@/utils/request'
// 【管理】上传图片
// /manage/image/uploadImages
export const uploadImages = (data: any) => {
    return fileRequest({
        url: '/image/uploadImages',
        method: 'post',
        data,
    })
}

// 【管理】设定图片urls
// /manage/image/setImageUrls
export const setImageUrls = (data: any) => {
    return fileRequest({
        url: '/image/setImageUrls',
        method: 'post',
        data,
    })
}

// 上传图片 返回url API file_type
export const upload = (data: any) => {
    return fileRequest({
        url: '/upload',
        method: 'post',
        data,
    })
}