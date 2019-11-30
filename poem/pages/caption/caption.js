
Page({

  choose() {
    wx.chooseImage({
      success: (res) => {
        let file = res.tempFilePaths[0]
        this.setData({
          file: file
        })
        let base64 = wx.getFileSystemManager().readFileSync(file, 'base64')
        // console.log(base64)
        let image = 'data:image/png;base64,' + base64
        this.scan(base64)
        wx.showLoading({
          title: '正在识别'
        })
      }
    })
  },
  scan(image) {
    let params = {
      image: image,
      time_stamp: (Date.now() / 1000).toFixed(),
      nonce_str: Math.random(),
      session_id: Math.random()
    }
    this.upload(this.signedParam(params), this.data.type)
  },
  signedParam(param) {
    const md5 = require('../md5')
    param.app_id = 2124967364
    let app_key = 'jfoKygmFpN3ccsqS'
    // 签名
    let querystring =
      Object.keys(param)
        .filter(function (key) {
          return (
            param[key] !== undefined
          )
        })
        .sort()
        .map(function (key) {
          return key + '=' + encodeURIComponent(param[key])
        })
        .join('&') +
      '&app_key=' +
      app_key
    // console.log(querystring)
    let sign = md5(querystring).toUpperCase()
    param.sign = sign
    return param
  },
  upload(params, type) {
    console.log(params)
    wx.request({
      url: `https://api.ai.qq.com/fcgi-bin/vision/vision_imgtotext`, // 仅为示例，并非真实的接口地址
      data: params,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (res) => {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.ret != 0) {
          wx.showModal({
            title: '识别失败',
            content: res.data.msg,
            showCancel: false
          })
        } else {
          let content = ''
          content += res.data.data.text,
            this.setData({
              info: res.data.data.ret,
              content: content
            })
        }
      }
    })
  },
  copy(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.str,
      success: function (res) {
        wx.showToast({
          title: '复制成功'
        })
      }
    })
  },
  onShareAppMessage() {
    // 微信分享
    return {
      title: '看图说话',
      desc: '看图说话'
    }
  }
})