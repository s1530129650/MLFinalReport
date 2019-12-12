
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
        let image = base64
        //console.log(image)
        this.scan(base64)
        wx.showLoading({
          title: '正在上传'
        })
      }
    })
  },
  scan(image) {
    let params = {
      image: image,
    }
    this.upload(params, this.data.type)
  },

  upload(params, type) {
    console.log(params)
    console.log('准备上传')
    wx.request({
      url: `https://lechatelia.mynatapp.cc/upload`, // 仅为示例，并非真实的接口地址
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
            title: 'sorry， error',
            content: res.data.msg,
            showCancel: false
          })
        } else {
          let content = '\n'
          res.data.result.forEach((item) => {
            content += item.name,
              content += '\t\t  ',
              content += item.confidence,
              content += '%\n'
          })
          //content += res.data.data.text,
          this.setData({
            info: res.data.ret,
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
          title: '上传成功'
        })
      }
    })
  },
  onShareAppMessage() {
    // 微信分享
    return {
      title: '上传图片例程',
      desc: '上传图片例程'
    }
  }
})