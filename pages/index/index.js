// pages/index/index.js
import { request } from "../../request/index"
import { runtime } from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    navigatorList: [],
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperData()
    this.getNavigatorData()
    this.getFloorData()

  },
  async getSwiperData() {
    //首页轮播图数据网络请求
    const res = await request({ url: '/home/swiperdata' })
    this.setData({
      swiperList: res.data.message
    })

  },
  async getNavigatorData() {
    //首页分类导航网络请求
    const res = await request({ url: "/home/catitems" })
    this.setData({
      navigatorList: res.data.message
    })

  },
  async getFloorData() {
    //首页楼层模块数据获取
    const res = await request({ url: "/home/floordata" })
    this.setData({
      floorList: res.data.message
    })

  }

})