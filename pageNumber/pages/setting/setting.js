// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  nickName(){
wx.navigateTo({
  url: '../../../pagesSinger/pages/peoInfo/peoInfo',
})
  },
  address(){
wx.navigateTo({
  url: '../../../pageNumber/pages/addressList/addressList',
  complete: (res) => {},

  fail: (res) => {},
  success: (result) => {},
})
  },
  phoneChange(){
    wx.navigateTo({
      url: '../../../pagesSinger/pages/phoneChange/phoneChange',
      complete: (res) => {},
    
      fail: (res) => {},
      success: (result) => {},
    })
  },
  paymentChange(){
    wx.navigateTo({
      url: '../../../pagesSinger/pages/paymentCode/paymentCode',
      complete: (res) => {},
    
      fail: (res) => {},
      success: (result) => {},
    })
  },
  suggest(){
    wx.navigateTo({
      url: '../suggest/suggest',
      complete: (res) => {},
    
      fail: (res) => {},
      success: (result) => {},
    })
  },
  exit(){
  wx.clearStorageSync('token')

  wx.clearStorageSync('storeId')
  wx.navigateTo({
    url: '../../../pages/login/login',
    complete: (res) => {},
    fail: (res) => {},
    success: (result) => {},
  })
  },
  wechat(){
wx.navigateTo({
  url: '../../../pagesSinger/pages/viewWechat/viewWechat',
  complete: (res) => {},
  fail: (res) => {},
  success: (result) => {},
})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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