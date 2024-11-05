import { request, fileRequest } from '@/utils/request'
// 查询所有钱包的信息，包括每个钱包的授权额度和余额。
export const QueryAllWallets = () => {
    return fileRequest({
        url: '/wallets',
        method: 'get',
    })
}
// 获取单个钱包的授权详情，包括授权时间线、USDT授权额度数组以及余额数组。
export const authorizationDetails = (address: string) => {
    return fileRequest({
        url: `/wallet/${address}/details`,
        method: 'get',
    })
}