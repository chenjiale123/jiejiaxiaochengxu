// pages/suggest/suggest.js
const api = require('../../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    suggest:''
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
sugg(e){
 this.setData({
   suggest:e.detail.value
 })
},
sub(){
api._posts('feedback/addFeedback',{
  content:this.data.suggest
})
.then(res=>{
  if(res.code==200){
    wx.showToast({
      title: '反馈成功',
      icon:'none'
    })
    wx.navigateBack({
      complete: (res) => {},
      delta: 1,
      fail: (res) => {},
      success: (res) => {},
    })
  }else{
    wx.showToast({
      title: res.message,
      icon:'none'
    })
  }
})
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