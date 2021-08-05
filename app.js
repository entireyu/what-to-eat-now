// app.js
App({
  onLaunch() {
    // 获取菜单列表
    let menuList = wx.getStorageSync('menuList') || [];
    // 如果不存在数据，初始化一个主菜单，不可删除
    if(menuList.length==0){
      let menu = {
        name: "默认菜单",
        list: []
      }
      menuList.push(menu);
      wx.setStorageSync('menuList', menuList);
      wx.setStorageSync('mainMenu', 0);
    }
    

  },
  globalData: {

  }
})
