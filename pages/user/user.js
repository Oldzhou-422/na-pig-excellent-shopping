// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    collect:[]
  },
  onShow(){
    //存储中获取用户信息
    const userInfo = wx.getStorageSync('userInfo')
    const collect = wx.getStorageSync('collect')
    this.setData({
      userinfo:userInfo,
      collect
    })
  },
  //绑定点击意见反馈按钮事件
  clickFeedback(){
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    })
  }
  
})