var util = require('../../utils/util.js');
Page({
  data: {
    information1:"",
    information2:"",
    lastArea:"",
    date:"",
    time:"",
  },
  // 获取输入框的值
  getDataBindTap: function (e) {
    var information = e.detail.value;//输入的内容
    console.log(information)
    var value = e.detail.value.length;//输入内容的长度
    var lastArea =20- value;//剩余字数
    var that = this;
    that.setData({
      information1: information,
      lastArea: lastArea
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  sendfrg: function () {
    //点阵化
    var ctx = wx.createCanvasContext('myCanvas')
    console.log(this.data.information1)
    ctx.setFontSize(12)
    ctx.fillText(this.data.information1.substr(0, 10), 0, 10, 120)
    ctx.fillText(this.data.information1.substr(10, 10), 0, 20, 120)

    ctx.draw()
    var that = this
    wx.canvasGetImageData({
      canvasId: 'myCanvas',
      x: 0,
      y: 0,
      width: 120,
      height: 24,
      success(res) {
        console.log(res.width) // 100
        console.log(res.height) // true
        var apple = []
        var peach = []
        var j = 0;
        for (var i = 3; i < 11520; i = i + 4) {
          if (res.data[i] > 127) {
            apple[j] = 1
          }
          else {
            apple[j] = 0
          }
          j = j + 1
        }
        var t = 0
        for (var i = 0; i < 2880; i = i + 8) {
          peach[t] = apple[i] * Math.pow(2, 0) + apple[i + 1] * Math.pow(2, 1) + apple[i + 2] * Math.pow(2, 2) + apple[i + 3] * Math.pow(2, 3) + apple[i + 4] * Math.pow(2, 4) + apple[i + 5] * Math.pow(2, 5) + apple[i + 6] * Math.pow(2, 6) + apple[i + 7] * Math.pow(2, 7),
            t++
        }
        var tea = ""
        for (var i = 0; i < 360; i++) {
          tea = tea + String.fromCharCode(peach[i])
        }
        that.setData({
          information2: tea
        })
        console.log(that.data.information2)
        //发送
        wx.request({
          url: "https://api.heclouds.com/devices/562232361/datapoints",
          method: "POST",
          data: {
            "datastreams": [{
              "id": "Bei",
              "datapoints": [{
                "at": "",
                "value": that.data.information2
              },
              ]
            },
              {
                "id": "Bdate",
                "datapoints": [{
                  "at": "",
                  "value": that.data.date
                },
                ]
              },
              {
                "id": "Btime",
                "datapoints": [{
                  "at": "",
                  "value": that.data.time
                },
                ]
              }
            ]
          },
          header: {
            "api-key": "U1g7AprTKDMSPAJXxyo0Y8uNv6M="
          },
          success: function (res) {
            console.log(res.data);
            wx.showToast({
              title: "设置成功！"
            })
          }

        })
      }
    })
  }

})