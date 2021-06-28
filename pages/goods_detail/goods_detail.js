// pages/goods_detail/goods_detail.js
import { request } from "../../request/index"
import qqq from "../../lib/runtime/runtime"
Page({
  data: {
    goodsDetailList:{},
    isCollect:false
  },
  onShow(){
    const {goods_id} = getCurrentPages()[getCurrentPages().length-1].options
    console.log(getCurrentPages()[getCurrentPages().length-1].options)
    this.getGoodsDetailData(goods_id)
  },

 
  //加载时获取数据网络请求
  async getGoodsDetailData(goods_id){
    let res = await request({
      url:"/goods/detail",
      data:{
        goods_id
      }
    })
    console.log(res)
    const {message} = res.data

    //到这个时候data里面的detaillist才有id
    this.setData({
      goodsDetailPics:message.pics,
      goodsDetailList:{
        goods_price:message.goods_price,
        goods_name:message.goods_name,
        goods_introduce:message.goods_introduce,
        goods_id:message.goods_id,
        goods_image:message.goods_big_logo
      }
    })
    //如果获取到了的collect为空，也习惯性地把它设置为数组形式,以便下面做数组遍历
    let collect = wx.getStorageSync('collect')||[]
    let checkCollect = collect.some(item=>item.goods_id === this.data.goodsDetailList.goods_id)
    //checkCollect为一个数字,
    if(checkCollect){
      //存在索引匹配的时候
      this.setData({
        isCollect:true
      })
    }
    else{
      //不存在匹配的时候
      this.setData({
        isCollect:false
      })
      return;
    }
  },
  clickImage(e){
    const {url} = e.currentTarget.dataset
    const urls = this.data.goodsDetailPics.map(item=>item.pics_mid)
    wx.previewImage({
      current:url,
      urls
    })
  },
  addToCart(){
    //缓存数据第一次获取的空的，也就是需要把他定义为[]类型,也就是强行创造一个存储数组
    let cart = wx.getStorageSync('cart')||[]
    //通过查找缓存数组的id与该商品的id进行匹配
    let goodsIndex = cart.findIndex(item=>item.goods_id===this.data.goodsDetailList.goods_id)
    //解释一下这里为什么是-1,
    if(goodsIndex!==-1){
      //存在的情况
      cart[goodsIndex].num++
      wx.showToast({
        title: '该商品数量+1',
        icon:"success",
        //mask的作用与防抖差不多，加上去为true就对了
        mask:true
      })
    }
    else{
      //不存在的情况
      this.data.goodsDetailList.num = 1
      this.data.goodsDetailList.checked = true

      cart.push(this.data.goodsDetailList)
      wx.showToast({
        title: '已加入购物车',
        icon:"success",
        //mask的作用与防抖差不多，加上去为true就对了
        mask:true
      })

    }
    //将最新更改后的cart赋值回去给原来的cart
    wx.setStorageSync('cart', cart)
    
  },
  //点击收藏按钮变化事件
  clickCollect(){
    //获取缓存中的collect数组
    let collect = wx.getStorageSync('collect')||[]
    //获取点击的商品的id
    let {goods_id} = this.data.goodsDetailList
    //进行id间的匹配得到索引
    let Index = collect.findIndex(item=>{
      return item.goods_id===goods_id
    })
    //index匹配时，既存在
    if(Index!==-1){
      //该商品存在于收藏列表时
      //点击需要取反,设置为非收藏
      this.setData({
        isCollect:false
      })
      //并在缓存的collect数组中删除该项的goods_info
      collect.splice(Index,1)
      wx.setStorageSync('collect', collect)
    }
    else{
      //原本不存在收藏时
      //设置在收藏并在collect加入该商品的缓存
        this.setData({
          isCollect:true
        })
        collect.push(this.data.goodsDetailList)
        wx.setStorageSync('collect', collect)
    }
  }
})