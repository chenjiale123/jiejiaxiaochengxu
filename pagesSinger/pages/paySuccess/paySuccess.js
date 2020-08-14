// pagesSinger//pages/paySuccess/paySuccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    second:10,
    order:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.setData({
    order:options.id
  })
  },
  countdown(that) {
    var that=this
    var second = that.data.second
    if (second == 0) {
      that.setData({
        second: "跳转中"
      });
      wx.navigateTo({
        url: '../../../pagesSinger/pages/orderDetail/orderDetail?id='+that.data.order,
        complete: (res) => {},
   
        fail: (res) => {},
        success: (result) => {},
      })
      return;
    }
    var time = setTimeout(function () {
      that.setData({
        second: second - 1
      });
      that.countdown(that);
      console.log(second)
    }
      , 1000)

      that.setData({
        time:time
      })
  },
close(){
wx.navigateBack({
  complete: (res) => {},
  delta: 3,
  fail: (res) => {},
  success: (res) => {},
})
},
findOrder(){
  wx.navigateTo({
    url: '../../../pagesSinger/pages/orderDetail/orderDetail?id='+this.data.order,
    complete: (res) => {},

    fail: (res) => {},
    success: (result) => {},
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.countdown(this) 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    let time = this.data.time;
    
 
    
    clearInterval(time)
    console.log('333')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

    let time = this.data.time;
    
 
    
    clearInterval(time)
    
    },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})