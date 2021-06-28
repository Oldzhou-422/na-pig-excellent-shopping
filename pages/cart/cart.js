// pages/cart/cart.js
import {getSetting,openSetting,chooseAddress,ShowModal,showToast} from "../../utils/util"
import qqq from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart:[],
    allchecked:true,
    totalPrice:0,
    totalNum:0
  },
  //点击结算功能
  async clickPay(){
    const {address} = this.data
    const {cart} = this.data
    if(!address.userName){
     const res = await showToast({title:"请选择您的收货地址"}) 
     return;
    }
    if(cart.length===0){
      console.log("111")
      const res = await showToast({title:"您的购物车为空"})
      return;
    }
    wx.navigateTo({
      url:"/pages/pay/pay"
    })
    
  },
  //商品数量减1
  async goodsDecrement(e){
    let {index} = e.currentTarget.dataset
    let {cart} = this.data
    if(cart[index].num>1){
      cart[index].num--
    }
    else{
      //在num===1的时候触发
      const res = await ShowModal({content:"您确定删除商品？"})
      if(res.confirm){
        cart.splice(index,1)
        this.setCart(cart)
      }
      else if(res.cancel){
        return;
      }

    }
    this.setCart(cart)
    wx.setStorageSync('cart', cart)
  },
  //商品数量加1
  goodsIncrement(e){
    let {index} = e.currentTarget.dataset
    let {cart} = this.data
    cart[index].num++
    this.setCart(cart)
  },
  //监听点击商品复选框事件
  clickCheckbox(e){
    const {cart} = this.data
    const {id}= e.currentTarget.dataset
    let Index = cart.findIndex(item=>{
     return item.goods_id===id
    })
    cart[Index].checked =! cart[Index].checked
    this.setCart(cart)


  },
  //监听点击全选框事件
  clickAllcheckBox(){
    let {allchecked} = this.data
    let {cart} = this.data
    if(allchecked){
      //全选的状态下,改allchecked,和所有商品的checked
      allchecked =! allchecked
      for(let i=0;i<cart.length;i++){
        cart[i].checked = false
      }
      this.setCart(cart)
      //切记，改了拿出来的东西，还要重新设置回data,之后再赋值给本地存储,才有效
      this.setData({
        allchecked,
        cart
      })
    }
    else{
      //非全选的情况下，点击全选
      allchecked =! allchecked
      for(let i=0;i<cart.length;i++){
        cart[i].checked = true
      }
      this.setCart(cart)
      /* this.setData({
        allchecked,
        cart
      }) */
      
    }
    wx.setStorageSync('cart', cart)

  },
  onShow(){
    const address = wx.getStorageSync('address')
    let cart = wx.getStorageSync('cart')||[]
    this.setCart(cart)
    this.setData({
      address
    })
  },
  //用于每次需要修改cart本地存储,修改allchecked,totalPrice,totalNum,但不包括地址，每次使用均需传入cart作为参数
  //重点每次都是优先修改data中的cart数据，最后将data的cart代入本地存储的cart
  setCart(cart){
    let allchecked = true
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(item=>{
      if(item.checked){
        totalNum += item.num
        totalPrice += item.num*item.goods_price
      }
      else{
        allchecked = false
      }
    })
    allchecked = cart.length!= 0?allchecked : false
    this.setData({
      cart,
      allchecked,
      totalPrice,
      totalNum
    })
    //直接把cart代入给缓存
    wx.setStorageSync('cart', cart)
  },
  async clickBtn() {
    const res1 = await getSetting()
    const getAddress = res1.authSetting["scope.address"]
    if (getAddress === true || getAddress === undefined){
      const res2 = await chooseAddress()
      console.log(res2)
      wx.setStorageSync('address', res2)
      
    }
    else{
      await openSetting()
      const res2 = await chooseAddress()
      wx.setStorageSync('address', res2)
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }
})