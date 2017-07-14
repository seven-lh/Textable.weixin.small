//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getStorage({
      key: 'faces',
      success: function (res) {
        console.log("get Storage success!")
      },
      fail: function (){
        that.getFace();
      }
    })
    
  },
  getFace: function (cb) {
    var that = this;
    if (this.globalData.faces) {
      typeof cb == "function" && cb(this.globalData.faces)
    } else {
      wx.request({
        url:'https://raw.githubusercontent.com/MohawkApps/Textables/master/resources/content.json',
        //url:'https://seven-lh.github.io/Textables/App/Fixtures/faces.json',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          that.globalData.faces = res.data;
          typeof cb == "function" && cb(that.globalData.faces)
          wx.setStorage({
            key: 'faces',
            data: that.globalData.faces
          })
        }
      })
    }
  },
  globalData: {
    // userInfo:null,
    faces: null
  }
})