import { request } from "../../request/index"
import qqq from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    encryptedData:"",
    rawData:"",
    iv:"",
    signature:"",
    code:""
  },
  getUserProfile(){
    wx.getUserProfile({
      desc:"获取用户信息",
      success:(res)=>{

        const {encryptedData,rawData,iv,signature} = res
        this.setData({
          encryptedData,rawData,iv,signature
        })
        wx.login({
          timeout:10000,
          success:(res)=>{

            this.setData({
              code:res.code
            })
          }
        })
        request({url:"/users/wxlogin",data:this.data,method:"post"})
        .then(res=>{
          console.log(res)
          let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
          wx.setStorageSync('token',token)
          wx.getStorageSync("token")
          if(token){
            wx.navigateBack({
              delta:1
            })
          }
          
        })
      }
    })
  }
 
})