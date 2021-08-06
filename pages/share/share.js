// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: "猪肚鸡煲"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.key) {
      this.setData({ keyword: decodeURIComponent(options.key) })
    }

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "这顿我们一起去吃这个吧！"
    }
  }
})