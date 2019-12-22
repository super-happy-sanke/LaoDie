Page({
  data: {
    msg:'你好',
  },
  clickMe: function () {
    this.setData({ msg: "Hello World" })
  },
  validate: function () {
    wx.navigateTo({
      url: '/pages/beat/beat',
    })
  },
  weizhi: function () {
    wx.navigateTo({
      url: '/pages/location/location',
    })
  },
  xinxi: function () {
    wx.navigateTo({
      url: '/pages/message/message',
    })
  },
 lsgj: function () {
    wx.navigateTo({
      url: '/pages/wait/wait',
    })
  },
  lsxl: function () {
    wx.navigateTo({
      url: '/pages/lsxl/lsxl',
    })
  },
  wait: function () {
    wx.navigateTo({
      url: '/pages/wait/wait',
    })
  },
note: function () {
    wx.navigateTo({
      url: '/pages/note/note',
    })
  },
 resmes: function () {
    wx.navigateTo({
      url: '/pages/resmes/resmes',
    })
  },
  time: function () {
    wx.navigateTo({
      url: '/pages/time/time',
    })
  },
})