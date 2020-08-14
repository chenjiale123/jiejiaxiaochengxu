// pages/citySearch/citySearch.js

const api = require('../../../utils/api.js')
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityList:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
 search(e){
   console.log(e.detail.value)
   api._get('address/searchAddress?adName='+e.detail.value)
   .then(res=>{
     console.log(res)
     if(res.code==200){
       this.setData({
         cityList:res.data
       })
     }
   })
    
 },
 selectItem(e){
   console.log(e)
  app.globalData.city = e.currentTarget.dataset.name
    app.globalData.local = e.currentTarget.dataset.local

    wx.navigateTo({
      url: '../address/address',
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

  }
})