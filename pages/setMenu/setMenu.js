// pages/setFood/setFood.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    text: "",
    foodArray: [],
    menuName: "",
    mainMenu: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadFoodList();
    this.loadFoodListArray();
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
    this.saveFoodListArray();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.saveFoodList();
    // this.saveFoodListArray();
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
  },
  /**
   * 删除菜单数据
   */
  delFoodList(){
    var that = this;
    wx.showModal({
      title: "提示",
      content: "确定清空菜单？",
      success(res) {
        if (res.confirm) {
          wx.setStorageSync('food', [])
          that.loadFoodList();
        } else if (res.cancel) {
        }
      }
    })
  },
  /**
   * 加载菜单列表
   */
  loadFoodListArray(){
    const foodArray = wx.getStorageSync('foodArray') || [];
    console.log(foodArray)
    this.setData({
      foodArray: foodArray
    })
  },
  /**
   * 保存菜单列表
   */
  saveFoodListArray(){
    wx.setStorageSync('foodArray', this.data.foodArray)
  },
  /**
   * 添加到菜单列表
   */
  addToArray(){
    let obj = {
      name: "",
      list: this.data.list
    }
    wx.showModal({
      title: "创建新菜单",
      content: "",
      editable: true,
      placeholderText: "请输入菜单名",
      confirmText: "创建",
      success: (res)=>{
        if(res.confirm){
          obj.name = res.content
          this.data.foodArray.push(obj);
          this.saveFoodListArray()
          this.loadFoodListArray()
        }else if(res.cancel){

        }
      }
    })
  },
  /**
   * 获取主菜单
   */
  getMainMenu(){
    var main = wx.getStorageSync('mainMenu');
    this.setData({mainMenu: main});
  },
  /**
   * 设置主菜单
   */
  setMainMenu(e){
    var index = e.currentTarget.dataset.id;
    wx.setStorageSync('mainMenu', index);
    this.getMainMenu();
  },
  /**
   * 删除菜单
   */
  delMenu(e){
    var index = e.currentTarget.dataset.id;
    var main = this.data.mainMenu;
    if(index==main){
      wx.showModal({
        showCancel: false,
        title: "温馨提示",
        content: "无法删除主菜单"
      })
    }else if(index<main){
      var menuList = this.data.foodArray;
      menuList.splice(index,1);
      this.setData({foodArray: menuList});
      this.saveFoodListArray();
      main--;
      this.setMainMenu(main);
    }
  }
})