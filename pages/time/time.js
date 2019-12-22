Page({
  data: {
     time:""
  },
  onShareAppMessage: function () {

  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  post:function(){
    var that = this
    wx.request({
      url: "https://api.heclouds.com/devices/562232361/datapoints",
      method: "POST",
      data: {
        "datastreams": [{
          "id": "Etime",
          "datapoints": [{
            "at": "",
            "value": that.data.time
          },
          ]
        },
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