import { request } from "../../request/index"
import qqq from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query:"",
    result:[],
    isEmpty:true
  },
  //给防抖定时器加id
  Timeid:1,
  //输入关键字事件
  SearchInput(e){
    const {value} = e.detail
    if(!value.trim()){
      //该value的trim()方法去除掉头尾的空格，如果开头输入的空格,trim()无法执行,返回false,加上！取反，为true,进入return返回
      //也就是输入的关键词有空格，值不合法
      return;
    }
    else{
      //判断输入框里是否为空,此时则为合法,将isEmpty设置为false
      this.setData({
        isEmpty:false
      })
    }
    this.setData({
      query:value
    })
    //采取防抖措施,先清除定时器，再建立定时器
    clearTimeout(this.Timeid)
    setTimeout(()=>{
      this.getSearchResult()
    },1000)
    
  },
  async getSearchResult(){
    const res = await request({
      url:"/goods/qsearch",
      data:{
        query:this.data.query
      }
    })
    this.setData({
      result:res.data.message
    })
  },
  //取消按钮绑定事件
  clickCancel(){
    this.setData({
      query:"",
      result:[],
      isEmpty:true
    })
  }
 
})