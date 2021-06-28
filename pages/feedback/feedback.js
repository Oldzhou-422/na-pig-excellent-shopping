// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 1,
        title: "体验问题",
        isActive: true
      },
      {
        id: 2,
        title: "商品,商家投诉",
        isActive: false
      }
    ],
    ImagesList: [],
    textValue: "",
    ImageURL: []
  },
  //绑定tabs点击事件
  clickTabs(e) {
    let { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((item, i) => {
      return index === i ? item.isActive = true : item.isActive = false
    })
    this.setData({
      tabs
    })

  },
  /* 绑定添加图片按钮 */
  clickAddImage(e) {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          ImagesList: res.tempFilePaths
        })
      },
    })
  },
  //点击移除图片按钮
  RemoveImage(e) {
    const { index } = e.currentTarget.dataset
    let { ImagesList } = this.data
    ImagesList.splice(index, 1)
    this.setData({
      ImagesList
    })
  },
  //监听反馈文本框的输入事件,并将这个值赋值给data的textvalue
  ListenInput(e) {
    this.setData({
      textValue: e.detail.value
    })
  },
  //点击提交按钮事件
  clickSubmit() {
    wx.showLoading({
      title: '上传中'
    })
    const { ImagesList } = this.data
    const { textValue } = this.data
    if (ImagesList.length !== 0) {
      ImagesList.forEach((item, i) => {
        wx.uploadFile({
          filePath: item,
          name: 'image',
          url: 'https://img.coolcr.cn/api/upload',
          success: (res) => {
            let ImageUrl = JSON.parse(res.data).data.url
            this.setData({
              ImageURL: [...this.data.ImageURL, ImageUrl]
            })
            //判断文本内容的合法性
            if (!textValue.trim()) {
              //不合法则弹出土司框且推出本次点击事件
              wx.showToast({
                title: '内容不合法',
                icon: "error"
              })
              return;
            }
            
            //合法的情况下
            //并且已经上传完最后一张
            if (i === ImagesList.length - 1) {
              wx.hideLoading({})
              wx.showToast({
                title: '反馈上传成功',
                icon: "success"
              })
              wx.navigateBack({
                delta: 1
              })
            }

          }
        })
      })
    }
    else {
      wx.hideLoading({})
      wx.showToast({
        title: '反馈上传成功',
        icon: "success"
      })
      wx.navigateBack({
        delta: 1
      })
    }


  }

})