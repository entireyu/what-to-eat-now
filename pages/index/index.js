// index.js
const util = require('../../utils/util.js')

Page({
  data: {
    // 抽奖结果
    result: "请点击下方按钮进行抽取",
    // 当前抽奖列表
    list: [],
    // 菜单名称
    name: null,
    // 抽奖状态
    status: "待抽奖",
    // 历史记录
    logs: [],
    // 不放回抽样
    notRepeat: false,
    // 提示
    tip: null
  },
  // 事件处理函数
  setFood() {
    wx.navigateTo({
      url: '../setMenu/setMenu',
    })
  },
  onLoad() {
    this.getLog();
    this.loadFoodList();
    // 首次提示
    this.showTipByTime();
    // 十秒检测一次时间并生成提示
    setInterval(() => {
      this.showTipByTime();
    }, 10000)
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    this.loadFoodList();
  },

  /**
   * 根据时间展示提示
   */
  showTipByTime: function () {
    // 获取当前小时
    let nowHour = (new Date()).getHours();

    // 提示
    let tip = null;

    // 时间判断
    if (nowHour >= 7 && nowHour < 10) {
      tip = "早上好，\n用早餐开启元气满满的一天吧！"
    } else if (nowHour >= 10 && nowHour < 14) {
      tip = "又快到午餐时间啦，\n吃什么好呢？"
    } else if (nowHour >= 14 && nowHour < 17) {
      tip = "累了吗？\n来个下午茶补充精力吧"
    } else if (nowHour >= 17 && nowHour < 21) {
      tip = "晚饭时间到！\n好多好吃的呀"
    } else if (nowHour >= 21) {
      tip = "夜幕降临，\n 是不是饿了~嘿嘿"
    }

    // 传参
    if (this.data.tip != tip)
      this.setData({ tip: tip });
  },
  /**
   * 抽取美食
   */
  randonFood() {
    // 设置状态为抽取中
    this.setData({ status: "抽取中" })
    // 获取列表
    var foodList = this.data.list;
    // 随机值
    var number = parseInt((Math.random() * (foodList.length - 1)).toFixed(0));
    // 结果
    var result = foodList[number];

    // 抽取效果
    var i = 0;
    // 效果持续时间
    var time = 2000;
    // 计时器：循环展示菜单
    var timeInt = setInterval(() => {
      this.setData({ result: foodList[i] });
      i++;
      if (i == foodList.length) {
        i = 0;
      }
    }, 100)

    // 指定时间后停止抽奖
    setTimeout(() => {
      clearInterval(timeInt);
      // 检测是否为不放回抽样
      if (this.data.notRepeat) {
        // 不放回抽样
        let menuList = this.data.list;
        menuList.splice(number, 1)
        this.setData({ list: menuList });
      }
      this.showResult(result);
    }, time)

  },
  /**
   * 设置不放回抽样
   */
  setNotRepeat(e) {
    var value = e.detail.value;
    this.setData({ notRepeat: value })
  },
  /**
   * 显示结果
   */
  showResult(result) {
    this.setData({ status: "抽取完成！", result: result })
    this.saveLog(result)
    wx.showModal({
      title: "这顿吃这个好不？",
      content: result,
      showCancel: false
    })
  },

  /**
   * 检查是否设置菜单
   */
  checkList() {
    if (this.data.status == "抽取中") {
      wx.showToast({
        title: '正在抽取中，请勿继续点击',
        icon: "none"
      })
    }
    else if (this.data.list.length > 0) {
      this.randonFood();
    } else if (this.data.list.length == 0 && this.data.notRepeat) {
      wx.showToast({
        title: '菜单已抽完，点击控制面板中“恢复所有菜单项”即可重新抽取',
        icon: "none"
      })
    }
    else {
      wx.showToast({
        title: '请先点击底部“设置好吃的”设置菜单,再进行抽取',
        icon: "none"
      })
    }
  },

  /**
   * 保存抽奖记录
   */
  saveLog(food) {
    const logs = wx.getStorageSync('logs') || []
    if (logs.length > 5) {
      // 大于5的时候删除末尾元素
      logs.pop();
    }
    logs.unshift({ name: food, time: Date.now() })
    wx.setStorageSync('logs', logs)
    this.getLog();
  },

  /**
   * 获取抽奖记录
   */
  getLog() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          time: util.formatTime(new Date(log.time)),
          name: log.name
        }
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 加载美食列表
   */
  loadFoodList() {
    let menuList = wx.getStorageSync('menuList');
    let mainIndex = wx.getStorageSync('mainMenu') || 0;
    let menu = menuList[mainIndex]
    this.setData({ list: menu.list, name: menu.name })
  },

  /**
   * 清除所有历史记录
   */
  clearLogs() {
    var that = this;
    wx.showModal({
      title: "提示",
      content: "确定清空历史记录？",
      success(res) {
        if (res.confirm) {
          wx.setStorageSync('logs', [])
          that.getLog();
        }
      }
    })
  },

  /**
   * 跳转至分享
   */
  toShare(e) {
    let key = e.currentTarget.dataset.result;
    if (this.data.status == "抽取完成！")
      wx.navigateTo({
        url: '../share/share?key=' + key,
      })
    else
      wx.showToast({
        title: '请抽取后分享',
        icon: "none"
      })
  }
})
