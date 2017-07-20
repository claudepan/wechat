//app.js
App({
  globalData: {
    deviceInfo: {}
  },
  onLaunch: function() {
    try {
      var localInfo = wx.getSystemInfoSync("deviceInfo");

      if (!localInfo) {
        var localInfo = wx.getStorageSync("deviceInfo");
        wx.setStorageSync("deviceInfo", res);
        this.globalData.deviceInfo = res;
      } else {
        this.globalData.deviceInfo = localInfo;
      }
    } catch (e) {}
  }
})
