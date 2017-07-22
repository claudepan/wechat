Page({
  data: {
    success: false,
    address: "请选择你的当前位置"
  },
  staticData: {
    longitude: "",
    latitude: "",
    type: "",
    message: "",
    contact: "",
    isgoing: false
  },

  handleAddressTap: function() {
    if (!this.staticData.isgoing) {
      this.staticData.isgong = true;
      wx.chooseLocation({
        success: this.handleAddressSuccess.bind(this),
        complete: this.handleAddressComplete.bind(this)
      });
    }
  },

  handleAddressSuccess: function(res) {
    this.setData({
      address: res.address
    });
    Object.assign(this.staticData, {
      longitude: res.longitude,
      latitude: res.latitude
    });
  },

  handleAddressComplete: function() {
    this.staticData.isgoing = false;
  },

  handleTypeChange: function(e) {
    this.staticData.type = e.detail.value;
  },

  handleMessageInput: function(e) {
    this.staticData.message = e.detail.value;
  },

  handleContactInput: function(e) {
    this.staticData.contact = e.detail.value;
  },
  handlePostTap: function() {
    var errMsg = "";

    if (this.data.address == "" || this.data.address == "请选择你的当前位置") {
      errMsg = "请选择您的当前位置";
    } else if (!this.staticData.type) {
      errMsg = "请选择交易类型";
    } else if (!this.staticData.contact) {
      errMsg = "请填写联系方式";
    } else if (!this.staticData.message) {
      errMsg = "请填写交易说明";
    }

    if (errMsg) {
      wx.showToast({
        title: errMsg,
        icon: "loading",
        duration: 2000
      });
    } else {
      wx.request({
        url: "https://nuanwan.wekeji.cn/student/index.php/trade/add_item",
        data: {
          address: this.data.address,
          longitude: this.staticData.longitude,
          latitude: this.staticData.latitude,
          type: this.staticData.type,
          message: this.staticData.message,
          contact: this.staticData.contact,
          distinct:"cloudpan931108"
        },
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: this.handleSubmitSucc.bind(this)
      });
    }
  },
  handleSubmitSucc: function() {
    this.setData({
      success: true
    });
  }
});
