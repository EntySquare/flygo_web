// 管理分类导航的数据
import { defineStore } from 'pinia'
let useHomeStore = defineStore('home', {
  state: () => ({
    test: '我是测试数据',
    Token: ''
  }),
  actions: {
    setToken(token: string) {
      this.Token = token
    }
  },
  getters: {}
})
export default useHomeStore

