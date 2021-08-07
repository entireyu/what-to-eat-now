// pages/setFood/setFood.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 主菜单值
    mainMenuIndex: 0,
    // 主菜单
    mainMenu: null,
    // 菜单列表
    menuList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
  },

  onShow: function () {
    this.initData()
  },

  /**
   * 初始化
   */
  initData() {
    this.loadMenuList();
    this.loadMainMenu();
  },

  /**
   * 加载菜单列表
   */
  loadMenuList() {
    const menuList = wx.getStorageSync('menuList') || [];
    this.setData({
      menuList: menuList
    })
  },

  /**
   * 保存菜单列表
   */
  saveMenuList() {
    wx.setStorageSync('menuList', this.data.menuList)
  },

  /**
   * 获取主菜单
   */
  loadMainMenu() {
    var main = wx.getStorageSync('mainMenu') || 0;
    this.setData({ mainMenuIndex: main, mainMenu: this.data.menuList[main] });
  },

  /**
   * 设置主菜单
   */
  saveMainMenu(e) {
    var index = e.currentTarget.dataset.id;
    wx.setStorageSync('mainMenu', index);
    this.loadMainMenu();
  },

  /**
   * 删除菜单
   */
  delMenu(e) {
    // 向用户确认
    wx.showModal({
      title: "确定要删除菜单吗？",
      content: "该操作将无法恢复",
      success: (res) => {
        if (res.confirm) {
          // 要删除菜单的id
          var index = e.currentTarget.dataset.id;
          // 当前主菜单的id
          var main = this.data.mainMenuIndex;
          // 无法删除主菜单
          if (index == main) {
            wx.showModal({
              showCancel: false,
              title: "温馨提示",
              content: "无法删除主菜单"
            })
          } else if (index < main) {
            // 如果删除菜单的值小于主菜单的值，主菜单的值减一
            this.data.menuList.splice(index, 1);
            this.saveMenuList();
            main--;
            this.saveMainMenu(main);
            this.loadMenuList();
          } else {
            // 删除
            this.data.menuList.splice(index, 1);
            this.saveMenuList();
            this.loadMenuList();
          }
        }
      }
    })

  },
  /**
   * 编辑操作 - 跳转编辑菜单页面
   */
  editMenu(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../editMenu/editMenu?id=' + id,
    })
  },
  /**
   * 创建新菜单
   */
  createMenu() {
    wx.navigateTo({
      url: '../editMenu/editMenu',
    })
  }
})