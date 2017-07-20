
var app = getApp(),
    deviceInfo = app.globalData.deviceInfo;

Page({
  data: {
    latitude: "",
    longitude: "",
    controls: [
      {
        id: 1,
        iconPath: "/resource/pin.png",
        position: {
          left: deviceInfo.windowWidth / 2 - 10,
          top: (deviceInfo.windowHeight - 42) / 2 -26,
          width: 20,
          height: 26
        }
      },
      {
        id: 2,
        iconPath: "/resource/center.png",
        position: {
          left: 20,
          top: deviceInfo.windowHeight - 92,
          width: 30,
          height: 30
        },
        clickable: true
      }
    ]
  },

  onShow: function() {
    wx.getLocation({
      type: "gcjo2",
      success: this.handleGetLocationSucc.bind(this)
    });
  },

  handleGetLocationSucc: function(res) {
    this.setData({
      longitude: res.longitude,
      latitude: res.latitude
    });
  },

  onShareAppMessage: function() {
    return {
      title: "书香遍地",
      path: "/pages/index/index"
    };
  },
   onReady: function (e) {
    this.mapCtx = wx.createMapContext('map')
  },
  handleControlTap: function(e) {
      var id = e.controlId;
      if(id = 2){
        this.mapCtx.moveToLocation();
      }
  }
});
