Page({
  data: {
value:"",
num:"",
  },
  onLoad:function(){
    this.beats()
    const timer = setInterval(() => {
      this.beats()
    }, 5000)
  },
  beats: function () {
    var a = Math.floor(Math.random() * 10 + 75)
    this.setData({
      value:a
    })
    //欺骗性POST
    wx.request({
      url: "https://api.heclouds.com/devices/562232361/datapoints",
      method: "POST",
      data: {
        "datastreams": [{
          "id": "beats",
          "datapoints": [{
            "at": "",
            "value": this.data.value
          },
          ]
        }
        ]
      },
      header: {
        "api-key": "U1g7AprTKDMSPAJXxyo0Y8uNv6M="
      },
      success: function (res) {
      }
    })
    //获取onenet数据
    var that=this
    wx.request({
      url: 'https://api.heclouds.com/devices/562232361/datastreams/beats',
      method: "GET",
      header: {
        'content-type': 'application/json',
        "api-key": "U1g7AprTKDMSPAJXxyo0Y8uNv6M="
      },
      success: function (res) {
        console.log(res.data.data.current_value)
        that.setData({
          num: res.data.data.current_value
        })
      }
    })

  },
})