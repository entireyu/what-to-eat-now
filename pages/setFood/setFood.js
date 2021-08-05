// pages/setFood/setFood.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    text: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadFoodList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.saveFoodList();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.saveFoodList();
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

  },
  /**
   * 处理用户输入
   */
  dueInput(e){
    var detail = e.detail;
    var list = detail.value.split(" ")
    // 取出空元素
    for(let i = 0;i<list.length;i++){
      if(list[i]=="" || list[i]==" "){
        list.splice(i, 1);
        i--;
      }
    }
    this.setData({list: list});
  },
  /**
   * 保存菜单数据
   */
  saveFoodList(){
    const list = this.data.list;
    wx.setStorageSync('food', list)
  },
  /**
   * 读取菜单数据
   */
  loadFoodList(){
    const food = wx.getStorageSync('food') || [];
    this.setData({list: food})
    var text = "";
    for(var i = 0;i<food.length;i++){
      if(i+1!=food.length)
        text += food[i] + " "
      else
        text += food[i]
    }
    this.setData({text: text})
  }
})