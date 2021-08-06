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
    if (options.id) {
      this.setData({ mode: id })
      this.loadMenu();
    } else {
      this.loadMenuList();
    }

  },

  /**
   * 处理用户输入
   */
  dueInput(e) {
    var list = e.detail.value.split(" ")
    // 取出空元素
    for (let i = 0; i < list.length; i++) {
      if (list[i] == "" || list[i] == " ") {
        list.splice(i, 1);
        i--;
      }
    }
    this.setData({ menu: list });
  },

  /**
   * 保存菜单
   */
  saveMenu() {
    wx.setStorageSync('menuList', this.data.menuList)
  },

  /**
   * 创建新菜单
   */
  createNewMenu() {
    let newMenu = {
      name: this.data.name,
      list: this.data.menu
    }
    this.data.menuList.push(newMenu);
    this.saveMenu()
  },

  /**
   * 修改目标菜单
   */
  editTargetMenu(id) {
    let newMenu = {
      name: this.data.name,
      list: this.data.menu
    }
    this.data.menuList[id] = newMenu;
    this.saveMenu();
  },

  /**
   * 用户点击保存菜单
   */
  userClickSave() {
    if (this.data.name == null) {
      wx.showToast({
        title: '请填写菜单名',
        icon: "none"
      })
    } else if (this.data.mode == null) {
      this.createNewMenu();
      wx.navigateBack()
    } else if (this.data.mode != null) {
      this.editTargetMenu(this.data.mode);
      wx.navigateBack()
    } else {
      wx.showToast({
        title: '未知错误，请返回重试',
        icon: "none"
      })
    }
  },

  /**
   * 用户点击返回(即不保存返回)
   */
  userClickBack() {
    wx.showModal({
      title: "温馨提示",
      content: "确认不保存返回？",
      success: (res) => {
        if (res.confirm) {
          wx.navigateBack();
        }
      }
    })
  },

  /** 
   * 读取菜单数据
   */
  loadMenu() {
    let menuList = wx.getStorageSync('menuList')
    let menu = menuList[this.data.mode]
    this.setData({
      menuList: menuList,
      menu: menu.list,
      name: menu.name
    })
    var text = "";
    for (var i = 0; i < menu.list.length; i++) {
      if (i + 1 != menu.list.length)
        text += menu.list[i] + " "
      else
        text += menu.list[i]
    }
    this.setData({ userInput: text })
  },

  /**
   * 绑定菜单名称
   */
  dueName(e) {
    this.setData({ name: e.detail.value })
  },
  
  /**
   * 获取菜单列表
   */
  loadMenuList() {
    this.setData({ menuList: wx.getStorageSync('menuList') })
  }
})