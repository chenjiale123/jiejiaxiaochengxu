// pages/storeDetail/storeDetail.js
const api = require('../../../utils/api')
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeDetail: '',
    hidden: false,
    intro: ''
  },
back(){
wx.navigateBack({
  complete: (res) => {},
  delta: 0,
  fail: (res) => {},
  success: (res) => {},
})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let storeid = options.storeid
    this.getStore(storeid)
  },

  getStore(id) {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
   
    api._get('store/findStoreDetail?storeId=' + id+'&userLng='+res.longitude+'&userLat='+res.latitude)
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          that.setData({
            storeDetail: res.data,
            intro: res.data.introduction
          })
          let article = that.data.intro
          WxParse.wxParse('article', 'html', article, that, 5);
        }
      })
    },
    fail(error){

    }
  })
  },
  daohang(){
    console.log(this.data.storeDetail)
wx.openLocation({
 latitude: parseFloat(this.data.storeDetail.latitude),
 longitude: parseFloat(this.data.storeDetail.longitude),
//  address: 'address',
 complete: (res) => {},
 fail: (res) => {},
 name:this.data.storeDetail.address,
 scale: 28,
 success: (res) => {},
})
  },
  dianhua(){
    wx.makePhoneCall({
      phoneNumber: this.data.storeDetail.storeContactPhone,
      success:function(){},
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

  },
  onPageScroll(e) {
    if (e.scrollTop >= 30) {
      this.setData({
        hidden: true
      })
    } else {
      this.setData({
        hidden: false
      })
    }
  }

})