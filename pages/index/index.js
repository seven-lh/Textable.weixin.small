//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    faces: {},
    copyedArt:'你的剪贴版里就是卡片内的：emoj'
  },
  tapClip: function (event) {
    var that = this
    //console.log(that)
    //console.log(event)
    let clipbord =  event.currentTarget.dataset.art
    wx.setClipboardData({
      data: clipbord,
      success: function (res) {   
        //wx.vibrateLong(),
        that.setData({
          copyedArt: clipbord
        });
        wx.setNavigationBarTitle({
          title: '去粘贴吧' + clipbord
        })
        wx.showToast({
          title: '你拷贝的是：\n' + clipbord,
          icon: 'success',
          mask: true,
          duration: 2000
        })
        setTimeout(function () {
          wx.hideToast()
        }, 1000)
        wx.getClipboardData({
          success: function (res) {
            //console.log(res.data) // data
          }
        })
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    //console.log('app.globalData:'+ app.globalData.faces)
    var that = this;
    //调用应用实例的方法获取全局数据
    //app.getFace(function (faces) {
      //更新数据
    //typeof cb == "function" && cb(app.globalData.faces)
    wx.getStorage({
      key: 'faces',
      success: function (res) {
        console.log("get Storage ok!")
        that.setData({
          faces: res.data
        });
      }
    })
      
    //})
  }
})
