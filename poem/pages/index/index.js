// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths : "/images/timg.jpg",
    poemContent:""

  },
  chooseimage: function () {
  //   var _this = this;
  //   wx.chooseImage({
  //     count: 1, // 默认9
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: function (res) {
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //       _this.setData({
  //         tempFilePaths: res.tempFilePaths,
  //         poemContent:"看这风景美如画，本想吟诗赠天下 \n 奈何自己没文化，只能卧槽图收了"
  //       })
  //     }
  //   })
  // },
  // choose() {
    wx.chooseImage({
      success: (res) => {
        let file = res.tempFilePaths[0]
        this.setData({
          tempFilePaths: file
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
      url: `https://lechatelia.mynatapp.cc/image2poetry`, // 服务器多标签检测端口
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
            title: 'sorry' + res.data.msg,
            content: res.data.msg,
            showCancel: false
          })
        } else {
          let content = '\n'
          res.data.result.forEach((item) => {
            content += item
              content += '\n'
          })
          //content += res.data.data.text,
          this.setData({
            info: res.data.ret,
            poemContent: content
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


})