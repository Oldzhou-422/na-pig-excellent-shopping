// pages/goods_list/goods_list.js
import { request } from "../../request/index"
import qqq from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        title:"综合",
        isActive:true
      },
      {
        id:1,
        title:"销量",
        isActive:false
      },
      {
        id:2,
        title:"分类",
        isActive:false
      },
    ],
    currentIndex:0,
    goodsList:[]

  },
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  goodsListitem:[],
  TotalPages:0,
  //网络请求监听
  async getGoodsInfo(){
    let res = await request({
      url:"/goods/search",
      data:this.QueryParams
    })
    const {goods} = res.data.message
    const {total} = res.data.message
    this.TotalPages = Math.ceil(total/this.QueryParams.pagesize)
    this.setData({
      goodsList:[...this.data.goodsList,...goods]
    })
    wx.stopPullDownRefresh()
  },
  //点击事件监听
  clickTabs(e){
    const {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((item,i)=>{
      return i===index? item.isActive=true :item.isActive=false
    })
    this.setData({
      tabs
    })
  },
  //backtop模块
  //page    scrollTop位置:number   duration:滚动时长
  clickBacktop(){
    wx.pageScrollTo({scrollTop:0,duration:500})
  },
  //我的足迹-模块数据传输
  clickGoodsitem(e){
    //获取事件源的index
    const {index} = e.currentTarget.dataset
    //创建或者读一个myFoots缓存容器
    const myFoots = wx.getStorageSync('myFoots')||[]
    //遍历有无与之前goodsList匹配的id项
    let findIndex = this.goodsListitem.findIndex(item=>item.goods_id===this.data.goodsList[index].goods_id)
    

    if(findIndex===-1){
      //无相同id匹配项
      this.goodsListitem.push(this.data.goodsList[index])
      
    }
    //更新缓存中的myFoots
    wx.setStorageSync('myFoots', [...myFoots,this.data.goodsList[index]])
    //更新存储中的goodsListitem
    wx.setStorageSync('goodsListitem', this.goodsListitem)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //谨记：option则为之前跳转过来携带的参数的集合
    this.QueryParams.cid = options.cid
    this.getGoodsInfo()
  },



  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.TotalPages<=this.QueryParams.pagenum){
      wx.showToast({title: '已经到达底部'})
    }
    else{
      this.QueryParams.pagenum++
      this.getGoodsInfo()
    }
  },
  onPullDownRefresh(){
    //重置当前页面数
    this.QueryParams.pagenum = 1
    //重置商品列表长度
    this.setData({
      goodsList:[]
    })
    //重新发送网络请求
    this.getGoodsInfo()
  }
})
