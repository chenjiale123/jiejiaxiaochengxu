// pages/addressSearch/addressSearch.js
var amap = require('../../../utils/amap-wx.js') //如：..­/..­/libs/amap-wx.js
var key = "94f5b056c1f65da8f42a211ebb81bed6"
var app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   array:[],
   cityName:''
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
   

  

  },
  onShow(){
   
    },
 select(){
  wx.navigateTo({
    url: '../citySelect/citySelect',
  })
 },
  search(e){
    console.log(e)
    var that=this
    var myAmapFun = new amap.AMapWX({
      key: key
    });

    wx.getLocation({
      success: function (res) {
        if (res && res.longitude) {
          that.setData({
            longitude: res.longitude,
            latitude: res.latitude,
          
          })
        }
        myAmapFun.getPoiAround({
          location: res.longitude + ',' + res.latitude,
          querytypes: "",
          querykeywords: e.detail.value,
          success: function (data) {
            //成功回调
            console.log(data)
            that.setData({
              add: data.markers
            })
            console.log(that.data.add)
          },
          fail: function (info) {
            //失败回调
            console.log(info)
          }
        })


      }
    })

  },
  selectItem(e) {
    console.log(e)
    app.globalData.city=e.currentTarget.dataset.name
    app.globalData.local=e.currentTarget.dataset.local
    wx.navigateBack({
      delta:2
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