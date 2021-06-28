// pages/category/category.js
import { request } from "../../request/index"
import { runtime } from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightMenuList: [],
    currentIndex: 0,
    scrolltop: 0
  },
  Cates: [],
  changeCurrentIndex(e) {
    const { index } = e.currentTarget.dataset
    let rightMenuList = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightMenuList,
      scrolltop: 0
    })
  },
  async getdata() {
    const res = await request({ url: "/categories" })
    this.Cates = res.data.message
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates })
    let leftMenuList = this.Cates.map(item => item.cat_name)
    let rightMenuList = this.Cates[0].children
    this.setData({
      leftMenuList,
      rightMenuList
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates')
    if (Cates) {
      //存在数据的情况下,则不需要重新发送加载请求,则利用老数据,判断时间是否过期
      if (Date.now() - Cates.time > 1000 * 10) {
        this.getdata()
      }
      else {
        //未过期的情况下
        let leftMenuList = Cates.data.map(item => item.cat_name)
        let rightMenuList = Cates.data[0].children
        this.setData({
          leftMenuList,
          rightMenuList
        })
      }
    }
    else {
      //不存在旧数据的情况下
      this.getdata()
    }
  },

})