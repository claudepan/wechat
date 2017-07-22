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
    } catch (e) {
      wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            method:'post',
            url: 'https://nuanwan.weikeji.cn/student/index.php/wechat/get_user_info',
            header:{"content-type": "application/x-www-form-urlencoded"},
            data: {
              code: res.code
            },
            success: function(response){
                //存储openid
                
            }
          })
        } 
      }
    });
    }
  }
})
