// pages/wxml/inxex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: (new Date()).toString()

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var params = {
      province: '陕西',
      city: '西安',
      county: '长安'

    }
    wx.request({
      url: 'https://wis.qq.com/weather/common?source=xw&weather_type=forecast_1h|forecast_24h|index|alarm|limit|tips',
      //https://wis.qq.com/weather/common?source=xw&weather_type=forecast_1h|forecast_24h|index|alarm|limit|tips&province=陕西&city=西安&county=长安 //可直接用于浏览器输入测试
      data: params, //地点参数
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      success: function (res) {
        //console.log(res.data) //调试输出特别用用
        //console.log(res.data.data.forecast_1h[0].weather)
        //第一个data为固定用法，第二个data是json中的data
        var degree = res.message
        that.setData({
          //all: res.data.data.forecast_1h[0].weather
          date: res.data.data.forecast_24h[0].time,
          fengxiang: res.data.data.forecast_24h[0].day_wind_direction,
          weather: res.data.data.forecast_24h[0].day_weather
          //res代表success函数的事件对，data是固定的，fengxiang是是上面json数据中fengxiang
        })
      }
    })

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})