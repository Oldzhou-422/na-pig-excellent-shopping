export const getSetting = ()=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success: (res) => {
        resolve(res)

      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}

export const chooseAddress = ()=>{
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      success: (res) => {
        resolve(res)
      },
      fail: (err)=>{
        reject(err)
      }
    })
  })
}
export const openSetting = ()=>{
  return new Promise((resolve,reject)=>{
    wx.openSetting({
      success: (res) => {
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}
export const ShowModal = ({content})=>{
  return new Promise((resolve,reject)=>{
    wx.showModal({
      title:"提示",
      content,
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      },
      cancelColor: 'cancelColor',
    })
  })
}

export const showToast = ({title})=>{
  return new Promise((resolve,reject)=>{
    wx.showToast({
      title,
      icon:"error",
      duration:2000,
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}