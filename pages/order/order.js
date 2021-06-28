import { request } from "../../request/index"
import qqq from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: "01",
        title: "全部",
        isActive: true
      },
      {
        id: "02",
        title: "待付款",
        isActive: false
      },
      {
        id: "03",
        title: "待收货",
        isActive: false
      },
      {
        id: "04",
        title: "退货/退款",
        isActive: false
      }
    ]
  },
  onShow() {
    const pageStack = getCurrentPages();

    const { type } = pageStack[pageStack.length - 1].options
    this.getPagesData(type)

  },
  async getPagesData(type) {
    let token = wx.getStorageSync('token')
    if(!token){
      //一开始token不存在
      wx.navigateTo({
        url: '/pages/auth/auth'
      })
      token = wx.getStorageSync('token')
      console.log(token)
      const res = await request({
        url: "/my/orders/all?header【'content-type'】='application/x-www-form-urlencoded'",
        data: {
          type
        }
      })
    }
    else{
      //缓冲存储中有token
      const res = await request({
        url: "/my/orders/all?header【'content-type'】='application/x-www-form-urlencoded'",
        data: {
          type,
          
        }
      })
      console.log(res)
    }
    
    
    

  },
  clickTabs(e) {
    const { index } = e.detail
    //函数中取出tabs，并设置为let可变量。
    let { tabs } = this.data
    tabs.forEach((item, i) => {
      if (i === index) {
        return item.isActive = true
      }
      else {
        return item.isActive = false
      }
    })
    //改变完后一定要重新赋值回去
    this.setData({
      tabs
    })
  }
})