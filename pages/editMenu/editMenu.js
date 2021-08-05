// pages/editMenu/editMenu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 菜单名称
    name: null,
    // 菜单内容
    menu: [],
    // 用户输入菜单内容
    userInput: "",
    // 菜单列表
    menuList: [],
    // 模式：创建(undefined)/编辑(Number)
    mode: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取需要操作的菜单id
    let id = options.id;
    if(options.id)
      this.setData({mode: id})
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

  },

  /**
   * 处理用户输入
   */
  dueInput(e){
    var list = e.detail.value.split(" ")
    // 取出空元素
    for(let i = 0;i<list.length;i++){
      if(list[i]=="" || list[i]==" "){
        list.splice(i, 1);
        i--;
      }
    }
    this.setData({menu: list});
  },
  /**
   * 保存菜单
   */
  saveMenu(){
    
  },
  /**
   * 创建新菜单
   */
  createNewMenu(){

  },
  /**
   * 修改目标菜单
   */
  editTargetMenu(id){

  },
  /**
   * 用户点击保存菜单
   */
  userClickSave(){

  },
  /**
   * 用户点击返回(即不保存返回)
   */
  userClickBack(){
    wx.showModal({
      title: "温馨提示",
      content: "确认不保存返回？",
      success: (res)=>{
        if(res.confirm){
          wx.navigateBack();
        }
      }
    })
  }
})