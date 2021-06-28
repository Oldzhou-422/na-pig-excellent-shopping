// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:1,
        title:"商品收藏",
        isActive:true
      },
      {
        id:2,
        title:"浏览足迹",
        isActive:false
      },
    ],
    titles:[
      {
        title:"全部",
        id:1,
        isActive:true
      },
      {
        title:"即将上线",
        id:2,
        isActive:false
      },
      {
        title:"热销产品",
        id:3,
        isActive:false
      }
    ],
    collect:[]
  },
  onShow(){
    const collect = wx.getStorageSync('collect')
    this.setData({
      collect
    })
  },
  //处理点击tabs事件
  clickTabs(e){
    const {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((item,i)=>{
      return i===index?item.isActive = true : item.isActive=false
    })
    this.setData({
      tabs
    })
    

  },
  //点击title效果事件
  clickTitles(e){
    const {index} = e.currentTarget.dataset
    let {titles} = this.data
    titles.forEach((item,i)=>{
      return i===index?item.isActive = true:item.isActive = false
    })
    this.setData({
      titles
    })

  }

  
})