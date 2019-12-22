Page({
  data: {
    //初始坐标为北京邮电大学沙河校区s2
    latitude1: 40.15658333333333,
    longitude1: 116.28348333333334,
    latitude2:1,
    longitude2: 1,
    time:"",
    markers: [
      {
        id: 1,
        latitude: 1,
        longitude: 1,
        iconPath: "../images/address.png",
        callout:{
          content:""
        }
      }

    ]
  },
  onLoad: function () {
    //每隔五秒获取一次位置信息
    this.location()
    const timer = setInterval(() => {
      this.location()
    }, 5000)
  },
  location:function(){
    //获取坐标信息
    var that=this;
    wx.request({
      url: 'https://api.heclouds.com/devices/562232361/datastreams/A',
      method: "GET",
      header: {
        'content-type': 'application/json',
        "api-key": "U1g7AprTKDMSPAJXxyo0Y8uNv6M="
      },
      success: function (res) {
        console.log(res.data.data.current_value);
        //判断合法性
        var k = res.data.data.current_value.substr(0,1)
        
        if(k=="N"||k=="S")
        {
          var s = res.data.data.current_value
          var x = s.split('E')
          var n = x[0].substr(1, x[0].length - 1)
          var e= x[1]
          var ndian = n.search(/[\.]/)
          var edian = e.search(/[\.]/)
          var ndu = parseFloat(n.substr(0, ndian - 2))
          var edu = parseFloat(e.substr(0, edian - 2))
          var nf = parseFloat(n.substr(ndian - 2, 7))
          var ef = parseFloat(e.substr(edian - 2, 7))
          var n2 = ndu + nf / 60
          var e2 = edu + ef / 60;
          console.log(res.data.data.update_at)
          that.setData({
            latitude1: n2,
            longitude1: e2,
            time: res.data.data.update_at
          })
          }
        else
        {console.log("坐标不合法")
        }
      }
    })
    var ggg=[]
    ggg = this.gcj_encrypt(this.data.latitude1, this.data.longitude1)
    console.log(ggg.lat)
    console.log(ggg.lon)
    this.setData({
      latitude2:ggg.lat,
      longitude2:ggg.lon,
      markers:[
        {
          id: 1,
          latitude: ggg.lat,
          longitude: ggg.lon,
          iconPath: "../images/address.png",
        }
      ]

    })
  },
  //坐标转换，网上抄的
  PI: 3.14159265358979324,
  x_pi: 3.14159265358979324 * 3000.0 / 180.0,
  delta: function (lat, lon) {
    // Krasovsky 1940
    //
    // a = 6378245.0, 1/f = 298.3
    // b = a * (1 - f)
    // ee = (a^2 - b^2) / a^2;
    var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
    var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
    var dLat = this.transformLat(lon - 105.0, lat - 35.0);
    var dLon = this.transformLon(lon - 105.0, lat - 35.0);
    var radLat = lat / 180.0 * this.PI;
    var magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);
    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);
    return { 'lat': dLat, 'lon': dLon };
  },

  //WGS-84 to GCJ-02
  gcj_encrypt: function (wgsLat, wgsLon) {
    if (this.outOfChina(wgsLat, wgsLon))
      return { 'lat': wgsLat, 'lon': wgsLon };

    var d = this.delta(wgsLat, wgsLon);
    return { 'lat': wgsLat + d.lat, 'lon': wgsLon + d.lon };
  },
  outOfChina: function (lat, lon) {
    if (lon < 72.004 || lon > 137.8347)
      return true;
    if (lat < 0.8293 || lat > 55.8271)
      return true;
    return false;
  }, 
  transformLat: function (x, y) {
    var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
    return ret;
  },
  transformLon: function (x, y) {
    var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
    return ret;
  }
})