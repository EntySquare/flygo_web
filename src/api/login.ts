import {request, fileRequest} from '@/utils/request'

export const Login = (data: any) => {
    return request({
        url: '/login',
        method: 'post',
        data,

    })
}

//是修改是否kyc的接口
// Flag           string       `json:"flag"` 传的字段
export const checkUserInfo = (data: any) => {
    return request({
        url: '/checkUserInfo',
        method: 'post',
        data

    })
}


// type UserInfo struct {
//     Hash           string       `json:"hash"`
//     Name           string       `json:"name"`
//     IDCard         string       `json:"id_card"`
//     Phone          string       `json:"phone"`
//     MailAddress    string       `json:"mail_address"`
//     Amount         float64      `json:"amount"`
//     BuyOrSell      int          `json:"buy_or_sell"`
//     FundingSource  int          `json:"funding_source"`
//     WalletAddress  string       `json:"wallet_address"`
//     Political      int          `json:"political"`
//     Flag           string       `json:"flag"`
//     UploadInfoList []UploadInfo `json:"upload_info_list"`
//    }

// 返回字段
//    type UploadInfo struct {
//     FileName string `json:"file_name"`
//     Url      string `json:"url"`
//    }

// 查询用户信息接口 要筛选就传对应字段    id 用户名 手机号 身份证 只能筛选这四个
export const viewUserInfo = (data: any) => {
    return request({
        url: '/viewUserInfo',
        method: 'post',
        data
    })
}

export const uploadFile = (data: any, headers: any) => {
    return fileRequest({
        url: '/upload',
        method: 'post',
        data,
        headers,
    })
}




