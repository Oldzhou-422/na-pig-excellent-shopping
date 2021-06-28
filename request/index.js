export const request = (params)=>{
  //一旦开始网络请求则需要加入加载框
  wx.showLoading({
    title: '加载中'
  })
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url:baseUrl+params.url,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
      complete:()=>{
        wx.hideLoading()
      }
    })
  })
}
