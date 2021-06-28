Page({
  data: {
    userInfo: {}
  },
  getUserInfo() {
    wx.getUserProfile({
      desc: "用于小程序获取用户信息",
      success: (res) => {
        const {userInfo} = res
        wx.setStorageSync('userInfo',userInfo)
        
        wx.navigateBack({
          delta:1
        })
        
      },
      fail: (err) => {
        wx.showToast({
          title: '获取信息出错'
        })
        console.log(err)
      }
    }) 
  }

})