// pages/myFoots/myFoots.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsListitem:[]
  },
  
  onShow(){
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let goodsListitem = wx.getStorageSync('myFoots')
    this.setData({
      goodsListitem
    })
  },

  
})