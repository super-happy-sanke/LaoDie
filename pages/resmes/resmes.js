Page({
  data:{
    apple:[],
    hhh:""
  },
  onLoad:function(){
    //每隔1秒读一次手表信息
    this.msg()
    this.pageScrollToBottom()
    const timer = setInterval(() => {
    this.msg()
    }, 1000)
  },
  msg:function(){
    console.log(new Date())
    var t = new Date();
    var year = t.getFullYear()
    var month = t.getMonth()+1
    if(month<10)
    { month = "0" + t.getMonth() + 1}
    var day = t.getDate()
    if(day<10)
    { day = "0" + t.getDate()}
    var that = this;
    wx.request({
      url: 'https://api.heclouds.com/devices/562232361/datapoints?datastream_id=D&start=' + year + '-'+month+'-'+day+'T00:00:00&limit=100',
      method: "GET",
      header: {
        'content-type': 'application/json',
        "api-key": "U1g7AprTKDMSPAJXxyo0Y8uNv6M="
      },
      success: function (res) {
        console.log(res)
        if (res.data.data.datastreams.length==0)
        {
          that.setData({
            hhh:"暂无消息"
          })
        }
        else
        {var f=0
          for (var i = 0; i < res.data.data.datastreams[0].datapoints.length;i++)
          {
            if (/[ABCDE]/.test(res.data.data.datastreams[0].datapoints[i].value.substr(0, 1)))
            {}
            else
            f++
          }
          console.log(f)
          var a = []
        var j = res.data.data.datastreams[0].datapoints.length-1-f
        for(var i=0;i<res.data.data.datastreams[0].datapoints.length;i++)
        {
          if (/[ABCDE]/.test(res.data.data.datastreams[0].datapoints[i].value.substr(0, 1)))
            {var z = res.data.data.datastreams[0].datapoints[i].value.substr(0, 1)
            switch (z){
            case 'A':
            a[j]={
              time: res.data.data.datastreams[0].datapoints[i].at,
              msg:"我迷路了，来接我回家吧！"
            }
            break;
            case 'B':
              a[j] = {
                time: res.data.data.datastreams[0].datapoints[i].at,
                msg: "身体不舒服，带我去医院！"
              }
              break;
            case 'C':
              a[j] = {
                time: res.data.data.datastreams[0].datapoints[i].at,
                msg: "我在外面玩！"
              }
              break;
            case 'D':
              a[j] = {
                time: res.data.data.datastreams[0].datapoints[i].at,
                msg: "我去买菜。"
              }
              break;
            case 'E':
              a[j] = {
                time: res.data.data.datastreams[0].datapoints[i].at,
                msg: "我去接孩子回家。"
              }
              break;
          }
          j--;
        }
        }
        }
        that.setData({
          apple: a,
          hhh: ""
        })
      }
    })
  },
  pageScrollToBottom: function () {

    wx.createSelectorQuery().select('#page').boundingClientRect(function (rect) {

      if (rect) {

        // 使页面滚动到底部

        console.log(rect.height);

        wx.pageScrollTo({

          scrollTop: rect.height

        })

      }

    }).exec()

  },
})